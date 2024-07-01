import WatchLaterIcon from "@mui/icons-material/WatchLater";
function CustomerWorkingDesignStaff({
  title,
  requirementDetail,
  status,
}) {
  if (status == "5") {
    return (
      <div className="col-span-2 flex flex-col justify-center items-center">
        <div className="min-h-[350px] w-[500px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="border px-6 py-6">
            <div className="text-center mb-2">
              <WatchLaterIcon color="warning" sx={{ fontSize: "36px" }} />
            </div>
            <h3 className="text-center text-lg">
              Please wait for design staff take your order to working
            </h3>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="col-span-2 flex flex-col justify-center items-center">
      <div className="min-h-[350px] w-[500px]">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Design draw upload:
        </h3>
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
    </div>
  );
}

export default CustomerWorkingDesignStaff;
