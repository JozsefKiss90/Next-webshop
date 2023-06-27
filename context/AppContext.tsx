import React from "react";
import products from "./products";
import {Customer, Context} from '../types'

const AppContext = React.createContext<Context>({  
  products: [...products],
  cart: [],
  customer: {} as Customer,
  customerDetails: {},
  addCustomerDetails: (customer) =>  {},
  addProductToCart: (product) => {},
  removeProductFromCart: (productId) => {},
  clearCart: () => {},
});
export default AppContext;