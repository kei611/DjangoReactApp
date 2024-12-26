'use client'

import React from 'react'
import { CartProvider as USCProvider } from 'use-shopping-cart'

function CartProvider({ children }) {
    console.log("ストライプ：" + process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    return (
        <USCProvider
            mode={"checkout-session"}
            stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
            currency={'JPY'}
            allowedCountries={['US', 'GB', 'JP']}
            billingAddressCollection={true}
        >
            {children}
        </USCProvider>
    )
}

export default CartProvider
