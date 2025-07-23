import "../styles/globals.css";

//internal import

import { NavBar, Footer } from "../../components";
import {CrowdFundingProvider} from "../../context/CrowdFunding";

export default function App({ Component, pageProps}) {
  return (
    <>
    <CrowdFundingProvider>
    <NavBar/>
    <Component {...pageProps} />
    <Footer/>
    </CrowdFundingProvider>
  </>
  );
};
