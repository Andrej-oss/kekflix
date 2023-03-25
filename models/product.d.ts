import {Price} from "./Price";

export type ProductType = {
    readonly BASIC, readonly STANDART, readonly PREMIUM
}
export interface Product {
    id: string,
    object: string,
    active: boolean,
    attributes: [],
    created: number,
    default_price: string,
    description: string | null,
    images: string[],
    livemode: boolean,
    metadata: {
        portability: string,
        resolution: string,
        videoQuality: string
    },
    name: string,
    package_dimensions: string | null,
    shippable: string | null,
    statement_descriptor: string | null,
    tax_code: number | null,
    type: string,
    unit_label: string | null,
    updated: number,
    url: string | null,
    price?: Price
}