import { useEffect, useState } from "react";
import { PutApiRequirement } from "../../api/Requirements/PutApiRequirement";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import formatVND from "../../utils/FormatCurrency";
import { FetchSummaryPriceByRequirementId } from "../../api/Requirements/FetchApiRequirement";
import { CircularProgress } from "@mui/material";
import { PostApiConfirmPrice } from "../../api/Requirements/PostRequirement";
function CustomerConfirmation({
  setStatus,
  status,
  title,
  designDetail,
  requirementDetail,
}) {
  const [getSummary, setSummary] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const callSummary = async (requirementId)=>{
    const response = await FetchSummaryPriceByRequirementId(requirementId);
    setSummary(response);
    setIsLoading(false);
  }
  useEffect(()=>{
    callSummary(requirementDetail.requirementId);
  },[]);
  const declineButton = async () => {
    if (status == "3") {
      const updateStatusRequirement = await PutApiRequirement({
        ...requirementDetail,
        status: "-2",
      });
      if (updateStatusRequirement != null) {
        toast.success("Decline the price quote successful");
        setStatus("-2");
      }
    }
    if (status == "7") {
      const updateStatusRequirement = await PutApiRequirement({
        ...requirementDetail,
        status: "-7",
      });
      if (updateStatusRequirement != null) {
        toast.success("Decline the price quote successful");
        setStatus("-7");
      }
    }
  };
  const acceptButton = async () => {
    if (status == "3") {
      const updateStatusRequirement = await PostApiConfirmPrice(requirementDetail.requirementId);
      if (updateStatusRequirement != null) {
        toast.success("Accept the price quote successful");
        setStatus("4");
      }
    }
    if (status == "7") {
      const updateStatusRequirement = await PutApiRequirement({
        ...requirementDetail,
        status: "8",
      });
      if (updateStatusRequirement != null) {
        toast.success("Accept the design sketch successful");
        setStatus("8");
      }
    }
  };
  function RenderConfirmInformation({
    status,
    designDetail,
    requirementDetail,
  }) {
    switch (status) {
      case "3":
        
       
        console.log(getSummary);
        if(isLoading){
          return <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
        }
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Summary:
            </h3>
            <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
              {designDetail.masterGemstone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Master Gemstone</p>
                  <p>
                    {formatVND(getSummary.masterGemStonePriceAtMomentAnon)}
                  </p>
                </div>
              ):null}
              {designDetail.stone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Melee Stones</p>
                  <p>
                    {formatVND(getSummary.stonePriceAtMomentAnon)}
                  </p>
                </div>
              ):null}
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Material</p>
                <p>
                  {formatVND(getSummary.materialPriceAtMomentAnon)}
                 
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Machining Fee</p>
                <p>
                  {formatVND(getSummary.machiningFeeAnon)}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <p className="text-[20px]">Total</p>
                <p className="text-[20px]">
                  {formatVND(getSummary.totalMoneyAnon)}
                </p>
              </div>
            </div>
          </div>
        );
      case "7":
        return (
          <div className="mb-6">
            {requirementDetail.design3D == null ? (
          <div className="border px-6 py-6">
            <div className="text-center mb-2">
              <WatchLaterIcon color="warning" sx={{ fontSize: "36px" }} />
            </div>
            <h3 className="text-center text-lg">
              Please wait for design staff to draw the design based on your
              requirement
            </h3>
          </div>
        ) : (
          <div className="border">
            <img
              src={requirementDetail.design3D}
              alt={
                "Image of design in requirement #" +
                requirementDetail.requirementId
              }
            />
          </div>
        )}
          </div>
        );
    }
  }

  return (
    <div className="col-span-2 flex flex-col justify-center items-center">
      <div className="min-h-[350px] w-[500px]">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <RenderConfirmInformation
          requirementDetail={requirementDetail}
          designDetail={designDetail}
          status={status}
        />
        <motion.div className="grid grid-cols-2 gap-4">
          <button
            className="py-3 px-6 w-full bg-red-500 text-white hover:bg-red-700 rounded-md transition-all ease-linear"
            onClick={declineButton}
          >
            Decline
          </button>
          <button
            className="py-3 px-6 w-full bg-green-500 text-white hover:bg-green-700 rounded-md transition-all ease-linear"
            onClick={acceptButton}
          >Accept
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default CustomerConfirmation;