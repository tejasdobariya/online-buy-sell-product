import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import WebFont from "webfontloader"
import React from "react";
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import Items from "./component/Items/Items.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import NewProduct from "./component/Product/NewProduct";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
  }, [])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={< Home />} />
        <Route exact path="/product/:id" element={< ProductDetails />} />
        <Route exact path="/products" element={< Products />} />
        <Route path="/products/:keyword" element={< Products />} />
        <Route exact path="/search" element={< Search />} />
        <Route exact path="/account" element={< Profile />} />
        <Route exact path="/me/update" element={< UpdateProfile />} />
        <Route exact path="/login" element={< LoginSignUp />} />
        <Route exact path="/items" element={< Items />} />
        <Route exact path="/buy" element={< Cart />} />
        <Route exact path="/shipping" element={< Shipping />} />
        <Route exact path="/success" element={< OrderSuccess />} />
        <Route exact path="/order/confirm" element={< ConfirmOrder />} />
        <Route exact path="/orders" element={< MyOrders />} />
        <Route exact path="/order/:id" element={< OrderDetails />} />
        <Route exact path="/product" element={< NewProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
