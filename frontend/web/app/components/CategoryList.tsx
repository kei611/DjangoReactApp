'use client'

import Image from "next/image";
import Link from "next/link";
import axios from 'axios'
import { useEffect, useState } from "react";

const CategoryList = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        async function fetchCategories() {
            const { data } = await axios.get('/api/base/categories/')
            setCategories(data)
        }
        fetchCategories()
    }, [])

    return (
        <div className="px-4 overflow-x-scroll scrollbar-hide">
            <div className="flex gap-4 md:gap-8">
                {categories.map(category => (
                    <Link href={`/list?cat=${category.slug}`}
                        className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
                        key={category._id}>
                        <div className='relative bg-slate-100 w-full h-96'>
                            <Image
                                src={category.image || "/Club Item.jpg"}
                                alt=""
                                fill
                                sizes="20vw"
                                className="object-cover"
                            />
                        </div>
                        <h1 className="mt-8 font-light text-cl tracking-wide">{category.name}</h1>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
