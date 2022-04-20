import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello() {
    return { msg: 'Hello World' }
  }
  getCount(a: number, b: number): number {
    return a + b
  }
}
