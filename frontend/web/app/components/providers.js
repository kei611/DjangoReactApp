'use client'

import React from 'react'
import { CartProvider as USCProvider } from 'use-shopping-cart'

function CartProvider({ children }) {
    return (
        <USCProvider
            mode={"checkout-session"}
            stripe="pk_test_51KpPxCBpT7ryj6PXWVlRRfrzeL0VnSyDBhi4iAuxdIsHGEP7wdSgGqLUFDe9StNZ4exJVaqme7Ds7rszOv6HG3VI006oZD5XVZ"
            currency={'JPY'}
            allowedCountries={['US', 'GB', 'JP']}
            billingAddressCollection={true}
        >
            {children}
        </USCProvider>
    )
}

export default CartProvider
