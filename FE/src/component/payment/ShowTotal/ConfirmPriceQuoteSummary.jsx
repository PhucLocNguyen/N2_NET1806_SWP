import { useContext } from "react";
import { summaryContext } from "../SummaryContext";

function ConfirmPriceQuoteSummary() {
    const {total} = useContext(summaryContext);
    return ( <div className="flex justify-between text-white py-3">
    <p className="text-[20px]">Total</p>
    <p className="text-[20px]">{total} <span className="">VND</span></p>
</div> );
}

export default ConfirmPriceQuoteSummary;