import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configValidationSchema } from 'config/schema.config'
import { DatabaseModule } from './database/database.module'
import { LoggerMiddleware } from 'middleware/logger.middleware'
import { UserModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'
import { LicenseModule } from './license/license.module'
import { FavoriteModule } from './favorite/favorite.module'
import { DownloadModule } from './download/download.module'
import { ArtworkModule } from './artwork/artwork.module'
import { commentModule } from './comment/comment.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
      validationSchema: configValidationSchema,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    LicenseModule,
    FavoriteModule,
    DownloadModule,
    ArtworkModule,
    ConfigModule,
    commentModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
