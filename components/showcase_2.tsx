import React from "react";
import { useState } from "react";
import {Row, Col, Container} from 'react-bootstrap';
//import { useMediaQuery } from 'react-responsive'
import Link from "next/link"
import styles from '../styles/Intro_section.module.scss';
import Image from "next/image";
const Showcase_2 = () => {

    const [fading, setFading] = useState (false)
    const [mouseEffect, setMouseEffect] = useState (false)

    React.useEffect(() => {
        setFading(!fading)
       }, [0]);

       const classes = fading ? `${styles.btnRounded2}` : `${styles.btnRounded_hide}`

    function handleIn() {
        setMouseEffect(!mouseEffect)
      }
    
      function handleOut() {
        setMouseEffect(!mouseEffect)
      }

    return (
            <Container fluid>
           
             <Row className={styles.imagesRow}>
                <Col lg={4} className={`${styles.itemDesc} mt-5 mb-2`}>
                   
                        <Col> 
                            <Row>
                                <Col className={styles.imageContainer}>
                                <Image src='/images/pollockbag1.1.png' alt=""  width="200" height="200"/>
                                </Col>
                                <Col className={styles.imageContainer}>
                                <Image src='/images/pollockbag2.1.png' alt=""  width="200" height="200"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={`${styles.imageContainer} mt-3`}>
                                <Image src='/images/pollockbag3.1.png' alt=""  width="200" height="200"/>
                                </Col>
                                <Col className={`${styles.imageContainer} mt-3`}>
                                <Image src='/images/pollockbag4.1.png' alt=""  width="200" height="200"/>
                                </Col>
                            </Row>
                        </Col>
             
                    </Col>
                        <Col lg={5} className={`${styles.itemDesc} ${styles.imagesText}`}>
                            <Row className="py-1">
                                <h3>
                                Original artworks
                                </h3>
                            </Row>
                            <Row className="py-1">
                                <p style={{maxWidth:"38rem", fontSize:"16px", textAlign:'justify'}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dolores illum cum odit debitis quae saepe, sequi similique quod repellendus expedita voluptatum harum, possimus quasi tenetur reiciendis quisquam iste nisi!        </p>
                            </Row>
                            <Link className="py-1"  href="/">
                                <button type="button" className={`${mouseEffect} ? ${styles.btnRoundedIn} : ${classes}`} onMouseOver={handleIn} onMouseOut={handleOut}>
                                        Shop Now
                                </button> 
                            </Link>
                        </Col>
                    </Row>
                </Container>
                
    )
}

export default Showcase_2
