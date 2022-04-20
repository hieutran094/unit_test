import { Test, TestingModule } from '@nestjs/testing'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { HeroService } from './hero.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { getConnection, Connection, QueryRunner, getConnectionManager } from 'typeorm'
import { Hero } from './hero.entity'
import { REQUEST } from '@nestjs/core'

export class MockRepository<T> {
  public createQueryBuilder = jest.fn(() => this.queryBuilder)
  private qb = { createQueryBuilder: this.createQueryBuilder }
  public getRepository = jest.fn(() => this.qb)
  public manager = { transaction: (a) => Promise.resolve(a()) }
  public metadata = {
    connection: { options: { type: null }, getRepository: this.getRepository },
    columns: [],
    relations: [],
  }
  public save = jest.fn()
  public delete = jest.fn()
  public update = jest.fn()
  public findOne = jest.fn()
  public findOneOrFail = jest.fn()
  public find = jest.fn()

  public getMany = jest.fn()
  public queryBuilder = {
    offset: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    addFrom: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    getMany: jest.fn(),
    getOne: jest.fn(),
    delete: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
  }
}
export class HeroMockRepository extends MockRepository<Hero> {}
describe('The ImageService', () => {
  let heroService: HeroService
  let mockRepoService: HeroMockRepository
  let module: TestingModule
  let getMany: jest.Mock
  beforeEach(async () => {
    getMany = jest.fn()
    module = await Test.createTestingModule({
      providers: [
        HeroService,
        {
          provide: getRepositoryToken(Hero),
          useClass: HeroMockRepository,
        },
        {
          provide: REQUEST,
          useValue: {},
        },
      ],
    }).compile()
    heroService = await module.get(HeroService)
    mockRepoService = await module.get(getRepositoryToken(Hero))
  })

  describe('when getting hero and replace name', () => {
    describe('and all heroes name is Hieu', () => {
      const heroes: Hero[] = []
      beforeEach(() => {
        const hero = new Hero()
        hero.id = 1
        hero.name = 'Supper Man'
        hero.power = 99
        heroes.push(hero)
        mockRepoService.queryBuilder.getMany.mockReturnValue(Promise.resolve(heroes))
        // getMany.mockReturnValue(Promise.resolve(null))
      })
      it('should return the heroes', async () => {
        const fetchedHero = await heroService.getMany()
        expect(fetchedHero).toMatchObject([
          {
            id: 1,
            name: 'Hieu',
            power: 99,
          },
        ])
      })
    })
  })
})
