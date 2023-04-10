import {NextApiRequest, NextApiResponse} from "next";
import {buffer} from "micro";

const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "POST") {
        const buf = await buffer(req);

        const sig = req.headers["stripe-signature"];

        let stripeEvent;

        try {
            stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            console.log('stripeEvent', stripeEvent);
        } catch (err: Error | any) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if ('checkout.session.completed' === stripeEvent.type) {
            const session = stripeEvent.data.object;
            console.log('sessionsession', session);
            console.log('✅ session.metadata.orderId', session.metadata.orderId, session.id);
            // Payment Success.
            try {
            } catch (error) {
                console.error('Update order error', error);
            }
        } else if ('invoice.payment_failed' === stripeEvent.type) {
            console.log(stripeEvent.type)
        }  else if ('invoice.paid' === stripeEvent.type) {
            console.log(stripeEvent.type)
        }  else {
            console.log('unhandled event' + stripeEvent.type)
        }

        res.json({received: true});
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
