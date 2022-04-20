import { Controller, Get, Body } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello()
  }
  @Get('count')
  getCount(@Body() body: any): number {
    return this.appService.getCount(body.a, body.b)
  }
}
