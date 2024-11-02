import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { License, LicenseType } from 'entities/license.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { UpdateLicenseDto } from './dto/update-license.dto'
import { CreateLicenseDto } from './dto/create-license.dto'

@Injectable()
export class LicenseService extends AbstractService {
  constructor(@InjectRepository(License) private readonly licenseRepository: Repository<License>) {
    super(licenseRepository)
  }
  async create(createLicenseDto: CreateLicenseDto): Promise<License> {
    const license = this.licenseRepository.create(createLicenseDto)
    return this.licenseRepository.save(license)
  }

  async update(id: string, updateLicenseDto: UpdateLicenseDto): Promise<License> {
    const license = await this.findById(id)
    Object.assign(license, updateLicenseDto)
    return this.licenseRepository.save(license)
  }

  async findByType(license_type: LicenseType): Promise<License[]> {
    return this.licenseRepository.find({ where: { license_type } })
  }
}
