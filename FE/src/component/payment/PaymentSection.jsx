import PaymentConfirm from "./PaymentConfirm";
import { SummaryContext } from "./SummaryContext";

function PaymentSection({requirementDetail, ChangeToggle}) {
    
    return ( 
    <SummaryContext requirementData={requirementDetail} ChangeToggle={ChangeToggle}>
        <PaymentConfirm/>
    </SummaryContext>

     );
}

export default PaymentSection;