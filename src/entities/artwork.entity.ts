import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'
import { License } from './license.entity'
import { Download } from './download.entity'
import { Favorite } from './favorite.entity'
import { Comment } from './comment.entity'

export type CategoryType = '2D' | '3D' | 'photo' | 'audio' | 'video'

@Entity()
export class Artwork extends Base {
  @Column()
  title: string

  @Column('text')
  description: string

  @Column()
  file_path: string

  @Column()
  image_path: string

  @Column({ nullable: true })
  thumbnail_path: string

  @Column({ type: 'enum', enum: ['2D', '3D', 'photo', 'audio', 'video'] })
  category: CategoryType

  @Column('simple-array')
  tags: string[]

  @ManyToOne(() => User, (user) => user.artworks, { nullable: false, onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => License, (license) => license.artworks, { nullable: true, onDelete: 'SET NULL' })
  license: License

  @OneToMany(() => Download, (download) => download.artwork, { cascade: true })
  downloads: Download[]

  @OneToMany(() => Favorite, (favorite) => favorite.artwork, { cascade: true })
  favorites: Favorite[]

  @OneToMany(() => Comment, (comment) => comment.artwork, { cascade: true })
  comments: Comment[]
}
