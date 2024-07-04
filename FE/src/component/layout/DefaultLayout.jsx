import Navbar from "../nav/Navbar2";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { motion } from "framer-motion";
function DefaultLayout({ children }) {
  return (
    <div className="relative">
      <Navbar />
      <>{children}</>
      <motion.div animate={{ scale: [0.8,0.9, 1, 0.9, 0.8] }} transition={{ ease: "linear", duration: 2, repeat:Infinity}}    className="fixed right-10 bottom-10 w-[65px] h-[65px] bg-black cursor-pointer rounded-full p-4 border">
        <Link
          to="/chat"
        >
          <ChatIcon
            sx={{
              color: "white",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Link>
      </motion.div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
