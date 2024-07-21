import { createContext, useEffect, useState } from "react";
import { PostPaymentApi } from "../../api/payment/PaymentApi";
import { FetchApiDesignById } from "../../api/Requirements/FetchApiDesign";
import useAuth from "../../hooks/useAuth";

export const summaryContext = createContext();
export function SummaryContext({children, requirementData, ChangeToggle, status, setStatus}) {
    const [designDetail, setDesignDetail] = useState({});
    const {UserId} = useAuth();
    const [requirementDetail, setRequirementDetail] = useState(requirementData);

    async function payNow() {
        const paymentRequest = {
            "id": "string",
            "paymentContent": "Payment for order #" + requirementDetail.requirementId,
            "paymentCurrency": "VND",
            "paymentRefId": "string",
            "paymentLanguage": "EN",
            "merchantId": "MERCHANT123",
            "paymentDestinationId": "DEST123",
            "paymentStatus": "Completed",
            "userId": Number(UserId),
            "requirementId": requirementDetail.requirementId
        };
    
        try {
            const responseUrl = await PostPaymentApi(paymentRequest);
            if (responseUrl) {
                console.log(responseUrl);
                window.location.href = responseUrl;
            } else {
                console.error('Failed to get response URL.');
            }
        } catch (error) {
            console.error('Payment processing failed:', error);
        }
    }
    
    async function loadData(){
        const getDesignDetail = await FetchApiDesignById(requirementDetail.designId);
        setDesignDetail(getDesignDetail);
              
    }
    useEffect(()=>{
        loadData();
    },[])
   
    return (<summaryContext.Provider value={{ payNow,requirementDetail, designDetail, ChangeToggle, status,setStatus}}>
        {children}
    </summaryContext.Provider>  );
}
