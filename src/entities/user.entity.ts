import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { Exclude } from 'class-transformer'
import { Artwork } from './artwork.entity'
import { Download } from './download.entity'
import { Favorite } from './favorite.entity'
import { Comment } from './comment.entity'

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  first_name: string

  @Column({ nullable: true })
  last_name: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  @Exclude()
  password: string

  @Column({ type: 'enum', enum: ['artist', 'developer'], default: 'artist' })
  user_role: 'artist' | 'developer'

  @OneToMany(() => Artwork, (artwork) => artwork.user, { nullable: false, onDelete: 'CASCADE' })
  artworks: Artwork[]

  @OneToMany(() => Download, (download) => download.user, { nullable: false, onDelete: 'CASCADE' })
  downloads: Download[]

  @OneToMany(() => Favorite, (favorite) => favorite.user, { nullable: false, onDelete: 'CASCADE' })
  favorites: Favorite[]

  @OneToMany(() => Comment, (comment) => comment.user, { nullable: false, onDelete: 'CASCADE' })
  comments: Comment[]
}
