import React from "react"; 
import { useState } from "react";
import {Row, Col, Container} from 'react-bootstrap';
import Link from "next/link"
import imageArr from "../constants/imageArr";
import styles from '../styles/Intro_section.module.scss';
import Carousel from "./pageComponents/carousel";

const IntroSection = () => {

  interface Links {
    _id : string
  }

  interface Zoomed {
    backgroundSize ?: number
  }

  const [zoomed, setZoomed] = useState<Zoomed>({})
  const [fading, setFading] = useState <boolean> ()
  const [fading_2, setFading_2] = useState<boolean> (false)
  const [fading_3, setFading_3] = useState<boolean> (false)
  const [mouseEffect, setMouseEffect] = useState<boolean> (false) 
  const [mouseEffect_2, setMouseEffect_2] = useState <boolean>(false)
  const [links, setLinks] = useState<Links>()  

  const sendDataToParent = (_id : Links | undefined ) => { 
    setLinks(_id);
  };

  React.useEffect(() => {
    setZoomed({backgroundSize:550})
  }, [])

  React.useEffect(() => {
   setFading(true) 
  }, [fading]);

  React.useEffect(() => {
    setTimeout(function() {
      setFading_2(true)
  }, 300);
  }, [fading_2]);

  React.useEffect(() => {
    setFading_3(true)
   }, [fading_3]);  

  const classes = `${fading ? styles.btnRounded2  : styles.btnRounded2_hide}`
  const classes_2 = `${fading_2 ? styles.btnRounded2  : styles.btnRounded2_hide}` 
  const classes_4 = fading_3 ? `${styles.introSection}` : `${styles.introSection_hide}`

  function handleIn() {
    setMouseEffect(!mouseEffect)
  }

  function handleOut() {
    setMouseEffect(!mouseEffect)
  }

  function handleIn_2() {
    setMouseEffect_2(!mouseEffect_2)
  }

  function handleOut_2() {
    setMouseEffect_2(!mouseEffect_2)
  }

  interface arrProps {
    _id: string; 
    name: string; 
    img: string; 
    category: string; 
    price: number;
     __v: number; 
  }

  let array : arrProps[];
  
  array = imageArr

    return (
     <div>
        <Container fluid={true}>
        <Row className={styles.introRow}>     
          <Carousel  sendDataToParent={sendDataToParent} array = {array} />
        </Row>
        <Row lg={6} md={12} className={styles.buttonsRow}>
          <Col  className={styles.buttons}>
          <Link href={`item/${links?._id}`}>
        
           <button type="button" className={`${mouseEffect ? styles.btnRoundedIn : classes}`}>
              Shop This
            </button>  
      
          </Link>
          </Col>
          <Col className={styles.buttons2}>
            <Link href="/shop">
              <button type="button" className={`${mouseEffect_2 ? styles.btnRoundedIn2 : classes_2}`} onMouseOver={handleIn_2} onMouseOut={handleOut_2}>
                Shop All
              </button>  
            </Link>
          </Col>
        </Row>
      </Container> 
     </div>   
    )
  }

export default IntroSection