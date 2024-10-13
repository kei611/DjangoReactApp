"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";

const NavIcons = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            {/* <div */}
                {/* className="relative cursor-pointer" */}
                {/* onClick={() => setIsCartOpen((prev) => !prev)} */}
            {/* > */}
                {/* <Image src="/cart.png" alt="" width={22} height={22} /> */}
                {/* <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center"> */}
                    {/* {counter} */}
                {/* </div> */}
            {/* </div> */}
            {/* {isCartOpen && <CartModal />} */}
            <div className="relative cursor-pointer" onClick={() => setIsCartOpen((prev) => !prev)}>
            <Image
                src="/cart.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer"
            />
            <div className='absolute -top-4 -right-4 w-6 h-6 bg-red rounded-full text-white text-sm flex items-center justify-center'>2</div>
            </div>
            {isCartOpen && <CartModal />}
        </div>
    );
};

export default NavIcons;
