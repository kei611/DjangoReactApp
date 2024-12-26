"use client";

import { useShoppingCart } from 'use-shopping-cart'
import CartItem from './CartItem'
import CheckoutButton from './CheckoutButton'

const CartModal = () => {
    // TEMPORARY
    const cartItems = true;
    const { formattedTotalPrice, shouldDisplayCart, cartCount, cartDetails, redirectToCheckout } = useShoppingCart()
    const mergedEntries = Object.values(cartDetails ?? {}).reduce((acc, entry) => {
        // すでに同じIDがacc（累積オブジェクト）に存在するか確認
        const existingEntry = acc.find(item => item.name === entry.name);

        if (existingEntry) {
            // 既存のアイテムがあれば、quantityを増やす
            existingEntry.quantity += entry.quantity;
        } else {
            // まだ存在しない場合、新しいアイテムをaccに追加
            acc.push({ ...entry });
        }
        return acc;
    }, []);

    return (
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
            {cartCount && cartCount == 0 ? (
                <div className="">Cart is Empty</div>
            ) : (
                <>
                    <h2 className='text-xl'>Shopping Cart</h2>
                    {/* List */}
                    <div className='flex flex-col gap-8'>
                        {/* ITEM */}
                        {mergedEntries.map((entry) => (
                            <CartItem key={entry.name} item={entry} />
                        ))}

                    </div>
                    {/* Bottom */}
                    <div className=''>
                        <div className='flex items-center justify-between font-semibold'>
                            <span className="">SubTotal</span>
                            <span className="">{formattedTotalPrice}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className='flex justify-between text-sm'>
                            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">View Cart</button>
                            <CheckoutButton />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartModal;
