import {
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
    state = { shippingInfo: {} }, action) => {
    switch (action.type) {

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;
    }
};