import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Download } from 'entities/download.entity'
import { AbstractService } from 'modules/common/abstract.service'

@Injectable()
export class DownloadService extends AbstractService {
  constructor(@InjectRepository(Download) private readonly downloadRepository: Repository<Download>) {
    super(downloadRepository)
  }
}
