import { Test, TestingModule } from '@nestjs/testing'
import { HeroService } from './hero.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { MockRepository } from 'test/utils/mock.repository'
import { Hero } from './hero.entity'
import { REQUEST } from '@nestjs/core'

describe('The HeroService', () => {
  let heroService: HeroService
  let mockRepository: MockRepository
  let module: TestingModule
  beforeEach(async () => {
    mockRepository = new MockRepository()
    module = await Test.createTestingModule({
      providers: [
        HeroService,
        {
          provide: getRepositoryToken(Hero),
          useValue: mockRepository,
        },
        {
          provide: REQUEST,
          useValue: {},
        },
      ],
    }).compile()
    heroService = await module.get(HeroService)
    mockRepository = await module.get(getRepositoryToken(Hero))
  })

  describe('when getting hero and replace name', () => {
    describe('and all heroes name is the same', () => {
      const heroes: Hero[] = []
      beforeEach(() => {
        const hero = new Hero()
        hero.id = 1
        hero.name = 'Supper Man'
        hero.power = 99
        heroes.push(hero)
        jest.spyOn(mockRepository.queryBuilder, 'getMany').mockReturnValue(Promise.resolve(heroes))
      })
      it('should return the heroes', async () => {
        const fetchedHero = await heroService.getMany()
        expect(fetchedHero).toMatchObject([{ id: 1, name: 'Supper Man', power: 99 }])
      })
    })
  })
})
