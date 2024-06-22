import ManagerNav from "../ManagerNav";

function ManagerLayout({ children }) {
   return (
      <>
         <div className="flex ">

            {/* Nav bar */}
            <div className="w-[20%]">
               <ManagerNav />
            </div>

            {/* Chidlren */}
            <div className="w-[80%]">
               {children}
            </div>

         </div>
      </>
   )
}

export default ManagerLayout;