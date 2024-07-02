import WatchLaterIcon from "@mui/icons-material/WatchLater";
import formatVND from "../../utils/FormatCurrency";
function CustomerWaiting({
  title,
  designDetail,
  requirementDetail,
  total,
  status,
}) {
  function ShowElementBasedStatus({ status, designDetail, requirementDetail }) {
    switch (status) {
      case "-3":
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
                  {formatVND(designDetail.material?.price *requirementDetail.weightOfMaterial)}
                 
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
      case "-7":
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
        <ShowElementBasedStatus
          requirementDetail={requirementDetail}
          designDetail={designDetail}
          status={status}
        />
        <div className="border px-6 py-6">
          <div className="text-center mb-2">
            <WatchLaterIcon color="warning" sx={{ fontSize: "36px" }} />
          </div>
          <h3 className="text-center text-lg">
            {status != -7
              ? "Please wait for manager to quote the price again"
              : "Please wait for design staff to redraw the sketch again"}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CustomerWaiting;
