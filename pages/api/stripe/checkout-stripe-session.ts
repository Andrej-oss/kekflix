import type { NextApiRequest, NextApiResponse } from 'next';
import {Product} from "../../../models/product";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

type Data = {
    name: string,
    price: number,
    quantity: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { name, price, id, metadata, }: Product = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [{
                price: price?.id,
                quantity: 1
            }],
            success_url: `${process.env.SERVER_URL}`,
            cancel_url: `${process.env.SERVER_URL}`,
        });
        res.status(200).json(session.url);
    } catch (error: Error | any) {
        res.status(400).json(error.message)
    }
}