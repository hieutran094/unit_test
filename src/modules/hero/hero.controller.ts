import { Controller } from '@nestjs/common'
import { Crud, Override } from '@nestjsx/crud'
import { Hero } from './hero.entity'
import { HeroService } from './hero.service'

@Crud({
  model: {
    type: Hero,
  },
})
@Controller('heroes')
export class HeroController {
  constructor(public service: HeroService) {}
  @Override()
  getMany() {
    return this.service.getMany()
  }
}
