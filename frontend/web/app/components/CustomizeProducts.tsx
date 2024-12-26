import { useEffect, useState } from "react"
import Add from "./Add";
import axios from "axios";

const CustomizeProducts = ({ slug, }: { slug: string; }) => {

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string; }>({});

    const [product, setProduct] = useState([])
    useEffect(() => {
        async function fetchProduct() {
            const { data } = await axios.get(`/api/base/products/${slug}`)
            setProduct(data)
        }
        fetchProduct()
    }, [])

    const handleOptionSelect = (optionType: string, choice: string) => {
        setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
    };

    const [variations, setVariations] = useState([])
    useEffect(() => {
        async function fetchVariations() {
            const { data } = await axios.get(`/api/base/variations/${slug}`)
            setVariations(data)
        }
        fetchVariations()
    }, [])

    const [selectedVariant, setSelectedVariant] = useState(null);
    useEffect(() => {
        const variant = variations.find((v) => {
            const variantChoices_size = v.variation_size;
            const variantChoices_color = v.variation_color;
            // サイズまたは色の情報がない場合は除外
            if (!variantChoices_size || !variantChoices_color) return false;
            // selectedOptionsの各選択肢が、variantの選択肢（サイズ、色）と一致するかチェック
            return Object.entries(selectedOptions).every(([key, value]) => {
                if (key === 'Size') {
                    return variantChoices_size === value;  // サイズが一致するか
                }
                if (key === 'Color') {
                    return variantChoices_color === value;  // 色が一致するか
                }
                return false;  // その他の選択肢があれば、対応するロジックを追加する
            });
        });
        setSelectedVariant(variant);  // 見つかったバリアントを状態にセット
    }, [selectedOptions]);  // selectedOptions が変更されるたびに実行

    const disabled = false;
    const colors = Array.from(new Set(variations.map((v) => v.variation_color)));
    const sizes = Array.from(new Set(variations.map((v) => v.variation_size)));

    return (
        <div className='flex flex-col gap-6'>
            <div className="flex flex-col gap-4" key="color">
            <h4 className="font-medium">Choose a color</h4>
            <ul className='flex items-center gap-3'>
                {colors.map((color) => {
                    const selected_color = selectedOptions["Color"] === color;
                    const clickHandler_color = disabled
                        ? undefined
                        : () => handleOptionSelect("Color", color!);
                    return (
                        <li key={ color } className="ring-1 ring-red text-red rounded-md py-1 px-4 text-sm" style={{
                            cursor: disabled ? "not-allowed" : "pointer",
                            backgroundColor: selected_color ? "#f35c7a" : disabled ? "#FBCFE8" : "white",
                            color: selected_color || disabled ? "white" : "f35c7a",
                            boxShadow: disabled ? "none" : "",
                        }} onClick={clickHandler_color}>
                            {color}
                        </li>
                    )
                })}
            </ul>
            </div>
            <div className="flex flex-col gap-4" key="size">
            <h4 className="font-medium">Choose a size</h4>
            <ul className='flex items-center gap-3'>
                {sizes.map((size) => {
                    const selected = selectedOptions["Size"] === size;
                    const clickHandler = disabled
                        ? undefined
                        : () => handleOptionSelect("Size", size!);
                    return (
                        <li key={ size } className="ring-1 ring-red text-red rounded-md py-1 px-4 text-sm" style={{
                            cursor: disabled ? "not-allowed" : "pointer",
                            backgroundColor: selected ? "#f35c7a" : disabled ? "#FBCFE8" : "white",
                            color: selected || disabled ? "gray" : "f35c7a",
                            boxShadow: disabled ? "none" : "",
                        }} onClick={clickHandler}>
                            {size}
                        </li>
                    )
                })}
            </ul>
            </div>
            <Add product={product} variant={selectedVariant}/>
        </div>
    )
}

export default CustomizeProducts
