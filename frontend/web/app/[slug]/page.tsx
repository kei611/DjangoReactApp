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

    const [productImage, setProductImage] = useState([])
    useEffect(() => {
        async function fetchProductImage() {
            const { data } = await axios.get(`/api/base/productImages/${params.slug}`)
            setProductImage(data)
        }
        fetchProductImage()
    }, [])

    // const [product_variation, setVariations] = useState([])
    // useEffect(() => {
    //     async function fetchVariations() {
    //         const { data } = await axios.get(`/api/base/variations/${params.slug}`)
    //         setVariations(data)
    //     }
    //     fetchVariations()
    // }, [])


    // const [variations, setVariations] = useState([])
    // useEffect(() => {
    //     async function fetchVariations() {
    //         const { data } = await axios.get(`/api/base/variations/${params.slug}`)
    //         setVariations(data)
    //     }
    //     fetchVariations()
    // }, [])

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
            {/* IMG */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductImages item={product.image} images={productImage } />
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
                <CustomizeProducts slug={ params.slug} />
                {/* <CustomizeProducts product={ product } variations={ variations } /> */}
                {/* <Add product={product} variantId={"00000000-0000-0000-0000-000000000000"}/> */}
                {/* <div className="h-[2px] bg-gray-100" />
                {product.variants && product.productOptions ? (
                    <CustomizeProducts
                        productId={product._id!}
                        variants={product.variants}
                        productOptions={product.productOptions}
                    />
                ) : (
                    <Add
                        productId={product._id!}
                        variantId="00000000-0000-0000-0000-000000000000"
                        stockNumber={product.stock?.quantity || 0}
                    />
                )} */}

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
