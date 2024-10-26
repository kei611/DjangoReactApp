'use client'

import React from 'react'
import { CartProvider as USCProvider } from 'use-shopping-cart'

function CartProvider({ children }) {
    return (
        <USCProvider
            mode="checkout-session"
            stripe={process.env.NEXY_PUBLIC_STRIPE_KEY}
            currency={'USD'}
            allowedCountries={['US', 'GB', 'CA']}
            billingAddressCollection={true}
        >
            {children}
        </USCProvider>
    )
}

export default CartProvider
