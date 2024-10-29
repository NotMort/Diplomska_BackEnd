import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'
import { Artwork } from './artwork.entity'

@Entity()
export class Comment extends Base {
  @Column('text')
  comment_text: string

  @ManyToOne(() => User, (user) => user.comments)
  user: User

  @ManyToOne(() => Artwork, (artwork) => artwork.comments)
  artwork: Artwork
}
