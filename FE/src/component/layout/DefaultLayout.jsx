import Navbar from "../nav/Navbar2";
import Footer from "../footer/Footer";

function DefaultLayout({ children }) {
   return (
      <>
         <Navbar />
         <>
            {children}
         </>
         <Footer />
      </>
   )
}

export default DefaultLayout