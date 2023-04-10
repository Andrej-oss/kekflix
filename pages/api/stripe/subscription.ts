import type {NextApiRequest, NextApiResponse} from 'next';
import {Subscription} from "../../../models/Subscription";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Subscription[]>
) {
    const {email} = req.body;
    if (!email) return;

    const {data: customer} = await stripe.customers.search({
        query: "email:\"" + email + "\""
    });
    if (!customer.length) {
        return;
    }
    const {data: subscriptions}: { data: Subscription[] } = await stripe.subscriptions.list({
        customer: customer[0].id
    });

    const activeSubscriptions = subscriptions
        .filter(subscription => subscription.status === "active" || subscription.status || "trialing");
    return res.status(200).json(activeSubscriptions);
}