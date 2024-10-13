'use client'

import React, { useState, useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'

// import products from '../products'
import axios from 'axios'

export default function Page() {
    const [products, setProdurcts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await axios.get('/api/base/products/')
            setProdurcts(data)
        }
    }, [])

    // const [data, setData] = useState({ message: '' })

    // useEffect(() => {
    //     axios.get('/api/base/backend')
    //         .then((res) => res.data)
    //         .then((data) => {
    //             setData(data)
    //         })
    // }, [])

    return (
        <div>
            <h1>Products</h1>
            <div>hello {products}!</div>
            <Row>
                {products.map(product => (
                    <Col key={ product._id} sm={12} md={6} lg={4} xl={3}>
                        {/* <h3>{ product.name}</h3> */}
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}
