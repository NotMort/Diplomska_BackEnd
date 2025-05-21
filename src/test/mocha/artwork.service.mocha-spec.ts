import { expect } from 'chai'
import { ArtworkService } from 'modules/artwork/artwork.service'
import { Test } from '@nestjs/testing'
import { ArtworkModule } from 'modules/artwork/artwork.module'

describe('ArtworkService (Mocha)', () => {
  let artworkService: ArtworkService

  before(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ArtworkModule],
    }).compile()

    artworkService = moduleRef.get<ArtworkService>(ArtworkService)
  })

  it('should be defined', () => {
    expect(artworkService).to.exist
  })
})
