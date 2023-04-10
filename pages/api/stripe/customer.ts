import {NextApiRequest, NextApiResponse} from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {email} = req.body;

    if (!email) return res.status(400).json({message: "Provide email"});

    const {data: customer} = await stripe.customers.search({
        query: "email:\"" + email + "\""
    });

    if (customer.length) {
        return res.status(201);
    }
    if (!customer.length) {
        try {
            await stripe.customers.create({
                email: email,
                payment_method: 'pm_card_visa',
                invoice_settings: {default_payment_method: 'pm_card_visa'},
            });

            return res.status(201);
        } catch (e: Error | any) {
            return res.status(400).json({message: e.message})
        }
    }
}