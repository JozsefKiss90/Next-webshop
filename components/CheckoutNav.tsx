import React from "react";
import Logo from "../public/images/logo4.png";
import { Navbar, Nav, Container} from 'react-bootstrap';
import styles from '../styles/Navbar.module.scss'; 
import Image from 'next/image'

const CheckoutNav = () => {

return (
    <div>   
    <Navbar bg="light" className={styles.menu3}>
        <Container fluid className="d-flex justify-content-center">
            <Nav className={styles.navContent}>
                    <Navbar.Brand>
                        <Image src={Logo} width={110} height={100} layout="fill" alt="" />
                    </Navbar.Brand>
                </Nav>
        </Container> 
    </Navbar>
    </div>
    )
}

export default CheckoutNav