import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { VerifyPaymentApi } from "../../api/payment/PaymentApi";
import { FetchApiRequirementById } from "../../api/Requirements/FetchApiRequirement";
import { PutApiRequirement } from "../../api/Requirements/PutApiRequirement";

function PaymentResponse() {
  const [status, setStatus] = useState(false);
  const location = useLocation();
  const [requirementId, setRequirementId] = useState(0);
  async function verifyPayment(queryString) {
    const verifyApi = await VerifyPaymentApi(queryString);
    const requirementObject = await FetchApiRequirementById(verifyApi.requirementId);
    console.log(verifyApi);
    if (!verifyApi.isFailed) {
      setStatus(true);
      PutApiRequirement({...requirementObject,status:"5"},"Deposit Successful", "Deposit Failed")
    } else {
      setStatus(false);
    }
    setRequirementId( verifyApi.requirementId);
    
  }
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryString = searchParams.toString();
    verifyPayment(queryString);
  }, [location.search]);
  
  return (
    <div>
      <h3>Payment Response </h3>
      {status?<h3>Success payment</h3>:<h3>Failed Payment</h3>}
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">Price Quote Submitted Successfully</h2>
    <p class="text-gray-600 mb-4">Your price quote has been successfully submitted by the manager.</p>
    <a href={"/my-order/"+requirementId} class="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200">Go to Dashboard</a>
  </div>
    </div>
  );
}

export default PaymentResponse;
