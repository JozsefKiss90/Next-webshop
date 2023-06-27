/* eslint-disable react/display-name */
import React from 'react'
import { Nav } from 'react-bootstrap'
import Link from "next/link";

let CheckoutSteps: ({ step1, step2, step3, step4 }: {
  step1: any;
  step2: any;
  step3: any;
  step4: any;
}) => JSX.Element

 CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-start py-3' style={{fontSize:"0.9rem"}}>
      <Nav.Item> 
        {step1 ? (
          <Link href="/cart">
          <div style={{cursor:"pointer"}} className="d-flex" >
                Cart
              <div style={{position:"relative", bottom:"1px"}} className="px-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
               </div>
            </div>
          </Link>
   
        ) : (
         
            <div className="d-flex" >
                Cart
                <div style={{position:"relative", bottom:"1px"}} className="px-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
               </div>
            </div>
      
        )}
      </Nav.Item>

      <Nav.Item className="step-parent">
        {step2 ? (
          <Link href="/information">
            <div style={{cursor:"pointer"}} className='d-flex'>
                {step3 ? "Infrormation" : <strong>Information</strong>}
                <div style={{position:"relative", bottom:"1px"}} className="px-1">
                <svg xmlns="http://www.w3.org/2000/svg"  width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
               </div>
            </div>
          </Link>
        ) : (

          <div  className='d-flex'>
               Information
               <div style={{position:"relative", bottom:"1px"}} className="px-1">
               <svg xmlns="http://www.w3.org/2000/svg"  width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                 <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
               </svg>
              </div>
           </div>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
           <Link href="/shipping">
              <div style={{cursor:"pointer"}} className='d-flex'>
              {step4 ? "Shipping" : <strong>Shipping</strong>}
                  <div style={{position:"relative", bottom:"1px"}} className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </div>
              </div>
            </Link>
        ) : (
    
            <div className='d-flex'>
                Shipping
                <div style={{position:"relative", bottom:"1px"}} className="px-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </div>
              </div>
  
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
            <Link href="/checkout">
              <div className="d-flex">
                <strong>Payment</strong>
              </div>
            </Link>
        ) : (
     
            <div className="d-flex">
              Payment
            </div>
      
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps