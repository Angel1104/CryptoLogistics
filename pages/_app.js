import "../styles/globals.css";

//INTERNAL IMPORT
import { SideBar } from "../Components";
import { TrackingProvider } from "../Conetxt/TrackingContext";
export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
        <Component {...pageProps} />
      </TrackingProvider>
    </>
  );
}
