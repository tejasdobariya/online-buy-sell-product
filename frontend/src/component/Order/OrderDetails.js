import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors, deleteOrder } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";


const OrderDetails = ({ }) => {
    let { id } = useParams();
    const navigate = useNavigate();

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.order
    );

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Order Cancel Successfully");
            navigate("/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, navigate, isDeleted, deleteError]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Order Details" />
                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <Typography component="h1">
                                Order #{order && order._id}
                            </Typography>
                            <Typography>Shipping Info</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>Name:</p>
                                    <span>{order.user && order.user.username}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>
                                        {order.shippingInfo && order.shippingInfo.mobile}
                                    </span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>
                                        {order.shippingInfo &&
                                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                    </span>
                                </div>
                            </div>
                            <Typography>Payment</Typography>
                            <div className="orderDetailsContainerBox">
                                <div className="greenColor">

                                    PAID

                                </div>

                                <div>
                                    <p>Amount:</p>
                                    <span>{order.totalPrice && order.totalPrice}</span>
                                </div>
                            </div>
                            <div className="orderDetailsContainerBox cancelorder" >
                                <div className="redColor" onClick={() => deleteOrderHandler(id)} >
                                    Cancel Order
                                </div>
                            </div>
                        </div>

                        <div className="orderDetailsCartItems">
                            <Typography>Order Items:</Typography>
                            <div className="orderDetailsCartItemsContainer">
                                {order.orderItem &&

                                    <div key={order.orderItem.product}>
                                        <img src={order.orderItem.image} alt="Product" />
                                        <Link to={`/product/${order.orderItem.product}`}>
                                            {order.orderItem.name}
                                        </Link>{" "}
                                        <span>
                                            Price :
                                            <b>₹{order.orderItem.price}</b>
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;