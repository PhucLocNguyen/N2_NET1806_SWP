import { useContext } from "react";
import { summaryContext } from "./SummaryContext";

function CustomerPayButton() {
    const { total, requirementDetail, designDetail , payNow} = useContext(summaryContext);
    
    return ( <button onClick={(e)=>
        {
        payNow();
    }} className="mt-6 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all">
    Pay Now
</button> );
}

export default CustomerPayButton;