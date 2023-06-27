import React from "react";
import { useState, useEffect, useContext } from "react";
import {Row, Col, Form, Container} from 'react-bootstrap';
import CheckoutNav from "../components/CheckoutNav";
import CheckoutSteps from "../components/CheckoutSteps";
import Countries from '../components/pageComponents/countries'
import { useMediaQuery } from 'react-responsive'
import styles from "../styles/Checkout.module.scss"
import AppContext from "../context/AppContext";
import buttons from "../styles/Buttons.module.scss"
import Link from "next/link";
import {Context, ContextProduct, theObject} from '../types'
import Image from "next/image";

const Information = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const context = useContext<Context>(AppContext)

    const [cartContext, setCartContext] = useState<ContextProduct[]>([])
    const [customerContext, setCustomerContext] = useState(context.customer)

    const [localFirstName, setLocalFirstName] = useState<string>('')
    const [localLastName, setLocalLastName] = useState<string>('')
    const [localAddress, setLocalAddress] = useState<string>('')
    const [localCity, setLocalCity] = useState<string>('')
    const [localZip, setLocalZip] = useState<string>('')
    const [localHousenumber, setLocalHousenumber] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [localCountry, setLocalCountry] = useState<string>('')
    const [localCounty, setLocalCounty] = useState<string>('')
    const [localEmail, setLocalEmail] = useState<string>('')
    
    const [theObject, setTheObject] = useState <theObject>({
        email: "",
        firstname: "",
        lastname: "",
        county: "",
        country: "",
        zip: "",
        city: "",
        address: "",
        housenumber: "",
    });

    useEffect(() => {
        setTheObject(context.customer)
      }, [])
   
    useEffect(() => {
        setCartContext([...context.cart])
      }, [])

    useEffect(() => {
        setCustomerContext(theObject)
      }, [theObject])

      useEffect(() => {
        setCountry(context.customer.country)
      }, [])
  
    const sendDataToParent = (index:string) => { 
        setCountry(index);
    };
    
    React.useEffect(() => { 
        setLocalEmail(customerContext.email)
        setLocalFirstName(customerContext.firstname)
        setLocalLastName(customerContext.lastname)
        setLocalCity(customerContext.city)
        setLocalZip(customerContext.zip)
        setLocalCountry(customerContext.country)
        setLocalCounty(customerContext.county)
        setLocalAddress(customerContext.address)
        setLocalHousenumber(customerContext.housenumber)
    }, [customerContext]);


    useEffect(() => {
       if(JSON.stringify(context.customer) === '[]'){
        setTheObject(prev => ({
            ...prev,
            country: country
          }));
       }
       else {
        setTheObject(prev => ({
            ...prev,
            country: country
          }));
       }
      }, [country, context.customer.country])

    const handleChangeUpdateAddObject : (event: any) => void = event => {
        const name = event.target.name;
        const value = event.target.value;
        setTheObject(prev => ({
          ...prev,
          [name]: value
        }));
      }

    const mapped = cartContext.map((items : ContextProduct )=> items)

    var subtotal = 0

    for(let i = 0; i < mapped.length; i++) {
        subtotal+= mapped[i].price * mapped[i].quantity
    }

    const [boxHeight, setBoxHeight] = useState(false)
    function arrowToggle() { 
        setBoxHeight(!boxHeight)
    }
    const expand = boxHeight ? 'summary-row-2 expand' : 'summary-row-2'


    return(
        <div>
        <CheckoutNav/>
        <Container  fluid>
            <Row>
            <Col lg={1}>
            </Col>
            <Col  className="d-flex flex-column">
                <Row className={`${styles.sameRow} d-flex flex-column align-self-center mt-1`}> 
                <Row className="d-flex flex-column"> 
                    <CheckoutSteps step1 step2 step3={undefined} step4={undefined}/>
                </Row>
                <Row style={{position:"relative", height:"2rem"}}>
                    <p style={{position:"absolute", left:"-2px"}}>
                        Contact information
                    </p>
                </Row>
                        <Form style={{width:"auto"}} className={styles.checkoutContact}>
                            <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                                <Form.Control style={{color: "black", fontSize:"0.9rem"}} name="email" type="email" placeholder="Enter email" 
                                    value={customerContext.email ? customerContext.email : localEmail} onChange={(handleChangeUpdateAddObject)}/>
                            </Form.Group>

                            <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                                <Form.Control type="firstname" name="firstname" placeholder="First Name"
                                    value={customerContext.firstname ? customerContext.firstname : localFirstName} onChange={(handleChangeUpdateAddObject)}/>
                                <Form.Control type="lastname" name="lastname" placeholder="Last Name"
                                    value={customerContext.lastname ? customerContext.lastname : localLastName} onChange={(handleChangeUpdateAddObject)}/>
                            </Form.Group>
                        </Form>
                    </Row> 
                    <Row className={`${styles.sameRow} d-flex flex-column align-self-center mt-3`}>
                        <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px", fontSize:"1rem"}}>
                                Shipping Adress
                            </p> 
                        </Row>
                    <Form style={{width:"auto"}} className={styles.checkoutContact}>
                        <Countries country={localCountry}  sendDataToParent={sendDataToParent}/>
                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Control type="city" name="city" placeholder="City" value={customerContext.city ? customerContext.city : localCity} onChange={(handleChangeUpdateAddObject)}/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="county" name="county" placeholder="State or county"  value={customerContext.county ? customerContext.county : localCounty} onChange={(handleChangeUpdateAddObject)}/>
                            <Form.Control type="zip" name="zip" placeholder="ZIP code"  value={customerContext.zip ? customerContext.zip : localZip} onChange={(handleChangeUpdateAddObject)}/>
                        </Form.Group> 

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="address" name="address" placeholder="Street adress" value={customerContext.address ? customerContext.address : localAddress} onChange={handleChangeUpdateAddObject}/>
                            <Form.Control type="housenumber" name="housenumber" placeholder="Apartment or house number" value={customerContext.housenumber ? customerContext.housenumber : localHousenumber} onChange={handleChangeUpdateAddObject}/>
                        </Form.Group> 
                    </Form>
                    <Row>
                        <Col style={{padding:"1rem 0"}} className="d-flex justify-content-start">
                            <div>
                                <Link href="/shipping">
                                    <button type="button" className={buttons.btnRounded6} onClick={context.addCustomerDetails.bind(this, customerContext)}>
                                        Shipping
                                    </button> 
                                </Link>
                            </div>
                            <div>
                                <button type="button" className={buttons.btnRoundedIn6}>
                                    Return to cart
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
                                <Image src={items.img} alt="" layout="fill"/>
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

export default Information