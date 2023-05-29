import React from 'react'
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"


const CartItemCard = ({ }) => {
    const { product } = useSelector(
        state => state.productDetails)
    return (
        <div className="CartItemCard">
            <img src={product.images[0].url} alt="ssa" />
            <div>
                <Link to={`/product/${product._id}`} className="name">{product.name}</Link>
                <span className='id'>Product id : {product._id}</span>
                <span className=''>{`Price: ₹${product.price}`}</span>
            </div>
            <div className='price'>{product.price}</div>
        </div>
    )
}

export default CartItemCard