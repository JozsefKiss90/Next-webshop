import {useEffect, useState, useContext } from "react";
import imageArr from "../constants/imageArr2";
import NavComponent from "../components/navbar"
import Footer from "../components/footer"
const Fade = require("react-reveal/Fade")
import {Row, Col, Container, Collapse} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import Link from "next/link"
import styles from '../styles/Shop.module.scss';
import styles2 from '../styles/Intro_section.module.scss';
import AppContext from "../context/AppContext";
import {ContextProduct, Product, Context} from '../types'
import Image from "next/image";

const Shop = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const context = useContext<Context>(AppContext)

    const [cartContext, setCartContext] = useState<ContextProduct[]>([]);

    const [mouseEffect, setMouseEffect] = useState (false)
    const [mouseEffect_2, setMouseEffect_2] = useState (false)
    const [mouseEffect_3, setMouseEffect_3] = useState (false)
    const [links, setLinks] = useState()  

    useEffect(() => {
        setCartContext([...context.cart])
      }, [context.cart])
    
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
    
    function handleIn_3() {
        setMouseEffect_3(!mouseEffect_3)
      }
    
    function handleOut_3() {
        setMouseEffect_3(!mouseEffect_3)
      }
   
    const bags : Product[]  = imageArr.filter(bags=>bags.category == 'Shopping Bag')
    
    const masks : Product[]  = imageArr.filter(masks=>masks.category == 'mask')

    const mobiles : Product[]  = imageArr.filter(mobiles=>mobiles.category == 'mobile')

    const hats : Product[]  = imageArr.filter(hats=>hats.category == 'hat')

    const bag : string = bags[0].img
    const bag_2 : string = bags[1].img

    const mobile : string = mobiles[0].img
    const mobile_2 : string = mobiles[1].img

    const mask : string = masks[0].img
    const mask_2 : string = masks[1].img

    const hat:string = hats[0].img
    console.log(bags)

    return (
        <div>
           <NavComponent
            cartItemNumber={cartContext.length}
        />
            <Container fluid>
                <Row>
                    <Col>
                    
                    </Col>
                    <Col className={styles.shopTitle}>
                        <h2 >
                            All Merchandise
                        </h2>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                    </Col>
                    <Col className={styles.shopTitle_2}>
                        <h5>
                        Pick Your Own Stlye
                        </h5>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{marginTop:"10px"}}>
                <Row>
                    <Col className={styles.shopItems}>
                        <Fade>
                            <Link href={`item/${bags[0]._id}`}>
                                <Image src={mouseEffect ? bag : bag_2} onMouseEnter={handleIn} onMouseLeave={handleOut} className={styles.shopImage} alt="" layout="fill"/>
                            </Link>
                            </Fade>
                    </Col>
                    <Col className={styles.shopItems}>
                        <Fade>
                            <Link href={`item/${masks[0]._id}`}>
                                <Image src={mouseEffect_2 ? mask : mask_2} onMouseEnter={handleIn_2} onMouseLeave={handleOut_2}  className={styles.mask} alt="" layout="fill"/>
                            </Link>
                        </Fade>
                    </Col>
                    <Col className={styles.shopItems}>
                        <Fade>
                            <Link href={`/item/${hats[0]._id}`}>
                                <Image src={hat} className={styles.hat} alt ="" layout="fill"/>                        
                            </Link>
                        </Fade>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                <Col className={styles2.exampleTitle}>
                    <p>
                        {mouseEffect ? "Free Form" : "Autmn Rythm"}
                    </p>
                </Col>
                <Col className={styles2.exampleTitle}>
                    <p>
                        {mouseEffect_2 ? "The She-Wolf" : "Convergence"}
                    </p>
                </Col>
                <Col className={styles2.exampleTitle}>
                    <p>
                        Mural
                    </p>
                </Col>
                </Row>
                <Row>
                <Col className={styles2.examplePrice}>
                    <p>
                        8.000
                    </p>
                </Col>
                <Col className={styles2.examplePrice}>
                    <p>
                    8.000
                    </p>
                </Col>
                <Col className={styles2.examplePrice}>
                    <p>
                        8.000 <br/>
                    </p>
                </Col>
                </Row>
                <Row>
                <Col className={styles2.exampleStock}>
                    <p>
                        In Stock
                    </p>
                </Col>
                <Col className={styles2.exampleStock}>
                    <p>
                        In Stock
                    </p>
                </Col>
                <Col className={styles2.exampleStock}>
                    <p>
                        In Stock
                    </p>
                </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                <Col className={styles.shopItems}>
                        <Fade>
                            <Link href={`item/${mobiles[0]._id}`}>
                                <Image src={mouseEffect_3 ? mobile : mobile_2} onMouseEnter={handleIn_3} onMouseLeave={handleOut_3} className={styles.shopImage} alt="" layout="fill"/>
                            </Link>
                        </Fade>
                    </Col>
                    <Col  className={styles2.shopItems_2}>
                      
                    </Col>
                    <Col  className={styles2.shopItems_2}>
                      
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col className={styles2.exampleTitle}>
                        <p>
                            {mouseEffect_3 ? "The Deep" : "No. 1"}
                        </p>
                    </Col>
                    <Col className={styles2.exampleTitle}>
                      
                    </Col>
                    <Col className={styles2.exampleTitle}>
                      
                    </Col>
                </Row>
                <Row>
                    <Col className={styles2.examplePrice}>
                        <p>
                            8.000
                        </p>
                    </Col>
                    <Col className={styles2.examplePrice}>
                        
                    </Col>
                    <Col className={styles2.examplePrice}>
                        
                    </Col>
                </Row>
                <Row style={{paddingBottom:"3rem"}}>
                    <Col className={styles2.exampleStock}>
                        <p>
                            In Stock
                        </p>
                    </Col>
                    <Col className={styles2.exampleStock}>
                       
                    </Col>
                    <Col className={styles2.exampleStock}>
                        
                    </Col>
                </Row>
            </Container>
        <Footer/>
        </div>
      
    )
}

export default Shop