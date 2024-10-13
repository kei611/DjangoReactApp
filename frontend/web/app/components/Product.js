import React from 'react'
import {Card} from 'react-bootstrap'


export default function Product({ product }) {
    return (
        <Card className='my-3 p-3 rounded'>
            <div href={'/product/${product._id}'}>
                {/* <image src={ product.image}/> */}
                <img src={product.image}></img>
            </div>
            <div>
                <div href={'/product/${product._id}'}>
                    {/* <image src={ product.image}/> */}
                    <h3>{ product.name}</h3>
                </div>
                <div>
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </div>
                <div>
                    ${ product.price}
                </div>
            </div>
        </Card>
    )
}
