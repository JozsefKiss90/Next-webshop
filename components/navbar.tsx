import styles from '../styles/Navbar.module.scss';
import React from "react";
import { useState,useEffect } from "react";
import Logo from "../public/images/logo4.png";
import { useMediaQuery } from 'react-responsive'
import { Navbar, Nav, Row, Container, Col, Collapse, Offcanvas} from 'react-bootstrap';
import Link from "next/link"
import Image from 'next/image'
import styled from "styled-components"; 

const ImageWrap = styled.span`
margin-left: 1.5rem;
height: 100px; 
width: 100px;`;

interface Props {
  cartItemNumber: number 
}

const NavComponent = (props : Props) => {

  //const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const [open, setOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);
  const [newNav, setNewNav] = useState<boolean>(false)

  useEffect(() => {
      window.addEventListener('scroll', scrollPos);
      return () => window.removeEventListener('scroll', scrollPos);
      }, []);
  
  useEffect(() => {
      window.addEventListener('scroll', newNavbar);
      return () => window.removeEventListener('scroll', newNavbar);
      }, []);


  const newNavbar = () => {
    window.addEventListener('scroll', newNavbar);
    let posHeight_2 = window.scrollY;
    posHeight_2 > 112 ? setNewNav(!newNav) : setNewNav(newNav)
    };

  const scrollPos = () => {
    window.addEventListener('scroll', scrollPos);
    let posHeight = window.scrollY;
    posHeight > 112 ? setScroll(posHeight) : setScroll(0)
    return () => window.removeEventListener('scroll', scrollPos);
  }; 
 
  const navClass = newNav ? "menu2_show" : "menu2"
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(!show);
  const handleShow = () => setShow(!show);


return (
    <div>   
    <Navbar bg="light" className={styles.menuTop} style={{overflowY:"hidden"}} >
      <Container fluid={true}>
        <Row>
          <Nav className={styles.navContent}>
            <Nav.Item className={styles.listIcon} onClick={isMobile ? handleShow : () => setOpen(!open)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </Nav.Item>
          </Nav> 
        </Row>
        <Row >
          <Nav className={styles.navContent}>
            <Navbar.Brand>
              <a href="/">
                  <ImageWrap>
                    <Image src={Logo} width={110} height={100} alt="wut" />
                  </ImageWrap>
              </a>
            </Navbar.Brand>
          </Nav>
        </Row>
        <Row>
          <Nav className={styles.navContent}>
            <Nav.Item className={styles.bagIcon}>
            <a style={{color:'black'}} href="/cart">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
                {props.cartItemNumber > 0 ? 
                
                  <div className={styles.bagQnty}>
                    <p >
                    {props.cartItemNumber}
                    </p>
                  </div> :
              ""
              }
            </div>
            </a>
            </Nav.Item> 
          </Nav>
        </Row>
    </Container> 
  </Navbar>
  <Container fluid={true} >
      <Row className={styles.blackBar}> 
        <p>
          Free Shipping Worldwide
        </p>
      </Row>
    </Container>
  <Navbar bg="light" className={navClass}>  
    <Container fluid={true} >
      <Row>
          <Nav className={styles.navContent}>
            <Nav.Item className={styles.listIcon} onClick={isMobile ? handleShow : () => setOpen(!open)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className={`bi bi-list`} viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </Nav.Item>
          </Nav>
        </Row> 
        <Row >
          <Nav className={styles.navContent}>
            <Navbar.Brand>
              <Link href="/">
                  <ImageWrap>
                    <Image src={Logo} width={110} height={100} alt="wut" />
                  </ImageWrap>
              </Link>
            </Navbar.Brand>
          </Nav>
        </Row>
        <Row>
          <Nav className={styles.navContent}>
            <Nav.Item className={`${styles.bagIcon} ms-auto`}>
            <Link style={{color:'black'}} href="/cart">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
                {props.cartItemNumber > 0 ? 
                
                  <div className={styles.bagQnty}>
                    <p >
                    {props.cartItemNumber}
                    </p>
                  </div> :
              ""
              }
            </div>
            </Link>
            </Nav.Item>
          </Nav>
        </Row>
    </Container>
  </Navbar>
  <Collapse in={open} timeout={300}>
      <Container fluid={true}  className={styles.dropdownContainer} style={{top:`${112+scroll}`+"px"}}>
        <Row className={styles.dropdown} >
          <Col className={styles.dropdownSections}></Col>
          <Col className={styles.dropdownSections}>
            <ul className={styles.dropdownList}>
              <Link href="/">
                <li>
                  HOME
                </li>   
              </Link>
              <Link href="">
                <li>
                BEST SELLERS
                </li>   
              </Link>
              <Link href="/shop">
                <li>
                  SHOP
                </li>   
              </Link>
              <Link href="">
                <li>
                  ABOUT US
                </li>   
              </Link>
              <Link href="">
                <li>
                  CONTACT US
                </li>   
              </Link>
            </ul>       
          </Col>
          <Col className={styles.dropdownSections}></Col>
        </Row>
      </Container>
    </Collapse>
    </div>
    )
}

export default NavComponent