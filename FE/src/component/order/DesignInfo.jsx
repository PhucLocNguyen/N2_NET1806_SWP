import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { fetchApiDesignById, ApiRelatedDesign } from '../../api/FetchApiDesign';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Arrow from '../../assets/designInfo/arrow.svg'
import Design1 from '../../assets/designInfo/design1.png'

const CustomButton = styled(Button)({
   '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
      border: '1px solid #000'
   }
})

function DesignInfo() {
   const [designInfo, setDesignInfo] = useState({});
   const { id } = useParams()
   const [relatedDesign, setRelatedDesign] = useState();
   const nameLink = designInfo.typeOfJewellery?.name.toLowerCase();

   const fetchApiRelatedDesign = async ({ typeDesign, idDesign }) => {
      const response = await ApiRelatedDesign({ typeDesign, idDesign });
      return response;
   }

   useEffect(() => {

      window.scrollTo(0, 0);

      const fetchAPI = async () => {
         const respone = await fetchApiDesignById(id)
         let typeDesign = respone?.typeOfJewellery?.name
         let idDesign = respone?.designId;
         let relatedResponse = await fetchApiRelatedDesign({ typeDesign, idDesign })

         setDesignInfo(respone)
         setRelatedDesign(relatedResponse)
      }

      fetchAPI()
   }, [id])



   console.log(relatedDesign)

   return (
      <>
         <div className="p-[4rem]">
            <div className="max-w-[75rem] ml-auto mr-auto flex items-center flex-col">
               <div className="flex w-[100%] gap-x-[3.5rem] items-start ">
                  <div className='max-w-[40%]  rounded-lg'>
                     {/* Hinh anh */}
                     <img src={designInfo.image} className='max-w-[100%] w-[30rem] max-h-[30rem] h-[30rem] object-cover rounded-lg' />
                  </div>
                  <div className='flex flex-col items-start gap-y-[1.5rem] max-w-[55%] '>
                     {/* Ten thiet ke */}
                     <div className='w-[100%] group'>
                        <p className='text-[#000] text-[4rem] font-normal leading-[5rem] mt-0 break-words line-clamp-1 group-hover:line-clamp-none'>
                           {designInfo.designName}
                        </p>
                     </div>
                     {/* Description Section */}
                     <div className='flex flex-col gap-y-[0.5rem] min-h-[9.3rem] group relative'>
                        <h3 className='text-[2rem] font-normal leading-[2.875rem]'>Description</h3>
                        {/* Phan mo ta thiet ke */}
                        <p className='text-[#000] mb-0 text-[1rem] font-normal leading-[1.5rem] line-clamp-5 group-hover:line-clamp-none'>
                           {designInfo.description}
                        </p>
                     </div>

                     {/* Policy section */}
                     <div className='gap-y-[10px] flex flex-col'>
                        <div className='flex items-center'>
                           <CheckCircleOutlineIcon color='primary' />
                           <span className='ml-[5px] text-[#000] text-[1rem] font-normal leading-[1.5rem]'>Product prices vary depending on actual weight of ingredients.</span>
                        </div>
                        <div className='flex items-center'>
                           <CheckCircleOutlineIcon color='primary' />
                           <span className='ml-[5px] text-[#000] text-[1rem] font-normal leading-[1.5rem]'>Customers can customize the design easily and quickly.</span>
                        </div>
                        <div className='flex items-center'>
                           <CheckCircleOutlineIcon color='primary' />
                           <span className='ml-[5px] text-[#000] text-[1rem] font-normal leading-[1.5rem]'>Warranty for orders is at least 1 year.</span>
                        </div>
                     </div>

                     {/* Button custom */}
                     <Link to={`/design/create-requirement/${id}`} style={{ width: '100%' }}>
                        <CustomButton variant='contained' sx={{ color: '#fff', bgcolor: '#000', letterSpacing: 4, padding: '0.7rem 2.375rem', fontSiz: '1rem', fontWeight: 400, lineHeight: '1.5rem', width: '100%' }} >
                           CUSTOM DESIGN
                        </CustomButton>
                     </Link>

                  </div>
               </div>
            </div>
         </div>

         {/* Related design */}
         <div className='pb-[4rem]'>
            <div className="max-w-[75rem] ml-auto mr-auto flex items-center flex-col">

               <div className='w-[100%]'>
                  <div className='w-[100%] flex mb-[3rem] items-center justify-between'>
                     <h2 className='text-[2.625rem] font-normal leading-[3.5rem]'>RELATED DESIGN</h2>
                     <Link to={`/design/${nameLink}`} className='tracking-[4px] flex items-center justify-start font-normal group'>
                        <div className='group-hover:scale-105'>VIEW MORE</div>
                        <img className='translate-x-[-1.4rem] group-hover:translate-x-[0.2rem] transition-transform duration-300 ease-in-out' src={Arrow} />
                     </Link>
                  </div>


                  <div>
                     <div className='grid gap-x-[1.5rem] grid-rows-1 grid-cols-3'>

                        {relatedDesign?.map((item, index) => {
                           return (
                              <div key={index} className='border-[1px] border-solid border-[#ccc] rounded-[5px]'>
                                 <Link to={`/design/${item?.designId}`} className='relative overflow-hidden max-w-[100%] inline-block '>
                                    <img className='inline-block w-[100%] object-cover overflow-hidden h-[400px]' src={item?.image} />
                                    <div className='absolute top-[24px] left-[30px] font-normal tracking-[1px] text-[1.2rem] leading-[1.5rem] line-clamp-1'>{item?.description}</div>
                                 </Link>
                              </div>
                           )
                        })}
                     </div>
                  </div>


               </div>
            </div>
         </div>
      </>
   )
}

export default DesignInfo