import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'
import { Artwork } from './artwork.entity'

@Entity()
export class Comment extends Base {
  @Column('text')
  comment_text: string

  @ManyToOne(() => User, (user) => user.comments, { nullable: false, onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Artwork, (artwork) => artwork.comments, { nullable: false, onDelete: 'CASCADE' })
  artwork: Artwork
}
