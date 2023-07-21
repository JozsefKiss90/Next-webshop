import React from "react";
import {Row, Col, Container} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import styles from '../styles/Intro_section.module.scss';

const About = () => {

    //const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    //const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return(
    <Container fluid className={styles.about}>
            <Row>
            <Col className={styles.aboutSection}>
                
            </Col>
            <Col className={styles.aboutSection}>
                <h2>
                    About Us
                </h2>
            </Col>
            <Col className={styles.aboutSection}>
                
            </Col>
            </Row>
            <Row >
            <Col lg={3} className={styles.aboutSection}>
                
            </Col>
            <Col lg={6} className={styles.aboutSection}>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
            </Col>
            <Col lg={3} className={styles.aboutSection}>
                
            </Col>
            </Row>
            <Row >
            <Col lg={3} className={styles.aboutSection}>
                
            </Col>
            <Col lg={6} className={styles.aboutSection2}>
                    <h5 className={styles.story}>
                        THE WHOLE STORY
                    </h5>
                    <div style={{border:"0.5px solid lightgrey", maxHeight:"0.5px", width:"151px", position:"relative", bottom:"8px",zIndex:"0"}}>
                    
                    </div>
            </Col>
            <Col lg={3} className={styles.aboutSection}>
                
            </Col>
        </Row>
    
    </Container>
    )
}

export default About