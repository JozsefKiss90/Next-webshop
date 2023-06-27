export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const CLEAR_CART = "CLEAR_CART";
import Cookie from "js-cookie";
import {ContextProduct, Context, Customer, ShopAction, CustomerAction} from '../types'

const addProductToCart = (product:ContextProduct, state: Context) => {

  const updatedCart = [...state.cart]

  const inCart = updatedCart.some(item =>(
    item.name == product.name 
  ))

  !inCart ? updatedCart.push(product) : updatedCart 
  
  return { ...state, cart: updatedCart }; 
};

const removeProductFromCart = (productId:string, state: Context) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item._id === productId);
  const filteredCart = updatedCart.filter((_, index) => index != updatedItemIndex);
  Cookie.set("cartCookie", JSON.stringify(filteredCart));
  return { ...state, cart: filteredCart };
};

const clearCart = (state: Context) => {
  return {  ...state, cart: [] }; 
};

const addCustomerDetails = (customer:Customer, state: Context) => {
  const updatedCustomer = {...state.customer, customer}
  
  return { ...updatedCustomer };
};

export const shopReducer = (state:any, action:ShopAction) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    case CLEAR_CART:
      return clearCart(state);
    default:
      return state;
  }
};

export const customerReducer = (state:any, action:CustomerAction) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return addCustomerDetails(action.customer, state);
    default:
      return state;
  }
};
