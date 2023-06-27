import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css'; 
import '../styles/global.css';
import '../components/pageComponents/carousel.css';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import GlobalState from "../context/GlobalState"
import {useState,useEffect} from "react";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps } : AppProps) => {

 /* useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);*/

  const[publishabkeKey, setPublishabkeKey] = useState<string>("")

  useEffect(() => {
    fetch('api/keys', {
      method:'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then((res)=>res.json())
    .then((data)=>{
      setPublishabkeKey(data.publishabkeKey)
      })
  }, []);
  console.log(publishabkeKey)
  const stripe = loadStripe(publishabkeKey)

  return (
    <GlobalState>
      <Elements stripe={stripe}>
        <Component {...pageProps} />
      </Elements>
    </GlobalState>
  )
}

export default MyApp
