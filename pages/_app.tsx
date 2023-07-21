import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css'; 
import '../styles/global.css';
import '../components/pageComponents/carousel.css';
import GlobalState from "../context/GlobalState"

const MyApp = ({ Component, pageProps } : AppProps) => {


  return (
    <GlobalState>
     
        <Component {...pageProps} />
  
    </GlobalState>
  )
}

export default MyApp
