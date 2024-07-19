import { useEffect, useState } from "react";
import { FetchApiRequirementByIdSecure, FetchSummaryPriceByRequirementId } from "../../../api/Requirements/FetchApiRequirement";
import useAuth from "../../../hooks/useAuth";
import formatVND from "../../../utils/FormatCurrency";

function PaymentSummary({requirementDetail, designDetail}) {
    
    return (
    <div>
        <SummaryShow requirementDetail={requirementDetail} designDetail={designDetail}/>
    </div> );
}

function SummaryShow({requirementDetail, designDetail}){
    const {UserId} = useAuth();
    const [getSummary, setSummary] = useState({});
    const [requirementNew, setRequirementNew]  =useState({...requirementDetail});
    async function callNewDataRequirement(requirementId){
        const response = await FetchApiRequirementByIdSecure(
          requirementId,
          UserId
        );
        if (response != null) {
            setRequirementNew(response);
          }
          const summaryPrice = await FetchSummaryPriceByRequirementId(requirementId);
          setSummary(summaryPrice);
        }
        useEffect(()=>{
            callNewDataRequirement(requirementDetail.requirementId);
          },[]) 

        switch(requirementDetail.status){
            case "4":
                return (<div>
                <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
                  {designDetail.masterGemstone != null ? (
                    <div className="flex justify-between py-2 border-b border-gray-300">
                      <p>Master Gemstone</p>
                      <p>{formatVND(getSummary.masterGemStonePriceAtMomentAnon)}</p>
                    </div>
                  ) : null}
                  {designDetail.stone != null ? (
                    <div className="flex justify-between py-2 border-b border-gray-300">
                      <p>Melee Stones</p>
                      <p>{formatVND(getSummary.stonePriceAtMomentAnon)}</p>
                    </div>
                  ) : null}
                  <div className="flex justify-between py-2 border-b border-gray-300 ">
                    <p>Material</p>
                    <p>
                      {formatVND(
                        getSummary.materialPriceAtMomentAnon
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300 ">
                    <p>Machining Fee</p>
                    <p>{formatVND(getSummary.machiningFeeAnon)}</p>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <p className="text-[18px]">Total</p>
                    <p className="text-[18px]">{formatVND(getSummary.totalMoneyAnon)}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                    <p className="text-[20px]">Deposit 50%</p>
                    <p className="text-[20px]">
                      {formatVND(getSummary.deposit)}
                    </p>
                  </div>
                </div>
              </div>
            );
            break;
          case "10":{
           
            return (
              <div>
                <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
                  {designDetail.masterGemstone != null ? (
                    <div className="flex justify-between py-2 border-b border-gray-300">
                      <p>Master Gemstone</p>
                      <p>{formatVND(getSummary.masterGemStonePriceAtMomentAnon)}</p>
                    </div>
                  ) : null}
                  {designDetail.stone != null ? (
                    <div className="flex justify-between py-2 border-b border-gray-300">
                      <p>Melee Stones</p>
                      <p>{formatVND(getSummary.stonePriceAtMomentAnon)}</p>
                    </div>
                  ) : null}
                  <div className="flex justify-between py-2 border-b border-gray-300 ">
                    <p>Material</p>
                    <p>
                      {formatVND(
                        getSummary.materialPriceAtMomentAnon
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300 ">
                    <p>Machining Fee</p>
                    <p>{formatVND(getSummary.machiningFeeAnon)}</p>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <p className="text-[20px]">Total</p>
                    <p className="text-[20px]">{formatVND(getSummary.totalMoneyAnon)}</p>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                    <p className="text-[20px]">Deposit 50%</p>
                    <p className="text-[20px]">
                      -{formatVND(getSummary.deposit)}  
                    </p>
                  </div>
                </div>
                <div>
                <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                    <p className="text-[20px]">Pay the rest</p>
                    <p className="text-[20px]">
                      {formatVND(getSummary.payTheRest)} 
                    </p>
                  </div>
                </div>
              </div>
            );
            break;
          }
        }

       
    
}
export default PaymentSummary;