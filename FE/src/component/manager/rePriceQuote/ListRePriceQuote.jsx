import { useState, useEffect } from 'react';


import ApiListRequirement from "../../../api/manager/ListRequirement";
import RowRePrice from './RowRePrice';

function ListRePriceQuote() {
   const pageSize = 6;
   const status = -3;

   const [page, setPage] = useState(1);
   const [data, setData] = useState([]);
   const [dataSize, setDataSize] = useState(0);

   const fetchApiListRequirement = async () => {
      const respone = await ApiListRequirement({ pageSize, page, status });
      setData(respone)
   }

   const fetchApiTotalRequirement = async () => {
      const respone = await ApiListRequirement({ status });
      setDataSize(respone?.length)
   }

   useEffect(() => {
      try {

         fetchApiTotalRequirement();
         fetchApiListRequirement();

      } catch (error) {
         setData([])
      }
   }, [page])

   return (
      <>
         <div className="min-h-[100vh] py-[3rem] px-[3rem] bg-[#f7f9fc]">
            <div className="w-[100%] min-h-[550px]">
               <div className="rounded-[30px] border-[1px] border-solid border-[#e9eaf3] bg-[white]">

                  <div className="py-[1.75rem] px-[2.25rem] flex items-center">
                     <h2 className="font-bold text-[1.5rem] leading-[1.125em]">All Requirement Re-price Quote</h2>
                  </div>

                  {/* Header row */}
                  <div className="bg-[#f7f9fc] grid grid-cols-4 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3]">
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Order ID</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Status</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Order Date</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Type</h2>
                     </div>
                  </div>

                  {data?.map((item, index) => {

                     return (
                        <RowRePrice key={index} data={item} />
                     )
                  })}

               </div>

            </div>
            {/* <div className='flex justify-center items-center'>
               <Stack>
                  <Pagination count={(Math.ceil(dataSize / 6)) || 0} page={page} onChange={handleChange} />

               </Stack>
            </div> */}
         </div>
      </>
   )
}

export default ListRePriceQuote;