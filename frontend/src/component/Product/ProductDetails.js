import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProductDetails, deleteProduct } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";


const ProductDetails = ({ }) => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    const { product, user, loading, error } = useSelector(
        state => state.productDetails)

    const { user: currentuser } = useSelector((state) => state.user);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
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
            alert.success("Product Deleted Successfully");
            navigate("/");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }


        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, deleteError, navigate, isDeleted]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} `} />
                    <div className='ProductDetails'>
                        <div className='container1' >
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className='CarouselImage'
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div className='container2'>
                            <div className='detailsBlock-1'>
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>

                            <div className='detailsBlock-4'>
                                Description : <p>{product.description}</p>
                            </div>
                            <div className='detailsBlock-4'>
                                Address : <p>{product.address}</p>
                            </div>
                            <div className='detailsBlock-3'>
                                <h2>&#8377;{product.price}</h2>
                                {
                                    product.user !== currentuser._id
                                        ?
                                        <div>
                                            <div className='detailsBlock-4 details'>
                                                <h4>Owner Contact Details</h4>
                                                <p>
                                                    Username : {user.username}
                                                </p>
                                                <p>
                                                    Email : {user.email}
                                                </p>
                                                <p>
                                                    Mobile :{user.mobile}
                                                </p>
                                            </div>

                                            <Link className='buy-now' to="/buy">Buy Now</Link>
                                        </div>
                                        :
                                        <div>
                                            <DeleteIcon className='deleteicon' onClick={() => deleteProductHandler(id)} />

                                        </div>
                                }
                            </div>

                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails;
