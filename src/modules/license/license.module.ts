import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { License } from 'entities/license.entity'
import { LicensesController } from './license.controller'
import { LicenseService } from './license.service'

@Module({
  imports: [TypeOrmModule.forFeature([License])],
  controllers: [LicensesController],
  providers: [LicenseService],
  exports: [LicenseService],
})
export class LicenseModule {}
