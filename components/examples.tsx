import {Row, Col, Container} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import Link from "next/link"
import styles from '../styles/Intro_section.module.scss';
import bagArr from "../constants/bagArr";
import Image from 'next/image';

const Examples = () => {

    interface Product {
        _id: string;
        name: string;
        img: string;
        category: string;
        price: number;
        __v: number;
      }[]
    
    //const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    //const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    
    function findBags(bags:Product) {
        return bags.category == 'Shopping Bag';
      }

    function filterBags(bags:Product) {
        return bags.name != 'No.1'
    }
 
    const bags = bagArr.filter(findBags)
    const filteredBags = bags.filter(filterBags) 
 
    return(
        <div style={{marginTop: '50px'}}>
        <Container fluid>
           <Row sm={12} className="mt-5 px-5">    
           
           {filteredBags.map((bag) => (
               <Col key={bag._id} className={styles.exampleSection}>
              
                       <Link href="/">
                           <Image src={bag.img} alt="" width="300" height="100"/> 
                       </Link>
               
               </Col>
               ))}       
        
           </Row>
       </Container>
       <Container fluid >
           <Row className="mt-1  px-5">
            <Col className={styles.exampleTitle}>
                <p>
                    Autumn Rhythm
                </p>
            </Col>
            <Col className={styles.exampleTitle}>
                <p>
                    Convergence
                </p>
            </Col>
            <Col className={styles.exampleTitle}>
                <p>
                    Mural
                </p>
            </Col>
           </Row>
            <Row className="px-5">
                <Col className={styles.examplePrice}>
                    <p>
                        8.000
                    </p>
                </Col>
                <Col className={styles.examplePrice}>
                    <p>
                    8.000
                    </p>
                </Col>
                <Col className={styles.examplePrice}>
                    <p>
                        8.000 <br/>
                    </p>
                </Col>
           </Row>
           <Row className="px-5">
                <Col className={styles.exampleStock}>
                    <p>
                        In Stock
                    </p>
                </Col>
                <Col className={styles.exampleStock}>
                    <p>
                        In Stock
                    </p>
                </Col>
                <Col className={styles.exampleStock}>
                    <p>
                        In Stock
                    </p>
                </Col>
           </Row>
       </Container>
        </div>
    )
}

export default Examples