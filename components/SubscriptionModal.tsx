"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import { useUser } from "@/hooks/useUser";
import useSubscriptionModal from "@/hooks/useSubscriptionModal";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripClient";
import { Price, ProductWithPrice } from "@/types";

import Modal from "./Modal";
import Button from "./Button";

interface SubscriptionModalProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
    products
}) => {
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const { user, isLoading, subscription } = useUser();
    const subscriptionModal = useSubscriptionModal();

    const onChange = (open: boolean) => {
        if (!open) {
            subscriptionModal.onClose();
        }
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in')
        }

        if (subscription) {
            setPriceIdLoading(undefined)
            return toast.error('Already subscribed.')
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });

            const stripe = await getStripe();

            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            return toast.error((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };

    let content = (
        <div className="text-center">
            No products available.
        </div>
    );

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {

                    if (!product.prices?.length) {
                        return (
                            <div
                                key={product.id}
                            >
                                No prices available.
                            </div>
                        );
                    }

                    return product.prices.map((price) => (
                        <Button
                            key={price.id}
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            className="mb-4"
                        >
                            {`Subscribe for just ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ));
                })}
            </div>
        )
    }

    if (subscription) {
        content = (
            <div className="text-center">
                Already Subscribed
            </div>
        )
    }

    return (
        <Modal
            title="Only for premium users"
            description="Listen to music with Spotify Premium"
            isOpen={subscriptionModal.isOpen}
            onChange={onChange}>
            {content}
        </Modal>
    );
}

export default SubscriptionModal;