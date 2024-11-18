'use client'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import Image from 'next/image'

export default function CartItem({ item }) {
    const { name, emoji, quantity, price, image } = item
    const { removeItem } = useShoppingCart()

    const removeItemFromCart = () => {
        removeItem(item.id)
    }

    return (
        <div className="flex gap-4">
            <Image
                src={image}
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
            />
            <div className='flex felx-col justify-between w-full'>
                {/* TOP */}
                <div className=''>
                    {/* TITLE */}
                    <div className='flex items-center justify-between gap-8'>
                        <h3 className="font-semibold">{ name }</h3>
                        {/* <div className='p-1 bg-gray-50 rounded-sm'>
                            {formatCurrencyString({value: price*quantity, currency: 'JPY'})}
                        </div> */}
                        <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                            {item.quantity && item.quantity > 1 && (
                                <div className="text-xs text-green-500">
                                    {quantity} x{" "}
                                </div>
                            )}
                            {formatCurrencyString({ value: price, currency: 'JPY' })}
                        </div>
                    </div>
                    {/* DESC*/}
                    <div className='text-sm text-gray-500'>
                        available
                    </div>
                    {/* BOTTOM */}
                    <div className='flex justify-between text-sm'>
                        <span className="text-gray-500">QTY. {quantity}</span>
                        <span
                            className="text-blue-500"
                            onClick={() => removeItemFromCart()}
                        >
                            Remove
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
