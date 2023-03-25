import type { NextApiRequest, NextApiResponse } from 'next';
import {Product} from "../../../models/product";
import {Price} from "../../../models/Price";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Product[]>
) {
    try {
        const productsData: { data: Product[] } = await stripe.products.list();
        const pricesData: { data: Price[] } = await stripe.prices.list();

        const products = productsData.data.map(product => {
            return {...product, price: getPrice(product, pricesData.data)}
        });

        res.status(200).json(products);
    } catch (err: Error | any) {
        res.status(400).json(err.message);
    }
}

const getPrice = (product: Product, prices: Price[]): Price | undefined => {
    return prices.find(price => price.id === product.default_price)
}