import React from "react";
import {Row, Col, Container} from 'react-bootstrap';
//import { useMediaQuery } from 'react-responsive'
import styles from '../styles/Intro_section.module.scss';

const Showcase = () => {

    //const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
   // const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
            <Container fluid>
                <Row className={`${styles.stickyRow } mt-5`}>
                    <Col className={styles.stickyCol} lg={6}>
                        <div className={styles.stickyBox}>
                            <h3>
                            Action Painting Style
                            </h3>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Eiusmod tempor incididunt ut labore et dolore magna.
                            </p>
                        </div>
                    </Col>
                    <Col className={styles.module}>
                        <div className={styles.moduleInside}>
                            <div className={styles.stickyImg}>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
    )
}

export default Showcase
