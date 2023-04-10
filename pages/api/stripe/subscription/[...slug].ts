import type { NextApiRequest, NextApiResponse } from 'next'
import {Product} from "../../../../models/product";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const { slug } = req.query;
    if (!slug.length) return res.status(400).json({message: "Provide id"});
    const subscriptionId = slug[0];

    if (req.method === "DELETE") {
        try {
            stripe.subscriptions.del(subscriptionId);
        } catch (e: Error | any) {
            return res.status(e.status).json({message: e.message})
        }
    } else if (req.method === "UPDATE") {
        const newPlan: Product = req.body;
        try {
            stripe.subscriptions.update(
                subscriptionId,
                {metadata: newPlan}
            );
        } catch (e: Error | any) {

        }
    }
    res.status(200).json({ name: slug[0] })
}
