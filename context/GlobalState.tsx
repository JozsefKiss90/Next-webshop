import React, { useState, useReducer } from "react";
import products from "./products"; 
import AppContext from "./AppContext";
import { shopReducer,customerReducer, ADD_PRODUCT, REMOVE_PRODUCT, ADD_CUSTOMER, CLEAR_CART } from "./reducers";
import Cookie from "js-cookie";
import { parseCookies } from "./parseCookies";

const GlobalState = (props:any) => {

  interface Product {
    _id: string;
    name: string;
    img: string;
    category: string;
    price: number;
    __v: number;
  } 

  interface Customer {
    address: string
    city: string
    country: string
    county: string
    email: string
    firstname: string
    housenumber: string
    lastname: string 
    zip: string
  } 

  function getCookie(key:any) {
    let result = []; 
    if (key) {
      const localData = Cookie.get(key);
      if (localData && localData.length > 0) { 
        result = JSON.parse(localData);
      }
    }
    return result;
  }
  
  const [cartState, dispatch] = useReducer(shopReducer, { cart: getCookie('cartCookie') });
 
  const addProductToCart = (product:Product): any => {
    dispatch({
      type: ADD_PRODUCT, product: product,
      productId: ""
    });
  };

  const removeProductFromCart = (productId:string): any => {
    dispatch({
      type: REMOVE_PRODUCT, productId: productId,
      product: undefined
    });
  };

  const clearCart = () => { 
    dispatch({
      type: CLEAR_CART,
      product: undefined,
      productId: ""
    });
  };

  const [customerState, dispatchCustomer] = useReducer(customerReducer, { customer: getCookie('customerCookie') });
  const addCustomerDetails = (customer:Customer): any => {
    dispatchCustomer({ type: ADD_CUSTOMER, customer: customer });
  };

  return (
    <AppContext.Provider 
      value ={{
        products: products,
        cart: cartState.cart,
        customer: customerState.customer,
        customerDetails: {},
        addCustomerDetails: addCustomerDetails,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        clearCart: clearCart
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};


export default GlobalState;
