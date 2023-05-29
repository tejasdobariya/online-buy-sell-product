import React, { Fragment, useEffect } from 'react';
import "./Cart.css";
import CartItemCard from "./CartItemCard.js"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const categories = {
    Assets: 15,
    Books: 0,
    Electronic: 18,
    HomeAccesory: 28,
    Mobile: 18
};

const Cart = () => {

    let navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);


    const { product } = useSelector(
        state => state.productDetails)

    function totalval() {
        let total = product.price + categories[product.category] * product.price / 100;
        return total;
    }

    const checkoutHandler = () => {
        navigate("/shipping");
    };

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    return (
        <Fragment>
            <div className='cartPage'>
                <div className='cartHeader'>
                    <p>Product</p>
                    <p>Subtotal</p>
                </div>
                <div className='cartContainer'>
                    <CartItemCard />
                </div>
                <div className='cartGrossProfit'>
                    <div className='cartGrossProfitgst'>
                        <p className='gst'>GST </p>
                        <p className='gstprice'>{categories[product.category]}%</p>
                    </div>
                    <div className='cartGrossProfitBox'>
                        <p className='gtotal'>Gross Total</p>

                        <p className='gprice'>{totalval()}</p>
                    </div>
                    <div className='checkOutBtn'>
                        <button onClick={checkoutHandler}>Check out</button>
                    </div>

                </div>

            </div>
        </Fragment>
    )
}

export default Cart;