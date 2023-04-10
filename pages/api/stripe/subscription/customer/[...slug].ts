import type {NextApiRequest, NextApiResponse} from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {slug} = req.query;
    if (!slug.length) return res.status(400).json({message: "Provide id"});
    const customerId = slug[0];
    let session;

    try {
        session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: process.env.SERVER_URL
        });
    } catch (e: Error | any) {
        return res.status(e.status).json({message: e.message})
    }

    return res.status(200).json({url: session.url})
}