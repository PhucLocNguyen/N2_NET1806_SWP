import formatVND from "../../utils/FormatCurrency";
import CustomerPayButton from "./CustomerPayButton";

function CustomerPay({
  title,
  designDetail,
  requirementDetail,
  total,
  status,
}) {
  function ReDesignSummary({ status }) {
    switch (status) {
      case "4":
        return (
          <div>
            <p className="line-clamp-2">price: {requirementDetail.status > 3 ? formatVND(requirementDetail.materialPriceAtMoment) : formatVND(designDetail.material?.price)}  / mace</p>
            <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
              {designDetail.masterGemstone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Master Gemstone</p>
                  <p>{formatVND(requirementDetail.masterGemStonePriceAtMoment)}</p>
                </div>
              ) : null}
              {designDetail.stone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Melee Stones</p>
                  <p>{formatVND(requirementDetail.stonePriceAtMoment)}</p>
                </div>
              ) : null}
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Material</p>
                <p>
                  {formatVND(
                    requirementDetail.materialPriceAtMoment *
                      requirementDetail.weightOfMaterial
                  )}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Machining Fee</p>
                <p>{formatVND(requirementDetail.machiningFee)}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <p className="text-[18px]">Total</p>
                <p className="text-[18px]">{formatVND(Math.ceil(total))}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                <p className="text-[20px]">Deposit 50%</p>
                <p className="text-[20px]">
                  {formatVND(Math.ceil(total / 2))} 
                </p>
              </div>
            </div>
          </div>
        );
        break;
      default:
        return (
          <div>
            <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
              {designDetail.masterGemstone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Master Gemstone</p>
                  <p>{requirementDetail.status>4? formatVND(requirementDetail.masterGemStonePriceAtMoment): formatVND(designDetail.masterGemstone?.price)}</p>
                </div>
              ) : null}
              {designDetail.stone != null ? (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <p>Melee Stones</p>
                  <p>{requirementDetail.status>4? formatVND(requirementDetail.stonePriceAtMoment): formatVND(designDetail.stone?.price)}</p>
                </div>
              ) : null}
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Material</p>
                <p>
                {requirementDetail.status>4? formatVND(requirementDetail.materialPriceAtMoment * requirementDetail.weightOfMaterial): formatVND(designDetail.material?.price * requirementDetail.weightOfMaterial)}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 ">
                <p>Machining Fee</p>
                <p>{formatVND(requirementDetail.machiningFee)}</p>
              </div>  
              <div className="flex justify-between py-2 border-b border-gray-300">
                <p className="text-[18px]">Total</p>
                <p className="text-[18px]">
                  {formatVND(Math.ceil(total))}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                <p className="text-[18px]">Deposit 50%</p>
                <p className="text-[18px]">
                  -{formatVND(Math.ceil(total / 2))} 
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                <p className="text-[20px]">Pay the rest</p>
                <p className="text-[20px]">
                  {formatVND(Math.ceil(total) - Math.ceil(total / 2))} 
                </p>
              </div>
            </div>
          </div>
        );
        break;
    }
  }
  return (
    <div className="col-span-2 flex flex-col justify-center items-center">
      <div className="min-h-[350px] w-[500px]">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Summary:</h3>
        <ReDesignSummary status={status} />
        <CustomerPayButton moneyWillPay={Math.abs(Math.ceil(total) - Math.ceil(total / 2))} />
      </div>
    </div>
  );
}

export default CustomerPay;
