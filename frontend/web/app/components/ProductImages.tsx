"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ item, images }: { item: any; images: any; }) => {
    const [index, setIndex] = useState(0);

    return (
        <div className="">
            <div className="h-[500px] relative">
                <Image
                    src={item}
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-cover rounded-md"
                />
            </div>
            <div className="flex justify-between gap-4 mt-8">
                {images.map((img, i) => (
                    <div
                        className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
                        key={img.id}
                        onClick={() => setIndex(i)}
                    >
                        <Image
                            src={img.image}
                            alt=""
                            fill
                            sizes="30vw"
                            className="object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;
