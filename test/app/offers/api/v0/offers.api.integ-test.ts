import * as supertest from 'supertest'
import { HttpServerForTesting, newMinimalServer } from '../../../../utils/server.test-utils'
import { container, offersRoutes } from '../../../../../src/app/container'
import { expect, sinon } from '../../../../test-utils'
import {expectedOfferList} from "../../expected-offer-list.fixture";

describe('Offers - API - Integ', async () => {
  let httpServer: HttpServerForTesting

  before(async () => {
    httpServer = await newMinimalServer(offersRoutes())
  })

  describe('GET /v0/offers', () => {
    let response: supertest.Response

    describe('when success', () => {
      beforeEach(async () => {
        sinon.stub(container, 'GetOffers').resolves(expectedOfferList)
        response = await httpServer.api()
          .get('/v0/offers')
      })

      it('should reply with status 200', async () => {
        expect(response).to.have.property('statusCode', 200)
      })

      it('should return an offer list', async () => {
        expect(response.body).to.deep.equal(expectedOfferList)
      })
    })

    describe('when there is an unknown error', () => {
      it('should reply with status 500 when unknown error', async () => {
        sinon.stub(container, 'GetOffers').rejects(Error)
        response = await httpServer.api()
          .get('/v0/offers')

        expect(response).to.have.property('statusCode', 500)
      })
    })
  })
})
