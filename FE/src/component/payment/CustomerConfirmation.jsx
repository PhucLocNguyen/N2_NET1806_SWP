import { useState } from "react";
import { PutApiRequirement } from "../../api/Requirements/PutApiRequirement";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import formatVND from "../../utils/FormatCurrency";
function CustomerConfirmation({
  setStatus,
  status,
  title,
  designDetail,
  requirementDetail,
  total,
}) {
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
      const updateStatusRequirement = await PutApiRequirement({
        ...requirementDetail,
        status: "4",
        masterGemStonePriceAtMoment:
          designDetail.masterGemstone != null
            ? designDetail.masterGemstone?.price
            : 0,
        materialPriceAtMoment: designDetail.material?.price,
        stonePriceAtMoment: 
          designDetail.stone != null ? designDetail.stone?.price : 0,
        totalMoney: total,
      });
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
                    {formatVND(designDetail.masterGemstone?.price)}
                  </p>
                </div>
              ):null}
              {designDetail.stone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Melee Stones</p>
                  <p>
                    {formatVND(designDetail.stone?.price)}
                  </p>
                </div>
              ):null}
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Material</p>
                <p>
                  {formatVND(designDetail.material?.price *
                    requirementDetail.weightOfMaterial)}
                 
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Machining Fee</p>
                <p>
                  {formatVND(requirementDetail.machiningFee)}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <p className="text-[20px]">Total</p>
                <p className="text-[20px]">
                  {formatVND(Math.ceil(total))}
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
          >
            Accept
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default CustomerConfirmation;
