import Navbar from "../nav/Navbar";
import Footer from "../footer/Footer";

function DefaultLayout({ children }) {
   return (
      <div>
         <Navbar />
         <>
            {children}
         </>
         <Footer />
      </div>
   )
}

export default DefaultLayout