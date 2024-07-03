import { createContext, useEffect, useState } from "react";
import { PostPaymentApi } from "../../api/payment/PaymentApi";
import { FetchApiDesignById } from "../../api/Requirements/FetchApiDesign";
import useAuth from "../../hooks/useAuth";

export const summaryContext = createContext();
export function SummaryContext({children, requirementData, ChangeToggle, status, setStatus}) {
    const [total, setTotal] = useState("");
    const [designDetail, setDesignDetail] = useState({});
    const {UserId} = useAuth();
    const [requirementDetail, setRequirementDetail] = useState(requirementData);
    console.log(requirementData);

    async function payNow(moneyWillPay) {
        const paymentRequest = {
            "id": "string",
            "paymentContent": "Payment for order #" + requirementDetail.requirementId,
            "paymentCurrency": "VND",
            "paymentRefId": "string",
            "requiredAmount": moneyWillPay,
            "paymentLanguage": "EN",
            "merchantId": "MERCHANT123",
            "paymentDestinationId": "DEST123",
            "paymentStatus": "Completed",
            "paidAmount": moneyWillPay,
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
    useEffect(()=>{
        const masterGemstoneTotal = designDetail.masterGemstone!=null? designDetail.masterGemstone?.price : 0;
        const stonesTotal = designDetail.stone!=null? designDetail.stone?.price:0;
        const priceMaterial = designDetail.material!=null? designDetail.material?.price: 0;

        const totalMoney = priceMaterial*requirementDetail.weightOfMaterial+ requirementDetail.machiningFee+ masterGemstoneTotal+ stonesTotal;
        setTotal(totalMoney);  
       
    },[designDetail])
    return (<summaryContext.Provider value={{total, payNow,requirementDetail, designDetail, ChangeToggle, status,setStatus}}>
        {children}
    </summaryContext.Provider>  );
}
