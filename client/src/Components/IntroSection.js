import React from "react"; 
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import Container from "react-bootstrap/Container"
import {Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { listPoduct } from "../actions/productActions";
import  Carousel  from "../Pages/pageComponents/Carousel"
import Carousel_2 from "../Pages/pageComponents/Carousel-2";
import imageArr from "../constants/imageArr";

const IntroSection = () => {

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  const slideArr = []
  const slideArr2 = [products[0]]

  slideArr.push(...products.filter(product => product.name == 'No.1'))

  console.log(slideArr[0] == slideArr2[0])
  console.log(slideArr2)
  
  const [zoomed, setZoomed] = useState ({})
  const [fading, setFading] = useState (false)
  const [fading_2, setFading_2] = useState (false)
  const [fading_3, setFading_3] = useState (false)
  const [mouseEffect, setMouseEffect] = useState (false) 
  const [mouseEffect_2, setMouseEffect_2] = useState (false)
  const [links, setLinks] = useState({})

  const sendDataToParent = (_id) => { 
    setLinks(_id);
  };

  React.useEffect(() => {
    setZoomed({backgroundSize:550})
  }, [0]);

  React.useEffect(() => {
   setFading(!fading) 
  }, [0]);

  React.useEffect(() => {
    setTimeout(function() {
      setFading_2(!fading_2)
  }, 300);
  }, [0]);

  React.useEffect(() => {
    setFading_3(!fading_3)
   }, [0]);  

  const classes = fading ? 'btn-rounded' : 'btn-rounded hide'
  const classes_2 = fading_2 ? 'btn-rounded-2' : 'btn-rounded-2 hide'
  const classes_4 = fading_3 ? 'intro-section' : 'intro-section hide'

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

    return (

     <div>
       { isDesktopOrLaptop && <>
        <Container fluid>
        <Row className=" intro-row justify-content-center mt-5 mb-3">
        {loading ? (
            <h2>Loading...</h2>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
            <>
          {
          <Carousel array={imageArr} className={classes_4} sendDataToParent={sendDataToParent}/>
            }       
            </>
          )}
        </Row>
        <Row lg={6} md={12} className="buttons-row">
          <Col  className="buttons">
          <button style={{fading, }} type="button" className={mouseEffect ? "btn-rounded-in" : classes} onMouseOver={handleIn} onMouseOut={handleOut}>
            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/item/${links._id}`}>Shop This</Link>
          </button> 
          </Col>
          <Col className=" buttons-2">
            <button style={{fading}} type="button" className={mouseEffect_2 ? "btn-rounded-in-2" : classes_2} onMouseOver={handleIn_2} onMouseOut={handleOut_2}>
            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/shop">Shop All</Link>
            </button> 
          </Col>
        </Row>
      </Container> 
      </>}

      {isMobile && <>
        <Container fluid>
          <Row className=" intro-row justify-content-center">
            <Col style={{fading_3, zoomed}} id="intro-section" className={classes_4}>

            </Col> 
          </Row>
          <Row lg={6} md={12} className="buttons-row mt-2">
            <Col  className="buttons">
            <button style={{fading, }} type="button" className={mouseEffect ? "btn-rounded-in" : classes} onMouseOver={handleIn} onMouseOut={handleOut}>
               <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/item">Shop This</Link>
            </button> 
            </Col>
            <Col className="buttons-2">
              <button style={{fading}} type="button" className={mouseEffect_2 ? "btn-rounded-in-2" : classes_2} onMouseOver={handleIn_2} onMouseOut={handleOut_2}>
                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/shop">Shop All</Link>
              </button> 
            </Col>
          </Row>
        </Container> 
      </>}
     </div>
      
    )
}

export default IntroSection