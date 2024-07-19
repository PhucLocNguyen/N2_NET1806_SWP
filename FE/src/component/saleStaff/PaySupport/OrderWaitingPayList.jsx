import { Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { FetchRequirementWaitingPay } from "../../../api/Requirements/FetchApiRequirement";
import RowRequirement from "./RowRequirement";

function OrderWaitingPayList() {
  const pageSize = 6;
  // Pagination
  const [dataRequirement, setDataRequirement] = useState([]);
  const [dataSize, setDataSize] = useState(0);
  const [page, setPage] = useState(1);
  const [isUpdated, setIsUpdated] = useState(false);
  const handleChange = (event, value) => {
    setPage(value);
  };
  function handleUpdateData(){
    setIsUpdated((prev)=>!prev);
 }
  const fetchApiOrderWaiting = async () => {
    const response = await FetchRequirementWaitingPay({page,pageSize});
    setDataRequirement([...response]);
  };

  const fetchApiOrderWaitingTotal = async () => {
    const response = await FetchRequirementWaitingPay({});
    setDataSize(response?.length);
  };

  useEffect(() => {
    fetchApiOrderWaiting();
    fetchApiOrderWaitingTotal();
    console.log("Check recall");
  }, [page, isUpdated]);

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

               {dataRequirement?.map((item, index) => {

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
  );
}

export default OrderWaitingPayList;
