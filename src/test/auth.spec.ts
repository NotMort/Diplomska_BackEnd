import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../modules/app.module'

describe('Auth API', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('naj zavrne napačno prijavo', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'wronguser', password: 'wrongpass' })

    expect(res.status).toBe(401)
  })

  it('naj omogoči prijavo z veljavnimi podatki', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('accessToken')
  })
})
