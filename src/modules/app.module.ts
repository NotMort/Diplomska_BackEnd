import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configValidationSchema } from 'config/schema.config'
import { DatabaseModule } from './database/database.module'
import { LoggerMiddleware } from 'middleware/logger.middleware'
import { UserModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'

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
  ],

  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
