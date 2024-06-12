import { TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useContext, useState } from "react";
import { CustomButton } from "../../home/Home";
import { multiStepContext } from "./StepContext";
function ThirdStep() {
    const { currentStep, setCurrentStep, requirementData, setRequirementData } =
    useContext(multiStepContext);
    const [design, setDesign] = useState(0);
    const [masterGemstone, setMasterGemstone] = useState({});
    const [stones, setStones] = useState({});
    const [data, setData]= useState({customerNote:''});
    const SubmitRequirement = ()=>{
        // setRequirementData({...data,...requirementData});
    }
    console.log(requirementData);

    const HandleChangeData = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };
    useEffect(()=>{

    },[])
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            func(...args);
          }, delay);
        };
      };
      
      const debouncedOnChange = useCallback(debounce(HandleChangeData, 1000), [
        HandleChangeData,
      ]);
    return ( <><motion.div initial={{ opacity: 0, x:50 }} whileInView={{opacity:1, x:0}} className="mx-16">
        <div className="mt-3">
        <h2 className="text-[24px] mb-1 mt-3">Your requirement including:</h2>
        <div className="border-b pb-3 px-3 ">
        <h3 className="text-[20px] mt-3">Customization based on design: </h3>
        <ul  className="px-3">
            <li>Material for jewerlly: </li>
            <li>Size for jwerlly:{requirementData.size}</li>
            <li>Type of jewerly</li>
        </ul>
        </div>
        <div className="border-b pb-3  px-3">
        <h3 className="text-[20px] mb-1 mt-3">MasterGemstone: </h3>
        <ul  className="px-3"> 
            <li>Kind: </li>
            <li>Size: </li>
            <li>Shape:</li>
        </ul>
        </div>
        <div className="pb-3 px-3">
        <h3 className="text-[20px] mb-1 mt-3">Stones: </h3>
        <ul className="px-3">
            <li>Kind: </li>
            <li>Size: </li>
            <li>Quantity:</li>
        </ul>
        </div>

        <div className="pb-3 px-3">
        <label htmlFor="message" className="text-[20px] mb-1 mt-3">Notes: </label>
            <textarea id="message" name="customerNote" onChange={debouncedOnChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
        </div>
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
          display:"flex",
          justifyContent:"justify-center",
          width:"100%"
        }}
        onClick={SubmitRequirement}
      >
        Submit
      </CustomButton>

        </motion.div></> );
}

export default ThirdStep;