import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert";
import { clearErrors, createOrder } from "../../actions/orderAction";


const ConfirmOrder = ({ }) => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { shippingInfo } = useSelector((state) => state.shippingInfo);
    const { user } = useSelector((state) => state.user);
    const { product } = useSelector((state) => state.productDetails);
    const { error } = useSelector((state) => state.newOrder);

    const categories = {
        Assets: 15,
        Books: 0,
        Electronic: 18,
        HomeAccesory: 28,
        Mobile: 18
    };



    const subtotal = product.price;

    const shippingCharges = subtotal > 2500 ? 0 : 200;

    const tax = categories[product.category] * product.price / 100;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const order = {
        shippingInfo,
        orderItem: {
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            product: product._id
        },
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shippingCharges,
        totalPrice: totalPrice
    }


    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        dispatch(createOrder(order));

        navigate("/success");
    };


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert])


    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.username}</span>
                            </div>
                            <div>
                                <p>Email:</p>
                                <span>{user.email}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.mobile}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">

                            <div key={product._id}>
                                <img src={product.images[0].url} alt="Product" />
                                <Link to={`/product/${product._id}`}>
                                    {product.name}
                                </Link>{" "}
                                <span>
                                    Price :
                                    <b> ₹ {product.price}</b>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
                {/*  */}
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summery</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;


// ORDER VALIDATION FAILED: ORDERITEM.PRODUCT: PATH `ORDERITEM.PRODUCT` IS REQUIRED., ORDERITEM.IMAGE: PATH `ORDERITEM.IMAGE` IS REQUIRED., SHIPPINGINFO.MOBILE: PATH `SHIPPINGINFO.MOBILE` IS REQUIRED
