import useAuth from "../store/hooks/useAuth";
import {useSubscription} from "../store/hooks/useSubscription";
import React, {useState} from "react";
import {Loader} from "./index";
import axios from "axios";
import {useRouter} from "next/router";


function Membership() {
    const { user } = useAuth();
    const router = useRouter();
    const subscriptions = useSubscription(user);
    const [isBillingLoading, setIsBillingLoading] = useState<boolean>(false);

    const manageSubscription = () => {
        const subscription = subscriptions[0]
        const goToBillingPostal = async () => {
            const response = await axios.get<{url: string}>(`/api/stripe/subscription/customer/${subscription.customer}`);
            setIsBillingLoading(false);
            router.push(response.data.url);
        }

        if(subscription) {
            setIsBillingLoading(true)
            goToBillingPostal()
        }
    }

    return (
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
            <div className="space-y-2 py-4">
                <h4 className="text-lg text-[gray]">Membership & Billing</h4>
                <button
                    disabled={isBillingLoading || !subscriptions.length}
                    className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
                    onClick={manageSubscription}
                >
                    {isBillingLoading ? (
                        <Loader color="dark:fill-[#e50914]" />
                    ) : (
                        'Cancel Membership'
                    )}
                </button>
            </div>

            <div className="col-span-3">
                <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
                    <div>
                        <p className="font-medium">{user?.email}</p>
                        <p className="text-[gray]">Password: ********</p>
                    </div>
                    <div className="md:text-right">
                        <p className="membershipLink">Change email</p>
                        <p className="membershipLink">Change password</p>
                    </div>
                </div>

                <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
                    <div>
                        <p>
                            {subscriptions[0]?.cancel_at_period_end
                                ? 'Your membership will end on '
                                : 'Your next billing date is '}
                            {new Date(subscriptions[0]?.current_period_end * 1000).toLocaleString("us")}
                        </p>
                    </div>
                    <div className="md:text-right">
                        <p className="membershipLink">Manage payment info</p>
                        <p className="membershipLink">Add backup payment method</p>
                        <p className="membershipLink">Billing Details</p>
                        <p className="membershipLink">Change billing day</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Membership;