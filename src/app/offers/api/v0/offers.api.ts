import {Container} from "../../../container";
import * as HttpErrorSchema from "../../../http.error-schema";
import {ServerRoute} from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import {Offer} from "../../domain/offer";
import Joi from "joi";

export default function (container: Container): Array<ServerRoute> {
    return [
        {
            method: "GET",
            path: "/v0/offers",
            options: {
                description: "return offers",
                response: {
                    status: {
                        200: Joi.array().items(Joi.object().keys({
                            id: Joi.string().description('Offer id').example('5678'),
                            title: Joi.string().description('Offer title').example('Une grande maison'),
                            description: Joi.string().description('Offer description').example('3 piscines, 6 chambres, 10 salles de bains'),
                            price: Joi.number().description('Offer price').example(50.00),
                            address: Joi.object({
                                city: Joi.string().description('City').example('Paris'),
                                street: Joi.string().description('Street').example('67 rue du paradis'),
                                postal_code: Joi.string().description('Postal code').example('75010'),
                            }).label('Address')
                        })).label('Offer list'),
                        400: HttpErrorSchema.badRequestSchema,
                        404: HttpErrorSchema.notFoundSchema,
                        500: HttpErrorSchema.internalServerErrorSchema
                    }
                }
            },

            handler: async (_request, h) => {
                try {
                    const offers: Offer[] = await container.GetOffers();
                    return h.response(offers).code(200);
                } catch (error: any) {
                    throw Boom.internal(error);
                }
            },
        }
    ];
}
