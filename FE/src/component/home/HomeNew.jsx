import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import banner1 from '../../assets/home/newbanner1.jpg';
import banner2 from '../../assets/home/newbanner2.jpg';
import banner3 from '../../assets/home/newbanner3.jpg';
import video from '../../assets/home/videobanner.mp4';
import icon1 from '../../assets/home/icon1.gif';
import icon2 from '../../assets/home/icon2.gif';
import icon3 from '../../assets/home/icon3.gif';
import icon4 from '../../assets/home/icon4.gif';
import newring from '../../assets/home/ringnew.png';
import newchain from '../../assets/home/chainnew.png';
import newearring from '../../assets/home/earringnew.png';
import newbracalet from '../../assets/home/bracaletnew.png';
import Chutrinh from '../../assets/home/chutrinh.jpg';
import ArrowWhite from '../../assets/home/arrowWhite.svg';


function HomeNew() {
   const [currentSlide, setCurrentSlide] = useState(0);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [])

   var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      afterChange: (index) => setCurrentSlide(index)
   };

   return (
      <>
         <div className='w-[100%] pb-[8rem]'>
            <div className='w-[90%] my-[3rem] mx-auto'>
               <Slider {...settings}>

                  <div className='rounded-[15px] relative'>
                     <video src={video} className='w-[100%] h-[550px] object-cover rounded-[15px]' autoPlay muted loop></video>
                     <div className='absolute z-5 text-[#fff] left-[-6%] ml-[13%] top-[40%]'>
                        {currentSlide === 0 && (<>
                           <motion.h2 initial={{ opacity: 0, x: 150 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className='text-[36px] leading-[42px] tracking-[3px]'>
                              JEWELRY MANUFACTURING
                           </motion.h2>
                           <motion.h3 initial={{ opacity: 0, x: -150 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className='mt-[10px] text-[18px] leading-[21px] tracking-[1px] max-w-[510px]'>
                              Full-Service Jewelry Creation Service, Efficient. Professional. Precise.
                           </motion.h3>
                        </>
                        )}
                     </div>
                  </div>

                  <div className='rounded-[15px] relative'>
                     <img className='w-[100%] h-[550px] object-cover rounded-[15px]' src={banner1} />
                     <div className='absolute z-5 text-[#fff] left-[-6%] ml-[13%] top-[40%]'>
                        {currentSlide === 1 && (<>
                           <motion.h2 initial={{ opacity: 0, x: 150 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className='text-[36px] leading-[42px] tracking-[3px]'>
                              FOR JEWELRY DESIGNERS
                           </motion.h2>
                           <motion.h3 initial={{ opacity: 0, x: -150 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className='mt-[10px] text-[18px] leading-[21px] tracking-[1px] max-w-[510px]'>
                              Our design and your style
                           </motion.h3>
                        </>
                        )}
                     </div>
                  </div>

                  <div className='rounded-[15px] relative'>
                     <img className='w-[100%] h-[550px] object-cover rounded-[15px]' src={banner3} />
                     <div className='absolute z-5 text-[#000] left-[-6%] ml-[13%] top-[40%]'>
                        {currentSlide === 2 && (<>
                           <motion.h2 initial={{ opacity: 0, x: 150 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className='text-[36px] leading-[42px] tracking-[3px]'>
                              CUSTOM ENGAGEMENT RINGS
                           </motion.h2>
                           <motion.h3 initial={{ opacity: 0, x: -150 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className='mt-[10px] text-[18px] leading-[21px] tracking-[1px] max-w-[510px]'>
                              Custom Design.  Unlimited Options.
                           </motion.h3>
                        </>
                        )}
                     </div>
                  </div>

                  <div className='rounded-[15px] relative'>
                     <img className='w-[100%] h-[550px] object-cover rounded-[15px]' src={banner2} />
                     <div className='absolute z-5 text-[#000] left-[-6%] ml-[13%] top-[40%]'>
                        {currentSlide === 3 && (<>
                           <motion.h2 initial={{ opacity: 0, x: 150 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className='text-[36px] leading-[42px] tracking-[3px]'>
                              CUSTOM JEWELRY
                           </motion.h2>
                           <motion.h3 initial={{ opacity: 0, x: -150 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className='mt-[10px] text-[18px] leading-[21px] tracking-[1px] max-w-[510px]'>
                              Create fine custom jewelry for gifts or any occasion.
                           </motion.h3>
                        </>
                        )}
                     </div>
                  </div>

               </Slider>
            </div>

            {/* Icon */}
            <div className='w-[100%] my-[3rem] mx-auto flex'>

               <div className='w-[25%] relative text-center pt-[65px]'>
                  <img className='mx-auto' src={icon1} />
                  <div>
                     <h3 className='leading-[20px] pt-[27px] tracking-[3px] text-[17px] font-bold'>CUSTOM JEWELRY</h3>
                     <h2 className='pt-[5px]'>
                        <p className='text-[14px] leading-[18px] tracking-[1px]'>Unique Custom Pieces</p>
                        <p className='text-[14px] leading-[18px] tracking-[1px]'>Complex 3D Modeling</p>
                     </h2>
                  </div>
               </div>

               <div className='w-[25%] relative text-center pt-[65px]'>
                  <img className='mx-auto' src={icon2} />
                  <div className='border-x-[1px] border-solid border-[#d1d0cc]'>
                     <h3 className='leading-[20px] pt-[27px] tracking-[3px] text-[17px] font-bold'>MANUFACTURING</h3>
                     <h2 className='pt-[5px]'>
                        <p className='text-[14px] leading-[18px] tracking-[1px]'>Full-Service Jewelry</p>
                        <p className='text-[14px] leading-[18px] tracking-[1px]'>Creation</p>
                     </h2>
                  </div>
               </div>

               <div className='w-[25%] relative text-center pt-[65px]'>
                  <img className='mx-auto' src={icon3} />
                  <div className='border-x-[1px] border-solid border-[#d1d0cc]'>
                     <h3 className='leading-[20px] pt-[27px] tracking-[3px] text-[17px] font-bold'>FOR DESIGNERS</h3>
                     <h2 className='pt-[5px]'>
                        <p className='text-[14px] leading-[18px] tracking-[1px]'>Your style</p>
                        <p className='text-[14px] leading-[18px] tracking-[1px]'>We Bring it to Life</p>
                     </h2>
                  </div>
               </div>

               <div className='w-[25%] relative text-center pt-[65px]'>
                  <img className='mx-auto' src={icon4} />
                  <div>
                     <h3 className='leading-[20px] pt-[27px] tracking-[3px] text-[17px] font-bold'>ENGAGEMENT RINGS</h3>
                     <h2 className='pt-[5px]'>
                        <p className='text-[14px] leading-[18px] tracking-[1px]'>Custom Design</p>
                        <p className='text-[14px] leading-[18px] tracking-[1px]'>Unlimited Options</p>
                     </h2>
                  </div>
               </div>

            </div>

            <div className='px-[1rem]'>
               <div className='max-w-[75rem] ml-auto mr-auto w-[100%] pt-[4.375rem] pb-[8.75rem] '>
                  <div>
                     <div className='flex items-center justify-center flex-col'>
                        <h2 className='text-[40px] font-normal leading-[3.5rem]'>Explore our Collections</h2>
                     </div>
                     <div className='pb-[3rem] w-[100%]'></div>
                     <div className='w-[100%]'>
                        <div className='w-[100%] grid gap-x-[1rem] gap-y-[1.5rem] grid-rows-1 grid-cols-4'>

                           <motion.div whileHover={{ scale: 1.05 }} className='bg-[#fceff3]'>
                              <Link to='/design/earrings' className='flex relative items-center flex-col max-w-[100%]'>
                                 <img src={newearring} className='inline-block max-w-[100%] align-middle' />
                                 <div style={{ backgroundColor: 'rgb(255,255,255,0.5)' }} className='w-[100%] border-[1px] divide-solid border-[white] py-[0.625rem] px-[1.5rem]'>
                                    <h6 className='text-[1.25rem] text-center font-normal leading-[1.75rem]'>Earrings</h6>
                                 </div>
                              </Link>
                           </motion.div>

                           <motion.div whileHover={{ scale: 1.05 }} className='bg-[#fceff3]'>
                              <Link to='/design/bracelet' className='flex relative items-center flex-col max-w-[100%]'>
                                 <img src={newbracalet} className='inline-block max-w-[100%] align-middle' />
                                 <div style={{ backgroundColor: 'rgb(255,255,255,0.5)' }} className='w-[100%] border-[1px] divide-solid border-[white] py-[0.625rem] px-[1.5rem]'>
                                    <h6 className='text-[1.25rem] text-center font-normal leading-[1.75rem]'>Bracelet</h6>
                                 </div>
                              </Link>
                           </motion.div>

                           <motion.div whileHover={{ scale: 1.05 }} className='bg-[#fceff3]'>
                              <Link to='/design/chain' className='flex relative items-center flex-col max-w-[100%]'>
                                 <img src={newchain} className='inline-block max-w-[100%] align-middle' />
                                 <div style={{ backgroundColor: 'rgb(255,255,255,0.5)' }} className='w-[100%] border-[1px] divide-solid border-[white] py-[0.625rem] px-[1.5rem]'>
                                    <h6 className='text-[1.25rem] text-center font-normal leading-[1.75rem]'>Chain</h6>
                                 </div>
                              </Link>
                           </motion.div>

                           <motion.div whileHover={{ scale: 1.05 }} className='bg-[#fceff3]'>
                              <Link to='/design/ring' className='flex relative items-center flex-col max-w-[100%]'>
                                 <img src={newring} className='inline-block max-w-[100%] align-middle' />
                                 <div style={{ backgroundColor: 'rgb(255,255,255,0.5)' }} className='w-[100%] border-[1px] divide-solid border-[white] py-[0.625rem] px-[1.5rem]'>
                                    <h6 className='text-[1.25rem] text-center font-normal leading-[1.75rem]'>Rings</h6>
                                 </div>
                              </Link>
                           </motion.div>

                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className='flex w-[90%] mx-auto h-[520px]'>
               <div className='w-[45%] h-[100%]'>
                  <img className='w-[100%] h-[100%] object-cover' src={Chutrinh} />
               </div>

               <div className='w-[55%] bg-[#5A705B]'>

                  <div className='pt-[20px]'>
                     <h2 className='text-[40px] font-normal leading-[1.3em] text-center text-[#ECE6C5]'>
                        Simple steps to place an order
                     </h2>
                  </div>

                  <div className='mt-[20px] ml-[100px]'>

                     <div className='mb-[25px] flex items-center'>
                        <div className='w-[50px] h-[50px] rounded-[50%] bg-[#fff] flex items-center justify-center'>
                           <h1 className='text-[20px]'>01</h1>
                        </div>
                        <div className='px-[10px] py-[5px] rounded-[20px] bg-[#fff] flex items-center justify-start ml-[10px] min-w-[450px]'>
                           <p className='text-[20px]'>Choose and customize the design you want</p>
                        </div>
                     </div>

                     <div className='mb-[25px] flex items-center'>
                        <div className='w-[50px] h-[50px] rounded-[50%] bg-[#fff] flex items-center justify-center'>
                           <h1 className='text-[20px]'>02</h1>
                        </div>
                        <div className='px-[10px] py-[5px] rounded-[20px] bg-[#fff] flex items-center justify-start ml-[10px] min-w-[450px]'>
                           <p className='text-[20px]'>Work with sales staff</p>
                        </div>
                     </div>

                     <div className='mb-[25px] flex items-center'>
                        <div className='w-[50px] h-[50px] rounded-[50%] bg-[#fff] flex items-center justify-center'>
                           <h1 className='text-[20px]'>03</h1>
                        </div>
                        <div className='px-[10px] py-[5px] rounded-[20px] bg-[#fff] flex items-center justify-start ml-[10px] min-w-[450px]'>
                           <p className='text-[20px]'>Receive order quotation</p>
                        </div>
                     </div>

                     <div className='mb-[25px] flex items-center'>
                        <div className='w-[50px] h-[50px] rounded-[50%] bg-[#fff] flex items-center justify-center'>
                           <h1 className='text-[20px]'>04</h1>
                        </div>
                        <div className='px-[10px] py-[5px] rounded-[20px] bg-[#fff] flex items-center justify-start ml-[10px] min-w-[450px]'>
                           <p className='text-[20px]'>Receive 3D design of the order from the designer</p>
                        </div>
                     </div>

                     <div className='mb-[20px] flex items-center'>
                        <div className='w-[50px] h-[50px] rounded-[50%] bg-[#fff] flex items-center justify-center'>
                           <h1 className='text-[20px]'>05</h1>
                        </div>
                        <div className='px-[10px] py-[5px] rounded-[20px] bg-[#fff] flex items-center justify-start ml-[10px] min-w-[450px]'>
                           <p className='text-[20px]'>Check order status</p>
                        </div>
                     </div>

                  </div>

                  <div className='pb-[20px] ml-[100px] cursor-pointer group inline-block'>
                     <Link to={'/design'} className='tracking-[4px] flex items-center justify-start font-normal '>
                        <div className='text-[#fff] text-[20px] group-hover:scale-105' >Get Custom Jewelry</div>
                        <motion.img className='translate-x-[-1.4rem] group-hover:translate-x-[0.2rem] transition-transform duration-300 ease-in-out' src={ArrowWhite} />
                     </Link>
                  </div>

               </div>
            </div>

         </div>
      </>
   )
}

export default HomeNew;
