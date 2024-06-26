import SaleNav from "../SaleNav";

function AdminLayout({ children }) {
   return (
      <>
         <div className="flex ">

            {/* Nav bar */}
            <div className="w-[20%]">
               <SaleNav />
            </div>

            {/* Chidlren */}
            <div className="w-[80%]">
               {children}
            </div>

         </div>
      </>
   )
}

export default AdminLayout;