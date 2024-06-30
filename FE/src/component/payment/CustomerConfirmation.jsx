import { useContext, useState } from "react";
import { PutApiRequirement } from "../../api/Requirements/PutApiRequirement";
import { toast } from 'react-toastify'
import { summaryContext } from "./SummaryContext";
import {motion} from "framer-motion"
function CustomerConfirmation({setStatus,status}) {
  console.log(setStatus);
    const {requirementDetail} = useContext(summaryContext);
    const [isClicked, setIsClicked] = useState(false);
    const declineButton = async()=>{
const updateStatusRequirement = await PutApiRequirement({...requirementDetail, status:-3});
        setIsClicked(true);
        if(updateStatusRequirement!=null){
            toast.success("Decline the price quote successful");
            setStatus("-3");
        }
    }
    const acceptButton = async()=>{
        const updateStatusRequirement = await PutApiRequirement({...requirementDetail, status:4});
                setIsClicked(true);
                if(updateStatusRequirement!=null){
                    toast.success("Accept the price quote successful");
            setStatus("4");
                }
            }
            if(requirementDetail.status!=-3){

return ( !isClicked?<motion.div className="grid grid-cols-2 gap-4">
        <button className="py-3 px-6 w-full bg-red-500 text-white hover:bg-red-700 rounded-md transition-all ease-linear" onClick={declineButton} >Decline</button>
        <button className="py-3 px-6 w-full bg-green-500 text-white hover:bg-green-700 rounded-md transition-all ease-linear" onClick={acceptButton}>Accept</button>
    </motion.div> :<motion.div  initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} class="bg-white p-6 w-full border shadow-lg rounded-lg text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">Confirmation Successfully</h2>
  </motion.div>);
            }else{
return <div class="bg-white p-6 w-full border shadow-lg rounded-lg text-center">
<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
</svg>
<h2 class="text-2xl font-semibold text-gray-800 mb-2">Confirmation Successfully</h2>
</div>
            }
}

export default CustomerConfirmation;