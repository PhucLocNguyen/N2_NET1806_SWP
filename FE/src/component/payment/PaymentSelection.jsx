import { useContext, useState, useEffect } from "react";
import CustomerConfirmation from "./CustomerConfirmation";
import CustomerDeposit from "./CustomerDeposit";
import ConfirmPriceQuoteSummary from "./ShowTotal/ConfirmPriceQuoteSummary";
import { summaryContext } from "./SummaryContext";

function PaymentSelection() {
    const { total, requirementDetail, designDetail , payNow} = useContext(summaryContext);
    const [status, setStatus] = useState(requirementDetail.status);
    const [title, setTitle] = useState("");

    useEffect(() => {
        switch (status) {
            case "-3":
                setTitle("Waiting for the next price quote");
                break;
            case "3":
                setTitle("Accept the price quote");
                break;
            case "4":
                setTitle("Deposit the order");
                break;
            default:
                setTitle("Pay the rest");
                break;
        }
    }, [status]);

    function SelectionRender({ setStatus, status, moneyWillPay }) {
        switch (status) {
            case "-3":
            case "3":
                return <CustomerConfirmation setStatus={setStatus} status={status} />;
            case "4":
                return <CustomerDeposit moneyWillPay={moneyWillPay}/>;
            default:
                return <div>{/* Add your default payment component here */}</div>;
        }
    }

    function ShowingTheTotal() {
        switch (status) {
            case "3":
                return <ConfirmPriceQuoteSummary />;
            case "4":
                return (<div>
                    <div className="flex justify-between py-2 border-b border-gray-300 font-semibold">
                <p className="">Total</p>
                <p className="">{Math.ceil(total)} <span className="">VND</span></p>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300 text-lg text-gray-900 font-semibold">
                <p className="">Deposit</p>
                <p className="">{Math.ceil(total/2)} <span className="">VND</span></p>
            </div>
                </div>)
            default:
                return (
                    <div className="flex justify-between py-2 border-b border-gray-300">
                        <p className="text-[20px]">Total</p>
                        <p className="text-[20px]">{total} <span className="">VND</span></p>
                    </div>
                );
        }
    }

    return (
        <div className="col-span-2 flex flex-col justify-center items-center">
            <div className="min-h-[350px] w-[500px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Summary:</h3>
                <div className="bg-gray-200 p-4 rounded-lg w-full px-3 mb-3 ">
                    <div className="flex justify-between py-2 border-b border-gray-300">
                        <p>Master Gemstone</p>
                        <p>{designDetail.masterGemstone?.price} <span className="">VND</span></p>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-300">
                        <p>Melee Stones</p>
                        <p>{designDetail.stone?.price} <span className="">VND</span></p>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-300 ">
                        <p>Material</p>
                        <p>{designDetail.material?.price * requirementDetail.weightOfMaterial} <span className="">VND</span></p>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-300 ">
                        <p>Machining Fee</p>
                        <p>{requirementDetail.machiningFee} <span className="">VND</span></p>
                    </div>
                    <ShowingTheTotal />
                </div>
                <SelectionRender setStatus={setStatus} status={status} moneyWillPay={Math.ceil(total/2)} />
            </div>
        </div>
    );
}

export default PaymentSelection;
