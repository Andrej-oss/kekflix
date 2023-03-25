import Link from "next/link";
import Head from "next/head";
import {CheckIcon} from "@heroicons/react/outline";
import {useState} from "react";
import {Product} from "../models/product";
import {Loader, Table} from "./index";
import {movieHook} from "../store/hooks/hooks";
import axios from "axios";
import {useRouter} from "next/router";

function Plans() {
    const router = useRouter();
    const {data: products, isLoading, error} = movieHook.useGetProductsQuery();
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(null);
    const [isBillingLoading, setIsBillingLoading] = useState(false);
    console.log(products);

    const subscribeToPlan = async () => {
        setIsBillingLoading(true);
        if (!selectedPlan) return;
        const checkoutUrl = await axios.post("api/stripe/checkout-stripe-session", selectedPlan);
        console.log(checkoutUrl);
        router.push(checkoutUrl.data)
        setIsBillingLoading(false)
    }

    return (
        <div>
            <Head>
                <title>Kekflix</title>
                <link rel={"icon"} href={"/favicon.ico"}/>
            </Head>
            <header>
                <Link href={"/"}>
                    <img
                        className="cursor-pointer object-contain p-2"
                        src="https://rb.gy/ulxxee"
                        width={100}
                        height={100}/>
                </Link>
            </header>
            <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
                <h1 className="mb-3 text-3xl font-medium">
                    Choose the plan that's right for you
                </h1>
                {error && <p className="text-red-500">{error.toString()}</p>}
                <ul>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]"/> Watch all you want.
                        Ad-free.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]"/> Recommendations
                        just for you.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]"/> Change or cancel
                        your plan anytime.
                    </li>
                </ul>

                <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex w-full items-center justify-end self-end md:w-3/5">
                        {products && products.map((product) => (
                            <div
                                className={`planBox ${product &&
                                (selectedPlan?.id === product.id) ? 'opacity-100' : 'opacity-60'
                                }`}
                                key={product.id}
                                onClick={() => setSelectedPlan(product)}
                            >
                                {product.name}
                            </div>
                        ))}
                    </div>
                    <Table products={products} selectedPlan={selectedPlan}/>
                    <button
                        disabled={!selectedPlan || isBillingLoading}
                        className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px]
                         ${isBillingLoading && 'opacity-60'} ${!selectedPlan && 'bg-gray-500 disabled:bg-gray-500 cursor-not-allowed'}`}
                        onClick={subscribeToPlan}
                    >
                        {isBillingLoading ? (
                            <Loader color="dark:fill-gray-300"/>
                        ) : (
                            'Subscribe'
                        )}
                    </button>
                </div>

            </main>
        </div>
    );
}

export default Plans;