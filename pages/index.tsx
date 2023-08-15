import NavComponent from "../components/navbar"
import IntroSection from "../components/introSection"
import Showcase from "../components/showcase"
import Examples from "../components/examples";
import About from "../components/about"
import Showcase_2 from "../components/showcase_2"
import Reviews from "../components/reviews";
import Footer from "../components/footer"
import AppContext from "../context/AppContext"
import { useContext, useEffect, useState } from "react"
import {ContextProduct, Context} from '../types'
import Cookie from "js-cookie";

const Home = (initialCart : string) => {

  function getCookie(key : string) {
    let result:any[] = [];
    if (key) {
      const localData: string | undefined = Cookie.get(key);
      if (localData && localData.length > 0) {
        result = JSON.parse(localData);
      }
    }
    return result;
  }
  //const context = useContext<Context>(AppContext) 
  const [cartCookie, setCartCookie] = useState<string>('');
  const [cookieArr, setCookieArr] = useState<ContextProduct[]>([]);

  useEffect(()=>{
    setCartCookie(initialCart)
  },[initialCart])

  useEffect(() => {
    if(initialCart != undefined) {
      setCookieArr(getCookie('cartCookie'))
    }
}, [initialCart]);
  
  return <>
    <NavComponent
          cartItemNumber={cookieArr.length}
    />
    <IntroSection/>
    <Showcase/>
    <Examples/>
    <About/>
    <Showcase_2/>
    <Reviews/>
    <Footer/>
  </> 
}

Home.getInitialProps = () => {
  function getCookie(key:any) {
      let result :string[] = [];
      if (key) {
        const localData = Cookie.get(key);
        if (localData && localData.length > 0) {
          result = JSON.parse(localData);
        }
      }
      return result;
    }
  const cookies : string[] = getCookie('cartCookie');
  return {
    props: {
      initialCart: cookies
    }
  };
};

export default Home