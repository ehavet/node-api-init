import { GetOffers, GetOffersUsecaseFactory } from '../../../../src/app/offers/domain/get-offers.usecase'
import { OffersRepository } from '../../../../src/app/offers/domain/offers.repository'
import { OffersLiveRepository } from '../../../../src/app/offers/infrastructure/offers-live.repository'
import { Offer } from '../../../../src/app/offers/domain/offer'
import { expect } from '../../../test-utils'
import {expectedOfferList} from "../expected-offer-list.fixture";

describe('Usecase - Get offers', async () => {
  const offersRepository: OffersRepository = new OffersLiveRepository()
  const getOffers: GetOffers = GetOffersUsecaseFactory.factory(offersRepository)

  it('should return an offer', async () => {
    const result: Offer[] = await getOffers()
    expect(result).to.deep.equal(expectedOfferList)
  })
})
