import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useNavigate } from "react-router-dom"

const Shipping = ({ }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.shippingInfo);

    const [address, setAddress] = useState(shippingInfo ? shippingInfo.address : "");
    const [city, setCity] = useState(shippingInfo ? shippingInfo.city : "");
    const [state, setState] = useState(shippingInfo ? shippingInfo.state : "");
    const [country, setCountry] = useState(shippingInfo ? shippingInfo.country : "");
    const [pinCode, setPinCode] = useState(shippingInfo ? shippingInfo.pinCode : "");
    const [mobile, setmobile] = useState(shippingInfo ? shippingInfo.mobile : "");

    if (shippingInfo) {
    }

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (mobile.length < 10 || mobile.length > 10) {
            alert.error("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, mobile })
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={mobile}
                                onChange={(e) => setmobile(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <PublicIcon />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div>
                                <TransferWithinAStationIcon />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;