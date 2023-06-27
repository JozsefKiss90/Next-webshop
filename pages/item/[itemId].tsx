import React from "react";
import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import NavComponent from "../../components/navbar";
import Footer from "../../components/footer"
const Fade = require("react-reveal/Fade")
import {Row, Col, Container} from 'react-bootstrap'; 
import { CSSTransition } from 'react-transition-group';
import ArrowToggler from "../../components/pageComponents/arrowToggler";
import { useMediaQuery } from 'react-responsive'
import buttons from "../../styles/Buttons.module.scss"
import styles from "../../styles/Items.module.scss"
import { useRouter } from 'next/router'
import products from "../../context/products";
import Cookie from "js-cookie";
import Link from "next/link";
import {ContextProduct, Product, Context} from '../../types'

  const Item = (props : Product[] ) => {
    
    const context = useContext<Context>(AppContext)
    const router = useRouter()

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const [cartCookie, setCartCookie] = useState(props);
    console.log(props)
    useEffect(() => {
        Cookie.set("cartCookie", JSON.stringify(cartCookie));
    }, [cartCookie]);
    
    useEffect(() => {
        if(context.cart.length != 0) {
            setCartCookie(context.cart)
        }
        else {
            setCartCookie(props)
        }
    }, [context.cart]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [0]);

    function findItem(item:Product) {
        return item._id == itemId;
      }

      const [quantity, setQuantity] = useState<number>(1)
      const [item, setItem] = useState<Product>({} as Product)
      const [fading, setFading] = useState (false)
      const [inProp, setInProp] = useState(false);
      const [mouseEffect, setMouseEffect] = useState (false)
      const [name, setName] = useState("")
      const [itemId, setItemId] = useState<string | string[] | undefined>("")
      const [array, setArray] = useState<any>([])
      const [inCart, setInCart] = useState<boolean>(false)
    
      React.useEffect(() => {
        if(!router.isReady) return;
        setItemId(router.query.itemId)
       }, [router.isReady]);

       React.useEffect(() => {
        if(!itemId) return;
        const productId : any  = products.find(findItem)
        setItem(productId as Product )
        }, [itemId]);
 
    function handleOut () : void {
        setMouseEffect(!mouseEffect)
        }

    function handleIn() : void {
        setMouseEffect(!mouseEffect)
        } 

    function handlePlusCount() : void {
        setQuantity(quantity+1)
    }

    function handleMinusCount() : void {
        setQuantity(quantity-1)
    }

    React.useEffect(() => {
        setFading(!fading)
       }, [0]);

    React.useEffect(() => {
        setInProp(!inProp)
       }, [0]);
    
    React.useEffect(() => {
        setInProp(!inProp)
    }, [0]);
    
    React.useEffect(() => {
        if (context.cart.length != 0) {
            setInCart(context.cart.some((items :any) =>(
                items.name == item.name 
            )))
        }
        }, [item, context]);
  
    React.useEffect(() => {
        if(item?.category=='mask') {
            setArray(products.filter(item => item.category == 'mask'))
        }
        else if (item?.category=='Shopping Bag') {
            setArray(products.filter(item => item.category == 'Shopping Bag'))
        }
        else if (item?.category=='mobile') {
            setArray(products.filter(item => item.category == 'mobile'))
        }
       }, [item]);

    const classes = `${fading ? buttons.btnRounded4 : buttons.btnRounded4_hide}`
    
    return (
        <AppContext.Consumer>
        {context =>  (
              <div>
              <NavComponent
                   cartItemNumber={cartCookie.length}
              />
              <Container fluid>
                  <Row>
                  <Col lg={2} className={styles.itemSideContainer}>
                      {array.length == 0 ? (
                        <h2>Loading...</h2>
                            ) : ( 
                          <>
                              { array.map((image:ContextProduct) => ( 
                                  <Row key={image._id} className={styles.itemSide}>
                                      <Fade>
                                          <img src={image.img} onClick={()=>(setItem(image),setName(image.name), setInProp(!inProp), setQuantity(1))} className={ `${item?.img==image.img ? styles.redBorder : " "}`}/>
                                      </Fade>
                                  </Row>
                              ))}  
                          </>
                            )}
                      </Col>
                      <Col lg={5} className={styles.itemSideContainer}>
                      <CSSTransition in={inProp} timeout={300} classnames={styles.myNode}>
                      {array.length == 0 ? (
                        <h2>Loading...</h2>
                            ) : ( 
                          <>
                          <div className={styles.myNodeDiv}>
                              <img src={item?.img} className={`${styles.myNodeEnter} ${styles.myNodeEnterActive} ${styles.myNodeExit} ${styles.myNodeExitActive}`}/>
                          </div>
                          </>
                        )}
                      </CSSTransition> 
                      <Row>
                          <div style={{width:"15rem"}} className="d-flex justify-content-center mt-5">
                          {array.length == 0 ? (
                        <h2>Loading...</h2>
                            ) : ( 
                                <>
                                  { array.map((image:ContextProduct) => (
                                      <div key={image._id} className="px-2">
                                          <div className={`${item?.img==image.img ? styles.itemCircle_select : styles.itemCircle}`} onClick={()=>(setItem(image), setName(image.name),  setInProp(!inProp))}/>
                                      </div>
                                  ))}  
                              </>
                                )}
                          </div>
                      </Row>
                      </Col>
                      <Col lg={5}  className={`${styles.itemSideContainer3}`}>
                          <Row style={{width:"100%"}}>
                             <h3 className={styles.itemTitle}>
                              {item?.category}
                             </h3>
                          </Row>
                          <Row style={{width:"100%"}}>
                             <h5>
                               {item?.name}
                             </h5>
                          </Row>
                           <Row style={{width:"100%"}} className={styles.itemBorder}>
                         
                          <div className={styles.stars}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                              </svg>
                              <p> 654 Ratings</p>
                          </div>
                          <div>
                              <p> 8.500</p>
                          </div>
                      
                          </Row>
                          <Row style={{width:"100%"}}>
                             <div>
                             <div className={`${styles.boxContainer} mt-3`}>
                                  <button className={styles.leftBox} onClick={handleMinusCount}>
                                      -
                                  </button>
                                  <div className={styles.middleBox}>
                                      {quantity}
                                  </div>
                                  <button className={styles.rightBox} onClick={handlePlusCount}>
                                      +
                                  </button>
                              </div>
                              </div>
                          </Row>
                          <Row style={{ width:"100%", marginLeft:"0px"}} className="mt-3">
                              <button style={{width:"30%"}}
                                      type="button"
                                      className={`${mouseEffect ? buttons.btnRoundedIn : classes}`}
                                      onMouseOver={handleIn} onMouseOut={handleOut}
                                      onClick={context.addProductToCart.bind(this,{ ...item, quantity: quantity})}>
                                  {inCart ? 'In The Cart' : 'Add To Cart'} 
                              </button> 
                              <Link href="/cart">  
                                <button style={{width:"30%", marginLeft: "15px"}}
                                        type="button"
                                        className={buttons.btnRoundedIn2}
                                        >
                                    Go To Cart
                                </button> 
                              </Link>
                          </Row> 
                          <Row style={{width:"74%", margin:"0 auto 0 0"}} className="mt-3">
                              <Row>
                                  <ArrowToggler 
                                      style={
                                          {marginLeft:"12px",
                                          width:"100%",
                                          borderTop:"1px solid black",
                                          borderBottom: "1px solid black"
                                          }
                                      }
                                      title="DESCRIPTION"/>
                              </Row>
                              <Row>
                                  <ArrowToggler
                                  style={
                                      {marginLeft:"12px",
                                      width:"100%",
                                      borderBottom: "1px solid black"
                                      }
                                  }
                                  title="SHIPPING"/>
                              </Row>
                          </Row>
                      </Col>
                  </Row>
              </Container>
          <Footer/>
          </div>
        )}
    </AppContext.Consumer>
    )
}

Item.getInitialProps = () => {
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

export default Item