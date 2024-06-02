import { motion } from 'framer-motion'
import ItemImg from '../../image/categoryItem/item1.jpg'
import Arrow from '../../image/categoryItem/arrow.svg'

function CategoryItem() {
   return (
      <>
         <div className="text-[1rem] leading-[1.3em] font-normal">
            <a className="max-w-[100%] inline-block cursor-pointer">
               <div className='overflow-hidden mb-[0.94rem] rounded-[10px]'>
                  <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: .7 }} className='rounded-[10px] inline-block max-w-[100%]' src={ItemImg} />
               </div>
               <div className='flex justify-between items-center'>
                  <div>
                     <h6 className='text-[1.5rem] font-normal '>Copper Gold plated</h6>
                  </div>
                  <div>
                     <div className='flex w-[3.125rem] h-[3.125rem] justify-center items-center	border-solid border-[1px] border-[#000] rounded-[50%]'>
                        <img className='max-w-[100% inline-block' src={Arrow} />
                     </div>
                  </div>
               </div>
            </a>
         </div>
      </>
   )
}

export default CategoryItem