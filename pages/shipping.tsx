import React from "react";
import { useState, useEffect, useContext } from "react";
import {Row, Col, Form, Container} from 'react-bootstrap';
import CheckoutNav from "../components/CheckoutNav";
import CheckoutSteps from "../components/CheckoutSteps";
import { useMediaQuery } from 'react-responsive'
import styles from "../styles/Checkout.module.scss"
import AppContext from "../context/AppContext";
import buttons from "../styles/Buttons.module.scss"
import Link from "next/link";
import Cookie from "js-cookie";
import {Context, ContextProduct, Customer} from '../types'
import Image from "next/image";

const Checkout = () => {

//const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
//const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

const context = useContext<Context>(AppContext)

const [cartContext, setCartContext] = useState<ContextProduct[]>([]);
const [customer, setCustomer] = useState<Customer>({...context.customer});

console.log(customer)
useEffect(() => {
    setCartContext([...context.cart])
  }, [])

useEffect(() => {
    setCustomer(context.customer)
    Cookie.set("customerCookie", JSON.stringify(customer));
}, [customer])

const mapped = cartContext.map((items: ContextProduct)=> items)

var subtotal: number = 0

for(let i = 0; i < mapped.length; i++) {
    subtotal+= mapped[i].price * mapped[i].quantity
}

const [boxHeight, setBoxHeight] = useState<boolean>(false)
    function arrowToggle() { 
        setBoxHeight(!boxHeight)
    }
    const expand = boxHeight ? 'summary-row-2 expand' : 'summary-row-2'

return(
    <div>
    <CheckoutNav/>
    <Container fluid>
  
        <Row>
            <Col lg={1}>
            </Col>
            <Col  className="d-flex flex-column">
                <Row className= {`${styles.sameRow} d-flex flex-column align-self-center mt-1`}>
                <Row className="d-flex flex-column"> 
                    <CheckoutSteps  step1 step2 step3 step4={undefined}/>
                </Row>
                <Row style={{position:"relative", height:"2rem"}}>
                    <p style={{position:"absolute", left:"-2px"}}>
                        Contact information
                    </p>
                </Row>
                <Form.Group className={styles.checkoutContact}>
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
                                `${customer?.zip}, ${customer?.city}, ${customer?.address} ${customer?.housenumber}?., ${customer?.country}`
                                }/>
                            </Col>
                            <Col lg={2} className="d-flex align-items-center">
                                <div style={{fontSize:"0.8rem"}}>
                                    Change
                                </div>
                            </Col>
                        </Row>
                        <svg height="1" width="460" className="justify-self-center" style={{position:"relative", top:"1px"}}>
                            <path d="M 2 0 l 455 0" stroke="#adb5bd" strokeWidth="2"fill="none" />
                        </svg> 
                    </Form.Group>
            </Row>
            <Row className= {`${styles.sameRow} d-flex flex-column align-self-center mt-3`}>
                <Row style={{position:"relative", height:"2rem"}}>
                    <p style={{position:"absolute", left:"-2px", fontSize:"1.1rem"}}>
                        Shipping
                    </p>
                </Row>
                <Form.Group className={styles.checkoutContact}>
                    <Row className={`${styles.shippingDetails} d-flex`}>
                    <Col lg={1} className="d-flex align-items-center justify-content-start">
                        <Form.Check type={"radio"} defaultChecked={true}/>
                    </Col>
                    <Col lg={9} className="d-flex align-items-center justify-content-start">
                        <input className={styles.customForm} defaultValue="Express"/>
                    </Col>
                    <Col lg={2} className="d-flex align-items-end">
                        <div style={{fontSize:"0.9rem", fontWeight:"600"}}>
                            $5.99
                        </div>
                    </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Col style={{padding:"1rem 0"}} className="d-flex justify-content-start">
                    <div>
                        <Link href="/checkout">
                            <button type="button" className={buttons.btnRounded7}>
                                Continue to payment
                            </button> 
                        </Link>
                    </div>
                    <div>
                        <Link href="/information">
                            <button type="button" className={buttons.btnRoundedIn8}>
                                Return to information
                            </button> 
                        </Link>
                    </div>
                    </Col>
                </Row>
            </Row>
            
        </Col>
        <Col className={styles.checkoutProducts}>
                <Row style={{width:"40rem"}} className="d-flex flex-column  px-4">
                  
                {cartContext.map((items:ContextProduct, index:number) => (
                    <Row key={index} className={index != 0 ? styles.itemBorder4 : ""}>
                        <Col lg={6} className={styles.checkoutSummary}>
                            <div style={{marginTop:"1rem"}} className={styles.checkoutImg}>
                                <Image src={`/..${items.img}`} alt="" layout="fill"/>
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