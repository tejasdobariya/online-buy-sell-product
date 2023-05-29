import React, { Fragment, useEffect } from 'react'
import "./Home.css";
import AddIcon from "@material-ui/icons/Add";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert"
import { Link } from 'react-router-dom';

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.products
    );
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>

                    <MetaData title="ECommerce" />

                    <div className='banner'>
                        <p>Welcome to Ecommerce</p>
                        <h1>Find Product Below</h1>

                        <Link to="/product" className='link'>
                            <button>Sell <AddIcon className='icon' /></button>

                        </Link>
                    </div >

                    <h2 className='homeHeading'>Featured Products</h2>

                    <div className='container' id='container'>
                        {products && products.map(product => (
                            <Product product={product} />
                        ))}
                    </div>
                </Fragment >
            )}
        </Fragment>
    );
};

export default Home;

