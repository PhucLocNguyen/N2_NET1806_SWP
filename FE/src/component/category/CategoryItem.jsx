import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Skeleton from '@mui/material/Skeleton';

import Arrow from '../../assets/categoryItem/arrow.svg'

function CategoryItem({ design = {} }) {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const img = new Image();
      img.src = design.image;
      img.onload = () => setLoading(false);
   }, [design.image]);

   return (
      <>
         <motion.div whileHover={{scale: 1.05}} transition={{ duration: .5 }} className="text-[1rem] leading-[1.3em] font-normal ">
            <Link to={`/design/${design.designId}`} className="max-w-[100%] inline-block cursor-pointer">
               {loading ? (<Skeleton animation="wave" sx={{ borderRadius: '10px' }} variant="rectangular" width="300px" height="300px" />) :
                  (<div div className='overflow-hidden mb-[0.94rem] rounded-[10px] w-[100%] h-[300px]'>
                     <img className='rounded-[10px] inline-block w-[100%] h-[100%] object-cover border-[1px] border-solid border-[#ccc]' src={design.image} />
                  </div>)
               }
               <div className='flex justify-between items-center'>
                  <div>
                     {loading ? (<Skeleton animation="wave" variant="text" width="150px" />) :
                        (<h6 className='text-[1.5rem] font-normal max-w-[200px] overflow-hidden leading-8'>{design.designName}</h6>)
                     }
                  </div>
                  <div>
                     {loading ? (<Skeleton animation="wave" sx={{ marginTop: '5px' }} variant="circular" width='40px' height='40px' />) :
                        (<div className='flex w-[40px] h-[40px] justify-center items-center	border-solid border-[1px] border-[#000] rounded-[50%]'>
                           <img className='max-w-[100% inline-block' src={Arrow} />
                        </div>)
                     }
                  </div>
               </div>
            </Link >
         </motion.div >
      </>
   )
}

export default CategoryItem