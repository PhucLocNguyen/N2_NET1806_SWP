import { useEffect } from "react";
import { useState } from "react";
import { FetchApiRequirementByIdSecure } from "../../api/Requirements/FetchApiRequirement";
import useAuth from "../../hooks/useAuth";
import formatVND from "../../utils/FormatCurrency";
import CustomerPayButton from "./CustomerPayButton";

function CustomerPay({
  title,
  designDetail,
  requirementDetail,
  total,
  status,
}) {
  const [getRequirementNew, setRequirementNew] = useState({});
  const {UserId} = useAuth();
  async function callNewDataRequirement(requirementId){
    const response = await FetchApiRequirementByIdSecure(
      requirementId,
      UserId
    );
    if (response != null) {
      setRequirementNew(response);
    }
  }
  useEffect(()=>{
    callNewDataRequirement(requirementDetail.requirementId);
  },[])
  console.log(getRequirementNew.status)
  function ReDesignSummary({ status }) {
   
    switch (getRequirementNew.status) {
      case "4":{
       
        return (
          <div>
            <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
              {designDetail.masterGemstone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Master Gemstone</p>
                  <p>{formatVND(getRequirementNew.masterGemStonePriceAtMoment)}</p>
                </div>
              ) : null}
              {designDetail.stone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Melee Stones</p>
                  <p>{formatVND(getRequirementNew.stonePriceAtMoment)}</p>
                </div>
              ) : null}
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Material</p>
                <p>
                  {formatVND(
                    getRequirementNew.materialPriceAtMoment *
                      getRequirementNew.weightOfMaterial
                  )}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Machining Fee</p>
                <p>{formatVND(getRequirementNew.machiningFee)}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <p className="text-[18px]">Total</p>
                <p className="text-[18px]">{formatVND(Math.ceil(getRequirementNew.totalMoney))}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                <p className="text-[20px]">Deposit 50%</p>
                <p className="text-[20px]">
                  {formatVND(Math.ceil(getRequirementNew.totalMoney / 2))} 
                </p>
              </div>
            </div>
          </div>
        );
        break;
      }
      case "10":{
       
        return (
          <div>
            <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
              {designDetail.masterGemstone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Master Gemstone</p>
                  <p>{formatVND(getRequirementNew.masterGemStonePriceAtMoment)}</p>
                </div>
              ) : null}
              {designDetail.stone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Melee Stones</p>
                  <p>{formatVND(getRequirementNew.stonePriceAtMoment)}</p>
                </div>
              ) : null}
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Material</p>
                <p>
                  {formatVND(
                    getRequirementNew.materialPriceAtMoment *
                      getRequirementNew.weightOfMaterial
                  )}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Machining Fee</p>
                <p>{formatVND(getRequirementNew.machiningFee)}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <p className="text-[20px]">Total</p>
                <p className="text-[20px]">{formatVND(Math.ceil(getRequirementNew.totalMoney))}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                <p className="text-[20px]">Deposit 50%</p>
                <p className="text-[20px]">
                  -{formatVND(Math.ceil(getRequirementNew.totalMoney / 2))}  
                </p>
              </div>
            </div>
            <div>
            <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                <p className="text-[20px]">Pay the rest</p>
                <p className="text-[20px]">
                  {formatVND(Math.ceil(getRequirementNew.totalMoney) - Math.ceil(getRequirementNew.totalMoney / 2))} 
                </p>
              </div>
            </div>
          </div>
        );
        break;
      }
  }
}
  return (
    <div className="col-span-2 flex flex-col justify-center items-center">
      <div className="min-h-[350px] w-[500px]">
        {(getRequirementNew?.design3D!==""&& getRequirementNew?.design3D!=null)?<img className="w-full object-contain h-[300px]" src={getRequirementNew?.design3D} alt="image of design 3D last product"/>:null}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Summary:</h3>
        <ReDesignSummary status={status} />
        <CustomerPayButton moneyWillPay={getRequirementNew.status=="10"?Math.ceil(getRequirementNew.totalMoney-Math.ceil(getRequirementNew.totalMoney/2)) : Math.ceil(getRequirementNew.totalMoney/2)} />
      </div>
    </div>
  );
}

export default CustomerPay;
