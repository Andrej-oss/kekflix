import type { NextApiRequest, NextApiResponse } from 'next';
import {ClientProduct} from "../../../models/ClientProduct";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { product: {price}, email }: ClientProduct = req.body;

    try {
        const customerData = await stripe.customers.search({
            query: "email:\"" + email + "\""
        });

        const session = customerData.data.length
            ? await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            customer: customerData.data.length ? customerData.data[0].id : null,
            line_items: [{
                price: price?.id,
                quantity: 1
            }],
            success_url: `${process.env.SERVER_URL}`,
            cancel_url: `${process.env.SERVER_URL}`,
        })
            : await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'subscription',
                line_items: [{
                    price: price?.id,
                    quantity: 1
                }],
                success_url: `${process.env.SERVER_URL}`,
                cancel_url: `${process.env.SERVER_URL}`,
            }) ;
        res.status(200).json(session.url);
    } catch (error: Error | any) {
        res.status(400).json(error.message)
    }
}