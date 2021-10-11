import routes from './offers/api/v0/offers.api'
import { OffersRepository } from './offers/domain/offers.repository'
import { OffersLiveRepository } from './offers/infrastructure/offers-live.repository'
import { GetOffers, GetOffersUsecaseFactory } from './offers/domain/get-offers.usecase'
import { GetOfferById, GetOfferByIdUsecaseFactory } from './offers/domain/get-offer-by-id.usecase'

export interface Container {
    GetOffers: GetOffers
    GetOffer: GetOfferById
}

const offersRepository: OffersRepository = new OffersLiveRepository()
const getOffers: GetOffers = GetOffersUsecaseFactory.factory(offersRepository)
const getOffer: GetOfferById = GetOfferByIdUsecaseFactory.factory(offersRepository)

export const container: Container = {
  GetOffers: getOffers,
  GetOffer: getOffer
}

export function offersRoutes () {
  return routes(container)
}
