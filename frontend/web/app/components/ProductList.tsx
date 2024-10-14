'use client'

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import axios from 'axios'

const PRODUCT_PER_PAGE = 20;

const ProductList = ({ categoryId, limit }: { categoryId: string;  limit?: number}) => {

    const [products, setProdurcts] = useState([])
    useEffect(() => {
        async function fetchProducts() {
            const { data } = await axios.get('/api/base/products/')
            setProdurcts(data)
        }
        fetchProducts()
    }, [])

    return (
        <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
            {products.map(product => (
                <Link
                    href={"/" + product.slug}
                    className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
                    key={product._id}
                >
                    <div className="relative w-full h-80">
                        <Image
                            src={product.image || "Dog.jpg"}
                            alt=""
                            fill
                            sizes="25vw"
                            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                        />
                        <Image
                            src="/Makinoudon_LongT_back.jpg"
                            alt=""
                            fill
                            sizes="25vw"
                            className="absolute object-cover rounded-md"
                        />
                    </div>
                    <div className='flex justify-between'>
                        <span className="font-medium">{ product.name}</span>
                        <span className="font-semibold">￥{ product.price}</span>
                    </div>
                    <div className='text-sm text-gray-500'>{ product.description}</div>
                    <button className="rounded-2xl ring-1 ring-red text-red w-max py-2 px-4 text-xs hover:bg-red hover:text-white">Add to Cart</button>
                    </Link>
            ))}
        </div>
    )
}

export default ProductList;
