import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { HeroModule } from 'src/modules/hero/hero.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { HeroService } from 'src/modules/hero/hero.service'
import { Hero } from 'src/modules/hero/hero.entity'
import { DatabaseModule } from 'src/database/database.module'

describe('Hero controller (e2e)', () => {
  let app: INestApplication
  let connection: Connection
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, HeroModule, TypeOrmModule.forFeature([Hero])],
      providers: [HeroService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    connection = app.get(Connection)
  })
  describe('/heroes (GET)', () => {
    beforeEach(async () => {
      const heroRepo = await connection.getRepository(Hero)
      const saveHero = []
      for (let i = 1; i <= 100; i++) {
        saveHero.push({
          name: `Test Man ${i}`,
          power: i,
        })
      }
      await heroRepo.save(saveHero)
    })
    it('it should return 1 item', async () => {
      const response = await request(app.getHttpServer()).get('/heroes').expect(200)
      expect(response.body).toHaveLength(103)
      expect(response.body[0]).toStrictEqual({
        id: 1,
        name: 'Iron Man',
        power: 98,
        universe: null,
      })
    })
  })

  afterEach(async () => {
    await connection.close()
    await app.close()
  })
})
