export interface Customer {
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
  
export interface ContextProduct {
    _id: string;
    name: string;
    img: string;
    category: string;
    quantity:number;
    price: number;
    __v: number;
  } 
  
export  interface Product {
    _id: string;
    name: string;
    img: string;
    category: string;
    price: number;
    __v: number;
  }[]
  
export interface Context {
    products: Product[],
    cart: ContextProduct[],
    customer: Customer,
    customerDetails: any,
    addCustomerDetails: (customer: Customer) => void,
    addProductToCart: (product: ContextProduct) => void,
    removeProductFromCart: (productId: string) => void,
    clearCart: () => void,
  }

 export interface theObject {
    email: string;
    firstname: string;
    lastname: string;
    county: string;
    country: string;
    zip: string;
    city: string;
    address: string;
    housenumber: string;
} 

export interface ShopAction {
  type: 'ADD_PRODUCT' | 'REMOVE_PRODUCT' | 'CLEAR_CART',
  product: any,
  productId: string 
}

export interface CustomerAction {
type: 'ADD_CUSTOMER',
customer: Customer
}