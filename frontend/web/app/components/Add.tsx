"use client"

import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

const Add = ({product}) => {
    const [quantity, setQuantity] = useState(1);

    const stock = 4

    const handleQuantity = (type: "i" | "d") => {
        if (type === "d" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
        if (type === "i" && quantity < stock) {
            setQuantity((prev) => prev + 1);
        }
    };

    const { addItem } = useShoppingCart();

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const addToCart = () => {
        addItem(product, {count: quantity})
        // console.log(product.name)
        setQuantity(1)
    }

    return (
        <div className='flex flex-col gap-4'>
            <h4 className="font-medium">Choose a Quantity</h4>
            <div className='flex justify-between'>
                <div className="flex items-center gap-4">
                    <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                        <button className="cursor-pointer text-xl" onClick={()=>handleQuantity("d")}>-</button>
                        {quantity}
                        <button className="cursor-pointer text-xl" onClick={() => handleQuantity("i")}>+</button>
                    </div>
                <div className="text-xs">
                    Only<span className="text-orange-500"> 4 items </span>left! <br />{"Dont't"}{""} miss it</div>
                </div>
                <button onClick={()=>addToCart()} className="w-36 text-sm rounded-3xl ring-1 ring-red text-red py-2 px-4 hover:bg-red hover:text-white disabled:cursor-not-allwed disabled:bg-pink-200 disabled:text-white disabled:ring-none">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Add
