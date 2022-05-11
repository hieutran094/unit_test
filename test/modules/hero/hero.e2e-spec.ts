import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { HeroModule } from 'src/modules/hero/hero.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnection, Connection } from 'typeorm'
import { HeroService } from 'src/modules/hero/hero.service'
import { Hero } from 'src/modules/hero/hero.entity'
import { DatabaseModule } from 'src/database/database.module'

describe('Hero controller (e2e)', () => {
  let app: INestApplication
  let conn: Connection
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, HeroModule, TypeOrmModule.forFeature([Hero])],
      providers: [HeroService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    conn = getConnection()
  })
  describe('/heroes (GET)', () => {
    beforeEach(async () => {
      const heroRepo = await conn.getRepository(Hero)
      const saveHero = []
      for (let i = 1; i <= 5000; i++) {
        saveHero.push({
          name: `Super Man ${i}`,
          power: i,
        })
      }
      await heroRepo.save(saveHero)
    })
    it('it should return 1 item', () => {
      return request(app.getHttpServer())
        .get('/heroes')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveLength(5000)
        })
    })
  })

  afterEach(async () => {
    await conn.close()
    await app.close()
  })
})
