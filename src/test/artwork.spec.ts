import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../modules/app.module'

describe('Artwork API', () => {
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

  it('naj omogoči nalaganje slike', async () => {
    const res = await request(app.getHttpServer()).post('/artwork/upload').attach('file', 'test-images/sample.png')

    expect(res.status).toBe(201)
  })

  it('naj zavrne napačno datoteko', async () => {
    const res = await request(app.getHttpServer()).post('/artwork/upload').attach('file', 'test-images/invalid.txt')

    expect(res.status).toBe(400)
  })
})
