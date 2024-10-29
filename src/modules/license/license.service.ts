import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { License } from 'entities/license.entity'
import { AbstractService } from 'modules/common/abstract.service'

@Injectable()
export class LicenseService extends AbstractService {
  constructor(@InjectRepository(License) private readonly licenseRepository: Repository<License>) {
    super(licenseRepository)
  }
}
