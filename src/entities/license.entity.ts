import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { Artwork } from './artwork.entity'

export type LicenseType = 'CC BY' | 'CC BY-SA' | 'CC BY-NC' | 'CC BY-ND' | 'GPL' | 'Copyright' | 'Public Domain'

@Entity()
export class License extends Base {
  @Column({ type: 'enum', enum: ['CC BY', 'CC BY-SA', 'CC BY-NC', 'CC BY-ND', 'GPL', 'Copyright', 'Public Domain'] })
  license_type: LicenseType

  @Column('text')
  description: string

  @Column({ default: false })
  commercial_use: boolean

  @Column({ default: false })
  modification_allowed: boolean

  @Column({ default: true })
  attribution_required: boolean

  @OneToMany(() => Artwork, (artwork) => artwork.license)
  artworks: Artwork[]
}
