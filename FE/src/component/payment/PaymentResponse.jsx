import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyPaymentApi } from "../../api/payment/PaymentApi";
import { FetchApiRequirementById } from "../../api/Requirements/FetchApiRequirement";
import { PutApiRequirement } from "../../api/Requirements/PutApiRequirement";
import Lottie from "lottie-react";
import iconSuccess from "../../assets/icon/iconSuccess.json";
import iconFailed from "../../assets/icon/iconFailed.json";
import { CustomButton } from "../home/Home";

function PaymentResponse() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const location = useLocation();
  const [requirementId, setRequirementId] = useState(0);
  const [hasVerified, setHasVerified] = useState(false); // Add this line

  async function verifyPayment(queryString) {
    const verifyApi = await VerifyPaymentApi(queryString);
    const requirementObject = await FetchApiRequirementById(verifyApi.requirementId);
    if (!verifyApi.isFailed) {
      setStatus(true);
      if(requirementObject.status == "4") {
        PutApiRequirement({...requirementObject, status: "5"}, "Successful", "Deposit Failed");
      } 
      if(requirementObject.status =="10"){
        PutApiRequirement({...requirementObject, status: "11"}, "Successful", "Pay the rest Failed");
      }
    } else {
      setStatus(false);
    }
    setRequirementId(verifyApi.requirementId);
  }

  useEffect(() => {
    if (!hasVerified) { // Add this condition
      const searchParams = new URLSearchParams(location.search);
      const queryString = searchParams.toString();
      verifyPayment(queryString);
      setHasVerified(true); // Set the verification flag to true
    }
  }, [location.search, hasVerified]); // Include hasVerified as a dependency

  function moveToOrder() {
    navigate(`/my-order/${requirementId}`, { replace: true });
  }

  return (
    <div className="w-screen flex justify-center h-screen relative">
      {status ? (
        <div className="bg-[#fff] rounded-lg px-10 shadow-[0_5px_15px_rgba(0,0,0,0.35)] absolute -translate-y-1/2 top-1/2 z-10 w-[768px] max-w-[100%] pb-10">
          <div className="">
            <div className="iconNotification">
              <Lottie animationData={iconSuccess} style={{ width: "100%", height: "350px" }} loop={false} />
            </div>
            <h3 className="text-[32px] text-center">Congratulations,</h3>
            <h3 className="text-[32px] text-center mb-12">Your payment has been sent successfully</h3>
            <CustomButton
              variant="contained"
              sx={{
                color: "#fff",
                bgcolor: "#000",
                letterSpacing: 4,
                padding: "0.7rem 2.375rem",
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: "1.5rem",
                display: "flex",
                justifyContent: "justify-center",
                width: "100%",
              }}
              onClick={moveToOrder}
            >
              Go to your order
            </CustomButton>
          </div>
        </div>
      ) : (
        <div className="bg-[#fff] rounded-lg px-10 shadow-[0_5px_15px_rgba(0,0,0,0.35)] absolute -translate-y-1/2 top-1/2 z-10 w-[768px] max-w-[100%] pb-10">
          <div className="">
            <div className="iconNotification">
              <Lottie animationData={iconFailed} style={{ width: "100%", height: "320px" }} loop={false} />
            </div>
            <h3 className="text-[32px] text-center mb-6">Your payment was failed</h3>
            <CustomButton
              variant="contained"
              sx={{
                color: "#fff",
                bgcolor: "#000",
                letterSpacing: 4,
                padding: "0.7rem 2.375rem",
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: "1.5rem",
                display: "flex",
                justifyContent: "justify-center",
                width: "100%",
              }}
              onClick={moveToOrder}
            >
              Go to your order
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentResponse;
