import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { HeroModule } from './modules/hero/hero.module'
@Module({
  imports: [DatabaseModule, HeroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
