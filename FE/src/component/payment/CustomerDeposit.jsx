import { useContext } from "react";
import { summaryContext } from "./SummaryContext";

function CustomerDeposit({moneyWillPay, requirementData}) {
    const { total, requirementDetail, designDetail , payNow} = useContext(summaryContext);
    console.log(requirementDetail);
    return ( <button onClick={(e)=>
        {
        payNow(moneyWillPay);
    }} class="mt-6 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all">
    Pay Deposit
</button> );
}

export default CustomerDeposit;