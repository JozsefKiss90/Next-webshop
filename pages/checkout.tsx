import React from "react";
import { useState, useEffect, useContext } from "react";
import {Row, Col, Form, Container} from 'react-bootstrap';
import CheckoutNav from "../components/CheckoutNav";
import CheckoutSteps from "../components/CheckoutSteps";
import { useMediaQuery } from 'react-responsive'
import styles from "../styles/Checkout.module.scss"
import AppContext from "../context/AppContext";
import buttons from "../styles/Buttons.module.scss"
import { destroyCookie } from "nookies";
import Stripe from "stripe";
import { parseCookies, setCookie } from "nookies";
import * as cookie from 'cookie'
import {useRouter} from 'next/router'
import { GetServerSideProps } from 'next'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe, 
    useElements
  } from '@stripe/react-stripe-js';
import {Context, ContextProduct, Customer, Product} from '../types'
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (ctx:any ) =>  {
    let config : any
    let url : string | undefined
    url = process.env.STRIPE_SECRET_KEY

    const stripe = new Stripe((url as string), config);

    const parsedCookies = cookie.parse(ctx.req.headers.cookie);
    
    const price = JSON.parse(parsedCookies.cartCookie)[0].price
    let paymentIntent : any
  
    const { paymentIntentId } = await parseCookies(ctx);
  
    if (paymentIntentId) {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return {
        props: {
          paymentIntent
        }
      };
    }
  
    paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: "gbp",
    });
  
    setCookie(ctx, "paymentIntentId", paymentIntent.id);
  
    return {
      props: {
        paymentIntent
      }
    };
  };

const Checkout = ({ paymentIntent }:any) => {
    
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    
    const stripe : any= useStripe();
    const elements: any= useElements();
    
    const [checkoutError, setCheckoutError] = useState();
    const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);
    
    const context = useContext<Context>(AppContext)
    const [cartContext, setCartContext] = useState<ContextProduct[]>([]);
    const [customer, setCustomer] = useState<Customer | undefined>({...context.customer});

    useEffect(() => {
        setCartContext([...context.cart])
      }, [])

    const router = useRouter()
 
    const mapped = cartContext.map((items: ContextProduct)=> items)

    var subtotal = 0

    for(let i = 0; i < mapped.length; i++) {
        subtotal+= mapped[i].price * mapped[i].quantity
    }

    const [selected, setSelected] = useState(true)

    const HandleOptionChange = () => {
        setSelected(!selected);
      };

    let email 

    const[publishabkeKey, setPublishabkeKey] = useState('')

    useEffect(() => {
        fetch('api/keys', {
        method:'GET',
        headers: {'Content-Type':'application/json'}
        })
        .then((res)=>res.json())
        .then((data)=>{
        setPublishabkeKey(data.publishabkeKey)
        })
    }, []);



    const handleCheckout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
 
        try {
            const {
                error,
                paymentIntent: { status }
              } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: {
                  card: elements.getElement(CardNumberElement),
                },
                shipping: {
                  name: customer?.firstname + " " + customer?.lastname,
                  address: {
                    city: customer?.city,
                    country: customer?.country,
                    line1: customer?.address + " " +  customer?.housenumber,
                    postal_code: customer?.zip,
                    state: customer?.county 
                  },
                }
              });
      
          if (error) throw new Error(error.message);
      
          if (status === "succeeded") {
            setCheckoutSuccess(true);
            destroyCookie(null, "paymentIntentId");
            destroyCookie(null, "cartCookie");
            destroyCookie(null, "customerCookie");
            context.clearCart()
          }
        } catch (err: any) {
          alert(err.message);
          setCheckoutError(err.message);
        }
      };

      if (checkoutSuccess) {
        router.push('/success')
      }

    const [boxHeight, setBoxHeight] = useState(false)
    function arrowToggle() { 
        setBoxHeight(!boxHeight)
    }
    const expand = boxHeight ? 'summaryRow2 expand' : 'summaryRow2' 

    const CARD_OPTIONS = {
        style: {
            base: {
              color: "#000",
              fontWeight: '100',
              fontFamily: 'Raleway, sans-serif',
             
              fontSize: "0.9",
              "::placeholder": {
                color: "#606060",
              },
            },
            invalid: {
              color: "#fa755a",
              iconColor: "#fa755a"
            }
          }
      };


    return(
        <div>
        <CheckoutNav/>
        <Container fluid>
        <Row>
            <Col lg={1}>
            </Col>
            <Col className="d-flex flex-column">
                <Row className={`${styles.sameRow} d-flex flex-column align-self-center mt-1`}>
                    <Row className="d-flex flex-column"> 
                        <CheckoutSteps step1 step2 step3 step4 />
                    </Row>
                    <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px",}}>
                            Contact information
                        </p>
                    </Row>
                        <Form.Group   className={styles.checkoutContact}>
                            <Row  className={`${styles.shippingDetails} d-flex`}>
                                <Col lg={2} className="d-flex align-items-center justify-content-start">
                                    <input className={styles.customForm} defaultValue="Contact"/>
                                </Col>
                                <Col lg={8} className="d-flex align-items-center justify-content-start">
                                    <input className={styles.customForm} defaultValue={customer?.email}/>
                                </Col>
                                <Col lg={2} className="d-flex align-items-end">
                                    <div style={{fontSize:"0.8rem"}}>
                                        Change
                                    </div>
                                </Col>
                            </Row>
                                <svg height="1" width="460" className="justify-self-center" style={{position:"relative", top:"1px"}}>
                                    <path d="M 2 0 l 455 0" stroke="#adb5bd" strokeWidth="2"fill="none" />
                                </svg> 
                            <Row  className={`${styles.shippingDetails} d-flex`}>
                                <Col lg={2} className="d-flex align-items-center">
                                    <input className={styles.customForm} defaultValue="Ship to"/>
                                </Col>
                                <Col lg={8} className="d-flex align-items-center justify-content-start">
                                    <input style={{width:"100%"}} className={styles.customForm} defaultValue={
                                    `${customer?.zip}, ${customer?.city}, ${customer?.address} ${customer?.housenumber}, ${customer?.country}`
                                    }/>
                                </Col>
                                <Col lg={2} className="d-flex align-items-center">
                                    <div style={{fontSize:"0.8rem"}}>
                                        Change
                                    </div>
                                </Col>
                            </Row>
                                <svg height="1" width="460" className="justify-self-center" style={{position:"relative", top:"1px"}}>
                                    <path d="M 0 1 l 455 0" stroke="#adb5bd" strokeWidth="2"fill="none" />
                                </svg> 
                                <Row className={`${styles.shippingDetails} d-flex`}>
                                <Col lg={2} className="d-flex align-items-center justify-content-start">
                                    <input className={styles.customForm} defaultValue="Method"/>
                                </Col>
                                <Col lg={8} className="d-flex align-items-center justify-content-start">
                                    <input className={styles.customForm} defaultValue="Express"/>
                                </Col>
                                <Col lg={2} className="d-flex align-items-end">
                                    <div style={{fontSize:"0.9rem", fontWeight:"600"}}>
                                        $5.99
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Row>
                    <Row className={`${styles.sameRow} d-flex flex-column align-self-center mt-3`}>
                        <Row style={{position:"relative", height:"2rem"}}>
                            <p style={{position:"absolute", left:"-2px", fontSize:"1rem"}}>
                                Payment
                            </p>
                        </Row>
                        <Form className={styles.checkoutContactCard}>
                            <Row className={styles.checkoutCardRow}>
                                <Col className={styles.checkoutCard}>  
                                    <div>
                                        <h6>
                                        <strong> Cards</strong>
                                        </h6>
                                    </div> 
                                    <div className={styles.checkoutCardPos}>
                                        <Image src="/images/visa-logo.png" alt="" layout="fill"/>
                                        <Image src="/images/amex.png" alt="" layout="fill"/>
                                        <Image src="/images/mastercard.png" alt="" layout="fill"/>
                                        <Image src="/images/paypal.png" alt="" layout="fill"/>
                                    </div> 
                                </Col> 
                            </Row>
                            <Row>
                                <Form.Group className={`${styles.cardDetails} pt-2 pb-1`} controlId="formBasicEmail">
                                    <Form.Label>Name on card</Form.Label>
                                    <Form.Control style={{fontWeight:"400", fontSize:"0.9rem"}} type="cardname" />
                                </Form.Group>

                                <Form.Group className="pt-2 pb-1" controlId="formBasicEmail">
                                    <Form.Label>Card number</Form.Label>
                                    <CardNumberElement options={CARD_OPTIONS} className={`${styles.cardNumber}` }/> 
                                </Form.Group>
                                <Form.Group className=" d-flex pt-1 pb-3 gap-2" controlId="formBasicPassword">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Expiry</Form.Label>
                                            <CardExpiryElement options={CARD_OPTIONS} className={`${styles.cardNumber}`}/>  
                                        </Form.Group>
                                        </Col>
                                        <Col >
                                        <Form.Group>
                                            <Form.Label>CVV/CVC</Form.Label>
                                            <CardCvcElement options={CARD_OPTIONS} className={`${styles.cardNumber}`}/>  
                                        </Form.Group>
                                    </Col>   
                                </Form.Group>
                            </Row>
                        </Form>
                    </Row>
                    <Row  className={`${styles.sameRow} d-flex flex-column align-self-center mt-3`}>
                        <Row style={{position:"relative", height:"2rem"}}>
                            <p style={{position:"absolute", left:"-2px",}}>
                                Billing
                            </p>
                        </Row>
                        <Form.Group className={styles.checkoutContact}>
                        <Row  className={`${styles.shippingDetails} d-flex`}>
                                <Col lg={1} className="d-flex align-items-center justify-content-start">
                                <input
                                     type="radio"
                                     name="react-tips"
                                     value="option1"
                                     checked={selected}
                                     onChange={HandleOptionChange}
                                />
                                </Col>
                                <Col lg={8} className="d-flex align-items-center justify-content-start">
                                <strong style={{fontSize:"0.9rem"}}>Same as shipping address</strong>
                                </Col>
                                <Col lg={2} className="d-flex align-items-end">
                                
                                </Col>
                            </Row>
                  
                            <Row  className={`${styles.shippingDetails} d-flex`}>
                                <Col lg={1} className="d-flex align-items-center justify-content-start">
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option2"
                                    checked={!selected}
                                    onChange={HandleOptionChange}
                                />
                                </Col>
                                <Col lg={8} className="d-flex align-items-center justify-content-start">
                                <strong style={{fontSize:"0.9rem"}}>Use a different billing address</strong>
                                </Col>
                                <Col lg={2} className="d-flex align-items-end">
                                
                                </Col>
                            </Row>
                            <Row>
                            <Form style={{display: selected ? 'none' : 'block'}} className={`${styles.checkoutContact, styles.checkoutBilling}`}>
                                <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                                    <Form.Control type="firstname" placeholder="First Name"/>
                                    <Form.Control type="lastname" placeholder="Last Name"/>
                                </Form.Group>
                                <Form.Select style={{color:"black", fontSize:"0.9rem"}} className="mt-3">
                                    <option>Country</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                                    <Form.Control type="city" placeholder="City"/>
                                </Form.Group>

                                <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                                    <Form.Control type="county" placeholder="State or county"/>
                                    <Form.Control type="zip" placeholder="ZIP code"/>
                                </Form.Group>

                                <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                                    <Form.Control type="adress" placeholder="Street adress"/>
                                    <Form.Control type="housenumber" placeholder="Apartment or house number"/>
                                </Form.Group>
                                <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicEmail">
                                    <Form.Control style={{color: "black"}}type="phone" placeholder="Phone number"  value={email}/>
                                </Form.Group>
                            </Form>
                        </Row>
                        </Form.Group>
                        <Row>
                            <Col style={{padding:"1rem 0",height:'auto'}} className="d-flex justify-content-start">
                            <div>
                                <button type="button" className={buttons.btnRounded6} onClick={handleCheckout}>
                                    Pay now
                                </button> 
                                {checkoutError && <span style={{ color: "red" }}>{checkoutError}</span>}
                            </div>
                            <div>
                                <button type="button" className={buttons.btnRoundedIn8}>
                                    Return to shipping
                                </button> 
                            </div>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            <Col className={styles.checkoutProducts}>
                <Row style={{width:"40rem"}} className="d-flex flex-column  px-4">
                  
                {cartContext.map((items, index) => (
                    <Row key={index} className={index != 0 ? styles.itemBorder4 : ""}>
                        <Col lg={6} className={styles.checkoutSummary}>
                            <div style={{marginTop:"1rem"}} className={styles.checkoutImg}>
                                <img src={items.img} alt=""/>
                                <div className={styles.checkoutQnty}>
                                    <p >
                                    {items.quantity}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 px-3">
                                <p>
                                    <strong>{items.category}</strong> <br/> {items.name}
                                </p>
                            </div>
                        </Col>
                        <Col lg={6} className="d-flex justify-content-end align-items-center">
                            <div className="mt-3">
                                <p>
                                    <strong>{items.quantity*items.price}</strong>
                                </p>
                            </div>
                        </Col>
                    </Row>)
                    )}    
                    <Row className={styles.itemBorder4}>
                        <Col lg={6} className="d-flex flex-column justify-content-center align-items-start">
                            <div  className={`${styles.checkoutDiv} mt-2`}>
                                <p>
                                    Subtotal
                                </p>
                            </div>
                            <div className={`${styles.checkoutDiv} mb-2`}>
                                <p>
                                    Shipping
                                </p>
                            </div>
                        </Col>
                        <Col lg={6} className="d-flex flex-column justify-content-center align-items-end">
                            <div className={`${styles.checkoutDiv} mt-2`}>
                                <p>
                                    <strong>{subtotal}</strong>
                                </p>
                            </div>
                             <div className={`${styles.checkoutDiv} mb-2`}>
                                <p>
                                    <strong>2.500</strong>
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row className={styles.itemBorder5}>
                        <Col lg={6} className={`d-flex flex-column justify-content-center align-items-start`}>
                            <div className={`${styles.checkoutDiv} mt-2`}>
                                <p>
                                    Total
                                </p>
                            </div>
                        </Col>
                        <Col lg={6} className="d-flex flex-column justify-content-center align-items-end">
                            <div className={`${styles.checkoutDiv} mt-2`}>
                                <p style={{fontSize:"1.2rem"}}>
                                    <strong>{subtotal + 2500}</strong>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Col> 
        </Row>
        </Container>
        </div>
    )
}

export default Checkout