import { useEffect, useState } from "react";

import { getStatusCustomerByCode , getStatusClass} from "../../orderCustomer/OrderCustomer";

import { FetchApiDesignById } from "../../../api/Requirements/FetchApiDesign";
import ViewOrderDetailPopup from "./ViewOrderDetail";

function RowRequirement({ data, handleUpdateData }) {
  const [design, setDesign] = useState();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const id = data.designId;
  useEffect(() => {
    const fetchApi = async () => {
      const respone = await FetchApiDesignById(id);
      setDesign(respone);
    };
    fetchApi();
  }, []);

  const handleOpenPopup = () => {
    setIsOpenPopup(true);
  };
  const togglePopup = () => {
    setIsOpenPopup((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={handleOpenPopup}
        className="grid grid-cols-4 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3] cursor-pointer"
      >
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
          <div
            className={"rounded-full px-2 "+ getStatusClass(getStatusCustomerByCode(data.status))}
            sx={{ fontSize: "14px", fontWeight: 400 }}
          >
            <p>{getStatusCustomerByCode(data.status)}</p>
            </div>
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
      {isOpenPopup && (
        <ViewOrderDetailPopup
          requirement={data}
          design={design}
          togglePopup={togglePopup}
          handleUpdateData={handleUpdateData}
        />
      )}
    </>
  );
}

export default RowRequirement;
