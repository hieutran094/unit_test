import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request = require('supertest')
import { AppModule } from 'src/app.module'
import { DatabaseModule } from '../src/database/database.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(200)
    expect(response.body).toStrictEqual({ msg: 'Hello World' })
  })

  afterAll(async () => {
    await app.close()
  })
})
