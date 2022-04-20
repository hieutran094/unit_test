import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Hero } from './hero.entity'
import { Connection } from 'typeorm'
import { BaseService } from '../../common/base.service'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class HeroService extends BaseService<Hero> {
  constructor(@InjectRepository(Hero) repo, @Inject(REQUEST) protected readonly request) {
    super(repo)
  }
  public async getMany() {
    const heroes = await this.connection.getRepository(Hero).createQueryBuilder('heroes').getMany()
    heroes.map((hero) => {
      return (hero.name = 'Hieu')
    })
    return heroes
  }
}
