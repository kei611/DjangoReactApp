'use client'

import ProductImages from "../components/ProductImages";
import CustomizeProducts from "../components/CustomizeProducts";
import Add from "../components/Add";
import { useState, useEffect } from "react";
import axios from "axios";

const SinglePage = ({ params }: { params : {slug: string} }) => {

    const [product, setProduct] = useState([])
    useEffect(() => {
        async function fetchProduct() {
            const {data} = await axios.get(`/api/base/products/${params.slug}`)
            setProduct(data)
        }
        fetchProduct()
    }, [])

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
            {/* IMG */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductImages items={product.image} />
            </div>
            {/* TEXTS */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-4xl font-medium">{product.name}</h1>
                <p className="text-gray-500">
                    {product.description}
                </p>
                <div className="h-[2px] bg-gray-100" />
                <div className="flex items-center gap-4">
                    <h3 className="text-xl text-gray-500 line-through">¥{product.price}</h3>
                    <h3 className="text-xl text-gray-2xl">¥{product.price}</h3>
                </div>
                <div className="h-[2px] bg-gray-100" />
                <CustomizeProducts />
                <Add />
                <div className="h-[2px] bg-gray-100" />
                <div className="text-sm">
                    <h4 className="font-medium mb-4">Title</h4>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;
