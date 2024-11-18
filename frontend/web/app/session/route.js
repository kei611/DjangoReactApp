import { stripe } from '../../lib/stripe'
import { headers } from 'next/headers'
// import { products } from '../data/products'
import { validateCartItems } from 'use-shopping-cart/utilities'

export async function POST(request) {
    // const inventory = products
    // const cartProducts = await request.json()
    // const line_items = validateCartItems(inventory, cartProducts)
    // console.log('line_items', line_items)

    // const { price, quantity } = request.body
    // console.log(request.body)
    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        submit_type: 'pay',
        // line_items,
        line_items: [{
            price: "price_1MSvcTBpT7ryj6PXiVopDiHe",
            quantity: 2,
            // 個数の変更をサポートする
            // adjustable_quantity: {
            //     enabled: true,
            //     minimum: 1,
            //     maximum: 10,
            // }
        }],
        success_url: `${headers().get('origin')}/success`,
        cancel_url: `${headers().get('origin')}/`
    })
    return Response.json({ sessionId: checkoutSession.id })
}
