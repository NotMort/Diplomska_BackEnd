import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { Request } from 'express'
import Logging from 'library/Logging'

import { compareHash, hash } from 'utils/bcrypt'

import { RegisterUserDto } from './dto/register-user.dto'
import { UserService } from 'modules/users/user.service'
import { User } from 'entities/user.entity'
import { Artwork } from 'entities/artwork.entity'

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User> {
    Logging.info('Validating user...')
    const user = await this.usersService.findBy({ email: email })
    if (!user) {
      throw new BadRequestException('Invalid credentials.')
    }
    if (!(await compareHash(password, user.password))) {
      throw new BadRequestException('Invalid credentials.')
    }

    Logging.info('User is valid.')
    return user
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword: string = await hash(registerUserDto.password)
    const user = await this.usersService.create({
      role_id: null,
      ...registerUserDto,
      password: hashedPassword,
    })
    return user
  }

  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id, name: user.email })
  }

  async user(cookie: string): Promise<User> {
    try {
      const data = await this.jwtService.verifyAsync(cookie)
      return this.usersService.findById(data['sub'])
    } catch (error) {
      console.error('JWT verification failed:', error.message)
      throw new BadRequestException('Invalid or expired token.')
    }
  }

  async userArtwork(cookie: string): Promise<Artwork[]> {
    const data = await this.jwtService.verifyAsync(cookie)
    const user = await this.usersService.findById(data['sub'])
    if (!user) {
      throw new BadRequestException('User not found.')
    }
    return this.usersService.getUserArtworks(user.id)
  }
  async userFavorites(cookie: string): Promise<{ artwork_id: string }[]> {
    const data = await this.jwtService.verifyAsync(cookie)
    const user = await this.usersService.findById(data['sub'])
    if (!user) {
      throw new BadRequestException('User not found.')
    }
    const favorites = await this.usersService.getUserFavorites(user.id)
    return favorites.map((favorite) => ({ artwork_id: favorite.artwork.id }))
  }
  async getUserId(request: Request): Promise<string> {
    const user = request.user as User
    return user.id
  }
}
