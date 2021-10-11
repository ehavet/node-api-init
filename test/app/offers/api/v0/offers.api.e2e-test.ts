import * as supertest from 'supertest'
import {expect, HttpServerForTesting, newProdLikeServer} from '../../../../test-utils'
import {expectedOfferList} from "../../expected-offer-list.fixture";

describe('Offers - API - E2E', async () => {
    let httpServer: HttpServerForTesting
    before(async () => {
        httpServer = await newProdLikeServer()
    })

    describe('GET /v0/offers', () => {
        let response: supertest.Response

        it('should return offer list', async () => {
            response = await httpServer.api()
                .get('/v0/offers')
            expect(response.body).to.deep.equal(expectedOfferList)
        })
    })
})
