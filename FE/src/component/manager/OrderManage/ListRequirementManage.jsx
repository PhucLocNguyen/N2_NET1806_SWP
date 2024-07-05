import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import RowRequirement from "./RowRequirement"
import ApiListRequirement from '../../../api/manager/ListRequirement';

function ListRequirement() {
   const pageSize = 6;
   const [page, setPage] = useState(1);
   const [data, setData] = useState([]);
   const [dataSize, setDataSize] = useState(0);
   const [isUpdated, setIsUpdated] = useState(false);
   function handleUpdateData(){
      setIsUpdated((prev)=>!prev);
   }
   const handleChange = (event, value) => {
      setPage(value);
   };

   useEffect(() => {
      try {
         const fetchApi = async () => {
            const respone = await ApiListRequirement({pageSize, page });
            setData(respone);
         }
         const fetchApiTotal = async () => {
            const response = await ApiListRequirement({});
            setDataSize(response?.length)
         }
         fetchApi();
         fetchApiTotal();

      } catch (error) {
         setData([])
      }

   }, [page, isUpdated])
console.log(data);
   return (

      <div className="min-h-[100vh] py-[3rem] px-[3rem] bg-[#f7f9fc]">
         <div className="w-[100%] min-h-[550px]">
            <div className="rounded-[30px] border-[1px] border-solid border-[#e9eaf3] bg-[white]">

               <div className="py-[1.75rem] px-[2.25rem] flex items-center">
                  <h2 className="font-bold text-[1.5rem] leading-[1.125em]">All Requirement</h2>
               </div>

               {/* Header row */}
               <div className="bg-[#f7f9fc] grid grid-cols-4 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3]">
                  <div className="flex items-center">
                     <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Order ID</h2>
                  </div>
                  {/* <div className="flex items-center">
                     <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Staff Name</h2>
                  </div> */}
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
                     <RowRequirement key={index} data={item} handleUpdateData={handleUpdateData}/>
                  )
               })}

            </div>

         </div>
         <div className='flex justify-center items-center'>
            <Stack>
               <Pagination count={(Math.ceil(dataSize / 6)) || 0} page={page} onChange={handleChange} />
            </Stack>
         </div>
      </div>

   )
}

export default ListRequirement