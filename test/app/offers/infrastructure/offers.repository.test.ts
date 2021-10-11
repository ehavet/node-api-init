import { OffersLiveRepository } from '../../../../src/app/offers/infrastructure/offers-live.repository'
import { OffersRepository } from '../../../../src/app/offers/domain/offers.repository'
import { expect } from '../../../test-utils'
import {expectedOfferList} from "../expected-offer-list.fixture";

describe('Offers repository', async () => {
  const offersRepository: OffersRepository = new OffersLiveRepository()

  describe('get', async () => {
    it('should return and offer by id', async () => {
      expect(offersRepository.getAll()).to.deep.equal(expectedOfferList)
    })
  })
})
