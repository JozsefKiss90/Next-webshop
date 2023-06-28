import React from "react";
import { useState, useEffect, useContext } from "react";
import NavComponent from "../components/navbar"
import Footer from "../components/footer"
import {Row, Col, Container} from 'react-bootstrap';
import AppContext from "../context/AppContext";
import { useMediaQuery } from 'react-responsive';
import buttons from "../styles/Buttons.module.scss"
import styles from "../styles/Cart.module.scss"
import Cookie from "js-cookie";
import Link from "next/link";
import { destroyCookie } from "nookies";
import {ContextProduct, Context} from '../types'
import Image from "next/image";

const Cart = (props : ContextProduct[] ) => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const context = useContext<Context>(AppContext)

    const [cartContext, setCartContext] = useState<ContextProduct[]>([]);
    const [cartCookie, setCartCookie] = useState<ContextProduct[]>(props);

    console.log(context.cart) 

    useEffect(() => {
        if(context.cart.length) {
            setCartContext([...context.cart])
        }
      }, [context.cart])

    if(!context.cart.length) {
        destroyCookie(null, "cartCookie");
    }

    function updateStatePlus(index:number) {
        var newState = cartContext
        cartContext[index] =  {...cartContext[index], quantity : cartContext[index].quantity+1}
        setCartContext([...newState])
        Cookie.set("cartCookie", JSON.stringify(cartContext));
    }

    function updateStateMinus(index:number) {
        var newState = cartContext
        cartContext[index] =  {...cartContext[index], quantity : cartContext[index].quantity-1}
        cartContext[index].quantity<1 ? cartContext[index].quantity = 1 : cartContext[index].quantity
        setCartContext([...newState])
        Cookie.set("cartCookie", JSON.stringify(cartContext));
    }
    
    function findImg(img:ContextProduct) {
    const findImg:number = cartContext.findIndex((item) => item.name == img.name)
        return findImg
    } 

    const [mouseEffect, setMouseEffect] = useState<boolean>(false)
    const [fading, setFading] = useState<boolean>(false)

    const [subTotal,setSubTotal] = useState([0])

    React.useEffect(() => {
        setSubTotal(
            cartContext.map(prices => (
                Number(prices.price)*Number(prices.quantity)
            ))
            )
       }, [cartContext]);
     
    if(subTotal.length !== 0) {
        var totalArr = subTotal.reduce((total, num) => total+num )
     }

    React.useEffect(() => {
        setFading(!fading)
       }, []);


    function handleOut() {
        setMouseEffect(!mouseEffect)
      }

    function handleIn() {
        setMouseEffect(!mouseEffect)
      } 

    const classes = `${fading ? buttons.btnRounded5 : buttons.btnRounded5_hide}`

    return(
        <div> 
        <NavComponent
            cartItemNumber={cartContext.length}
        />
        <Container fluid style={{height:"auto"}}>
            <>
                    {cartContext.length === 0 ? (
                    <h4 style={{marginBottom:"6rem"}} className="text-center py-4">
                        Your cart is empty 
                    </h4>
                    ) : ( <>
            <Row>
            <Col>
            
            </Col>
            <Col className={`${styles.shopTitle} mt-3`}>
                    <h2 >
                        Cart
                    </h2>
            </Col>
            <Col>
            
            </Col>
        </Row>  
        <Row className={`${styles.cartRow} ${styles.itemBorder2}, 'asd'`}>
            <Col  lg={8} className={styles.cartCol}>
            
            </Col>
            <Col lg={1} className={styles.cartCol}>
                Price
            </Col>
            <Col lg={1} className={`${styles.cartCol} d-flex justify-content-center`}>
                Quantity
            </Col>
            <Col lg={2} className={styles.cartCol4}>
                <p>
                Total 
                </p>
            </Col> 
        </Row>     
        </>
      )}
      </>
        {cartContext.map((image,index) => (        
        <div key={index}>       
            <Row className={`${styles.cartRow2} ${styles.itemBorder2}`}>
                <Col lg={8} className={`${styles.cartCol} ${styles.cartImageCol}`}>
                    
                        <Image src={image.img} alt="" width={200} height={200}/>
                   
                    <div className="mt-3">
                        <p>
                        <strong>{image.category}</strong> <br/> {image.name}
                        </p>
                    </div>
                </Col>
                <Col lg={1} className={styles.cartCol}>
                    <div className={styles.cartColBox}>
                    {image.price}
                    </div>
                </Col>
                <Col lg={1} className={`${styles.cartCol} d-flex justify-content-center align-items-center`}> 
                    <div className={`${styles.boxContainer} d-flex justify-content-center`}>
                        <div className={styles.cartMiddleBox}>
                            {image.quantity}
                        </div>
                        <div className={`${styles.cartMiddleBox2} d-flex flex-column justify-content-center`} >
                            <div style={{maxHeight:"1.2rem", paddingRight:"20px"}} className="d-flex align-items-end" 
                                onClick={() => (updateStatePlus(findImg(image)))
                            }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                            </div>
                            <div style={{maxHeight:"1.2rem", paddingRight:"20px"}} className="d-flex align-items-start" 
                                onClick={() => (updateStateMinus(findImg(image)))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </div>
                        </div>
                        <div style={{padding:"10px"}}>
                            <div className="d-flex justify-content-center" onClick={context.removeProductFromCart.bind(this, image._id as string)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </div>
                        </div>
                        </div>
                    </Col>
                    <Col lg={2} className={`${styles.cartCol} d-flex justify-content-end`}>
                        <div className={styles.cartColBox}>
                        {image.price*image.quantity}
                        </div>
                    </Col>
                </Row>    
                </div> 
        ))}  
            <Row className={`${styles.cartRow} d-flex align-items-center`}>
                <Col  lg={8} className={styles.cartCol}>
                
                </Col>
                <Col lg={1} className={`${styles.cartCol4} py-3`}>
                    <p>
                        Subtotal
                    </p>
                </Col>
                <Col lg={1} className={`${styles.cartCol} d-flex justify-content-center`}>
                    
                </Col>
                <Col lg={2} className={`${styles.cartCol4} py-3`}>
                    <p>
                        {cartContext.length ?  cartContext.map(prices => (
                Number(prices.price)*Number(prices.quantity)
            )).reduce((total, num) => total+num ):0}
                    </p>
                </Col>
            </Row> 
            <Row className={`${styles.cartRow} mt-3`}>
                <Col  lg={8} className={styles.cartCol}>
                
                </Col>
                <Col lg={1} className={`${styles.cartCol} mt-3`}>
                    Shipping
                </Col>
                <Col lg={1} className={`${styles.cartCol} d-flex justify-content-center`}>
                    
                </Col>
                <Col lg={2} className={`${styles.cartCol4} text-end mt-3`}>
                    <p>
                    <strong> Calculated in checkout</strong>
                    </p>
                </Col> 
            </Row>
            <Row className={`${styles.cartRow} py-2`}>
                <Col  lg={6} className={styles.cartCol}>
                
                </Col>
                <Col lg={1} className={styles.cartCol}>
                
                </Col>
                <Col lg={1} className={`${styles.cartCol} d-flex justify-content-center`}>
                    
                </Col>
                <Col lg={4} className={`${styles.cartCol4} d-flex justify-content-end mt-3`}>
                    <button style={{marginRight:"30px"}} type="button" className={buttons.btnRoundedIn5}>
                    Shop
                    </button> 
                    <Link href="/information">
                        <button style={{marginRight:"30px"}} type="button" className={`${mouseEffect ? buttons.btnRoundedIn5 : classes}`}
                        onMouseOver={handleIn} onMouseOut={handleOut}>
                            Checkout
                        </button> 
                    </Link>
                </Col>
            </Row> 
           
        </Container>
        <Footer/>
        </div>    
    )
}

Cart.getInitialProps = () => {
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
    const cookies = getCookie('cartCookie');
    return {
      props: cookies
    };
  };

export default Cart