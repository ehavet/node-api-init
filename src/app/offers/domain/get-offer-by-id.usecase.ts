import { Offer } from './offer'
import { OffersRepository } from './offers.repository'

export interface GetOfferById {
    (id: string): Offer
}

export namespace GetOfferByIdUsecaseFactory {
    export function factory (
      offersRepository: OffersRepository
    ): GetOfferById {
      return (id: string): Offer => {
        return offersRepository.get(id)
      }
    }
}
