import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Artwork, CategoryType } from 'entities/artwork.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { UpdateArtworkDto } from './dto/update-artwork.dto'
import { CreateArtworkDto } from './dto/create-artwork.dto'
import { User } from 'entities/user.entity'
import { License } from 'entities/license.entity'
import * as fs from 'fs'
import { join } from 'path'
@Injectable()
export class ArtworkService extends AbstractService {
  constructor(@InjectRepository(Artwork) private readonly artworkRepository: Repository<Artwork>) {
    super(artworkRepository)
  }
  async create(createArtworkDto: CreateArtworkDto): Promise<Artwork> {
    const { user_id, ...artworkData } = createArtworkDto
    const user = await this.artworkRepository.manager.findOne(User, { where: { id: user_id } })
    if (!user) {
      throw new BadRequestException('Invalid user ID')
    }
    const artwork = this.artworkRepository.create({
      ...artworkData,
      user,
    })

    return this.artworkRepository.save(artwork)
  }
  async findAll(): Promise<Artwork[]> {
    return this.artworkRepository
      .createQueryBuilder('artwork')
      .leftJoinAndSelect('artwork.license', 'license')
      .getMany()
  }
  async findById(id: string): Promise<Artwork> {
    return this.artworkRepository.findOne({
      where: { id },
      relations: ['license'],
    })
  }

  async update(id: string, updateArtworkDto: UpdateArtworkDto): Promise<Artwork> {
    const artwork = await this.findById(id)
    Object.assign(artwork, updateArtworkDto)
    return this.artworkRepository.save(artwork)
  }
  async remove(id: string): Promise<Artwork> {
    const artwork = await this.findById(id)
    if (!artwork) {
      throw new BadRequestException('Artwork not found')
    }

    const filePaths = [
      artwork.thumbnail_path ? join(__dirname, '../../', artwork.thumbnail_path) : null,
      artwork.image_path ? join(__dirname, '../../', artwork.image_path) : null,
      artwork.file_path ? join(__dirname, '../../', artwork.file_path) : null,
    ]

    filePaths.forEach((filePath) => {
      if (filePath && fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath)
          console.log(`Deleted file: ${filePath}`)
        } catch (error) {
          console.error(`Error deleting file: ${filePath}`, error)
        }
      }
    })

    await this.artworkRepository.delete(id)
    return artwork
  }
  async updateLicense(artworkId: string, licenseId: string): Promise<Artwork> {
    const artwork = await this.findById(artworkId)
    if (!artwork) {
      throw new BadRequestException(`Artwork with ID ${artworkId} does not exist.`)
    }
    const license = await this.artworkRepository.manager.findOne(License, { where: { id: licenseId } })
    if (!license) {
      throw new BadRequestException(`License with ID ${licenseId} does not exist.`)
    }
    artwork.license = license
    return this.artworkRepository.save(artwork)
  }

  async findByCategory(category: CategoryType): Promise<Artwork[]> {
    return this.artworkRepository.find({ where: { category } })
  }

  async findByTag(tag: string): Promise<Artwork[]> {
    return this.artworkRepository
      .createQueryBuilder('artwork')
      .where('artwork.tags LIKE :tag', { tag: `%${tag}%` })
      .getMany()
  }
  async updateArtworkThumbnail(id: string, filename: string): Promise<Artwork> {
    const artwork = await this.findById(id)
    if (!artwork) throw new BadRequestException('Artwork not found')
    artwork.thumbnail_path = `files/thumbnails/${filename}`
    return this.artworkRepository.save(artwork)
  }

  async updateArtworkImage(id: string, filename: string): Promise<Artwork> {
    const artwork = await this.findById(id)
    if (!artwork) throw new BadRequestException('Artwork not found')
    artwork.image_path = `files/images/${filename}`
    return this.artworkRepository.save(artwork)
  }

  async updateArtworkFile(id: string, filename: string): Promise<Artwork> {
    const artwork = await this.findById(id)
    if (!artwork) throw new BadRequestException('Artwork not found')
    artwork.file_path = `files/artwork_files/${filename}`
    return this.artworkRepository.save(artwork)
  }
}
