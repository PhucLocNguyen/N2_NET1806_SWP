import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchApiDesignById } from '../../api/FetchApiDesign';
import ApiGetUserByRoleAndRequirement from '../../api/warranty/ApiGetUserInfoByRoleAndRequirement';
import Chip from "@mui/material/Chip";


function RowOrderSupportList({ data }) {
   const [design, setDesign] = useState()
   const [user, setUser] = useState()
   const id = data.designId;
   const roleId = 6;
   const requirementId = data.requirementId;

   const fetApiGetNameCustomer = async () => {
      const response = await ApiGetUserByRoleAndRequirement({ roleId, requirementId })
      setUser(response);
   }

   const fetchApi = async () => {
      const respone = await fetchApiDesignById(id);
      setDesign(respone);
   }

   useEffect(() => {
      fetchApi();
      fetApiGetNameCustomer();
   }, [])

   return (
      <>
         <Link to={`/staff/order-support/${data?.requirementId}`}>
            {/* Requirement rows */}
            <div className="grid grid-cols-4 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3] cursor-pointer">
               <div className="flex items-center">
                  <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data.requirementId}</h2>
               </div>
               <div className="flex items-center">
                  <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{user?.name}</h2>
               </div>
               <div className="flex items-center">
               <Chip
                    label={data.status=="-6"?"Design Reject need support": "Confirm price reject need support"}
                    color="warning"
                    variant="outlined"
                    sx={{ fontWeight: 700 }}
                  />
               </div>
               <div className="flex items-center">
                  <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{design?.typeOfJewellery?.name}</h2>
               </div>
            </div>
         </Link>
      </>
   )
}

export default RowOrderSupportList;