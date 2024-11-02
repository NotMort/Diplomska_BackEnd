import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'entities/user.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import Logging from 'library/Logging'
import { UpdateUserDto } from './dto/update-user.dto'
import { compareHash, hash } from 'utils/bcrypt'
import { PostgresErrorCode } from 'helpers/postgresErrorCode.enum'

@Injectable()
export class UserService extends AbstractService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository)
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findBy({ email: createUserDto.email })
    if (user) {
      throw new BadRequestException('User with that email exists.')
    }
    try {
      const newUser = this.userRepository.create({ ...createUserDto })
      return this.userRepository.save(newUser)
    } catch (error) {
      Logging.error(error)
      throw new BadRequestException('somthing went wrong while creating user')
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = (await this.findById(id)) as User
    const { email, password, confirm_password, ...data } = updateUserDto
    if (user.email !== email && email) {
      user.email = email
    }
    if (password && confirm_password) {
      if (password !== confirm_password) {
        throw new BadRequestException('Passwords do not match')
      }
      if (await compareHash(password, user.password)) {
        throw new BadRequestException('New password cant be the same as old one')
      }
      user.password = await hash(password)
    }
    try {
      Object.entries(data).map((entry) => {
        user[entry[0]] = entry[1]
      })
      return this.userRepository.save(user)
    } catch (error) {
      if (error?.code == PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with that email allrady exists.')
      }
      throw new InternalServerErrorException('Somting want wrong when updating user')
    }
  }

  async updateUserImageId(id: string, avatar: string): Promise<User> {
    const user = await this.findById(id)
    return this.update(user.id, { avatar })
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } })
  }
}
