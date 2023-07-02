"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { postData } from "@/libs/helpers";
import useSubscriptionModal from "@/hooks/useSubscriptionModal";
import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";

const AccountContent = () => {
    const router = useRouter();
    const subscriptionModal = useSubscriptionModal();
    const { isLoading, subscription, user } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/')
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            if (error) {
                toast.error((error as Error).message);
            }
        }
        setLoading(false);
    }

    return (
        <div
            className="
        mb-7
        px-6
        ">
            {!subscription && (
                <div className="
                flex
                flex-col
                gap-y-4">
                    No active plan.
                    <Button
                        onClick={subscriptionModal.onOpen}
                        className="
                    w-[300px]">
                        Subscribe
                    </Button>

                </div>
            )}
            {subscription && (
                <div
                    className="
                flex
                flex-col
                gap-y-4
                ">
                    <p>
                        You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.
                    </p>
                    <Button
                    disabled={loading || isLoading}
                    onClick={redirectToCustomerPortal}
                    className="
                    w-[300px]
                    ">
                        Open customer portal
                    </Button>
                </div>
            )}
        </div>
    );
}

export default AccountContent;