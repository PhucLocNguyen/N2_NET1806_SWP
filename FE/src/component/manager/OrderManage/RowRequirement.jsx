import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
import {  getStatusCustomerByCode } from "../../orderCustomer/OrderCustomer";

import { FetchApiDesignById } from "../../../api/Requirements/FetchApiDesign";

function RowRequirement({ data }) {
  const [design, setDesign] = useState();
  const id = data.designId;

  useEffect(() => {
    const fetchApi = async () => {
      const respone = await FetchApiDesignById(id);
      setDesign(respone);
    };
    fetchApi();
  }, []);

  console.log(design);

  return (
    <div className="grid grid-cols-4 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3] cursor-pointer">
      <div className="flex items-center">
        <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">
          {data.requirementId}
        </h2>
      </div>
      {/* <div className="flex items-center">
               <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data.staff}</h2>
            </div> */}
      <div className="flex items-center">
        {/* <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data.status}</h2> */}
        <Chip
          label={getStatusCustomerByCode(data.status)}
          color={"warning"}
          variant="outlined"
          sx={{ fontSize: "14px", fontWeight: 400 }}
        />
      </div>
      <div className="flex items-center">
        <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">
          {data.createdDate}
        </h2>
      </div>
      <div className="flex items-center">
        <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">
          {design?.typeOfJewellery?.name}
        </h2>
      </div>
    </div>
  );
}

export default RowRequirement;