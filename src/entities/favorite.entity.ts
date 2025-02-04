import { Entity, ManyToOne } from 'typeorm'
import { Base } from './base.entity'
import { User } from './user.entity'
import { Artwork } from './artwork.entity'

@Entity()
export class Favorite extends Base {
  @ManyToOne(() => User, (user) => user.favorites, { nullable: false, onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Artwork, (artwork) => artwork.favorites, { nullable: false, onDelete: 'CASCADE' })
  artwork: Artwork
}
