import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { PaginatedResult } from 'interfaces/paginated-result.interface'
import Logging from 'library/Logging'
import { Repository } from 'typeorm'

@Injectable()
export abstract class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}
  async findAll(relations: []): Promise<any[]> {
    try {
      return this.repository.find({ relations })
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException('Somthing went wrong while searching for a list of elements')
    }
  }
  async findBy(condition, relations = []): Promise<any[]> {
    try {
      return this.repository.findOne({
        where: condition,
        relations,
      })
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException(
        `Somthing went wrong while searching for a elements with condition: ${condition}`,
      )
    }
  }
  async findById(id: string, relations = []): Promise<any[]> {
    try {
      const element = await this.repository.findOne({
        where: { id },
        relations,
      })
      if (!element) {
        throw new BadRequestException(`Cannot find element with id: ${id}`)
      }

      return element
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException(`Somthing went wrong while searching for a elements with id: ${id}`)
    }
  }

  async remove(id: string): Promise<any> {
    const element = await this.findById(id)
    try {
      return this.repository.remove(element)
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException('Something went wrong while deleting a element')
    }
  }
  async paginate(page = 1, relations = []): Promise<PaginatedResult> {
    const take = 10 //num of taken
    try {
      const [data, total] = await this.repository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations,
      })
      return { data: data, meta: { total, page, last_page: Math.ceil(total / take) } }
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException('Something went wrong while searching for paginated elements')
    }
  }
}
