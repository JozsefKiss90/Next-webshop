import React from "react";
import NavComponent from "../components/navbar"
import Footer from "../components/footer"
import {Row, Container} from 'react-bootstrap';
import Link from "next/link";
import buttons from "../styles/Buttons.module.scss"

const Success = () => {

    return( 
        <div> 
            <NavComponent cartItemNumber={0}/>
                <Container style={{height:"20rem"}} className="d-flex align-items-center justify-content-center">
                   <div className="mb-5">
                    <Row className="py-1">
                            <h2 className="text-center">
                            Thank you for your order!
                            </h2>
                        </Row>
                        <Row className="py-1">
                            <h5 className="text-center">
                            We are currently processing your order and will send you a confirmation email shortly.
                            </h5>
                        </Row>
                        <Row className="py-1">
                            <div className="d-flex justify-content-center" >
                            <Link href="/">
                                <button  type="button" className={buttons.btnRounded7}>
                                    Go back to shop
                                </button> 
                            </Link>
                            </div>
                        </Row>
                   </div>
                </Container>
            <Footer/>
        </div>    
    )
}

export default Success