import { Outlet, Link } from "react-router-dom"
import CategoryItem from "./CategoryItem"


function Category() {
   return (
      <>
         <div className="py-[5rem] text-center px-[6.25rem] max-w-[100%]">
            <h1 className="mb-[1.875rem] text-[5.125rem] leading-[1.3em] font-normal">Shop</h1>
            <div className="text-center">
               <div className="flex items-center justify-center flex-wrap gap-x-[1.25rem] gap-y-[1.25rem] text-[1rem] leading-[1.3em]">

                  <div>
                     <Link to='all' className="min-w-[2rem] max-w-[100%] inline-block py-[0.625rem] px-[0.94rem] border-[1px] border-solid border-[#000] rounded-[10px]">
                        <div className="min-w-[4rem]">All</div>
                     </Link>
                  </div>

                  <div>
                     <Link to='earring' className="min-w-[2rem] max-w-[100%] inline-block py-[0.625rem] px-[0.94rem] border-[1px] border-solid border-[#000] rounded-[10px]">
                        <div className="min-w-[4rem]">Earrings</div>
                     </Link>
                  </div>

                  <div>
                     <Link to='bracelet' className="min-w-[2rem] max-w-[100%] inline-block py-[0.625rem] px-[0.94rem] border-[1px] border-solid border-[#000] rounded-[10px]">
                        <div className="min-w-[4rem]">Bracelets</div>
                     </Link>
                  </div>

                  <div>
                     <Link to='necklace' className="min-w-[2rem] max-w-[100%] inline-block py-[0.625rem] px-[0.94rem] border-[1px] border-solid border-[#000] rounded-[10px]">
                        <div className="min-w-[4rem]">Necklaces</div>
                     </Link>
                  </div>

                  <div>
                     <Link to='ring' className="min-w-[2rem] max-w-[100%] inline-block py-[0.625rem] px-[0.94rem] border-[1px] border-solid border-[#000] rounded-[10px]">
                        <div className="min-w-[4rem]">Rings</div>
                     </Link>
                  </div>

               </div>
            </div>
         </div>

         {/* <div className="px-[6.25rem]">
            <div className="text-[1rem] leading-[1.3em] font-normal">
               <div className="grid gap-x-[2.5rem] gap-y-[2.5rem] grid-cols-4">
                  <CategoryItem></CategoryItem>
                  <CategoryItem></CategoryItem>
                  <CategoryItem></CategoryItem>
                  <CategoryItem></CategoryItem>
                  <CategoryItem></CategoryItem>
                  <CategoryItem></CategoryItem>

               </div>
            </div>
         </div> */}

         <Outlet></Outlet>

      </>
   )
}

export default Category