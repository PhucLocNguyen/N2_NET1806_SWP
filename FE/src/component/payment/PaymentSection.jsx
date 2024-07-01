import PaymentConfirm from "./PaymentConfirm";
import { SummaryContext } from "./SummaryContext";

function PaymentSection({requirementDetail, ChangeToggle, status, setStatus}) {
    
    return ( 
    <SummaryContext requirementData={requirementDetail} ChangeToggle={ChangeToggle} status={status} setStatus={setStatus}>
        <PaymentConfirm/>
    </SummaryContext>

     );
}

export default PaymentSection;