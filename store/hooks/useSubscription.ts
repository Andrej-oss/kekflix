import {User} from "firebase/auth";
import {useEffect, useState} from "react";
import axios from "axios";
import {Subscription} from "../../models/Subscription";

export const useSubscription = (user: User | null): Subscription[] => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

    useEffect(() => {
        if (!user) return;
        const getSubscriptions = async () =>  axios.post<Subscription[]>("api/stripe/subscription", user)
            .then(res => {
                if (res.data.length) {
                    setSubscriptions(res.data);
                }
            });
        setTimeout(() => getSubscriptions(), 500);
    }, [user])

    return subscriptions;
}