import { useCallback, useContext, useEffect, useState } from "react";
import { multiStepContext } from "./StepContext";
import { CustomButton } from "../../home/Home";
import {motion} from "framer-motion";
import "./style.css";
import { IconButton, TextField } from "@mui/material";
function FirstStep({ handleCompleteStep }) {
  const { currentStep, setCurrentStep, requirementData, setRequirementData } =
    useContext(multiStepContext);
  const [isAllowed, setAllowed] = useState(false);
  const [data, setData] = useState({
    material: requirementData.material,
    size: requirementData.size,
  });
  let from = 1;
  let to = 20;
  useEffect(() => {
    var output = true;
    Object.entries(data).forEach(([key, value]) => {
      if (value == -1) {
        output = false;
        setAllowed(false);
        return;
      }
      if(data.material==null){
        output = false;
        setAllowed(false);
        return;
      }
      if(key==="size" && !(value>=from && value<=to))
      {
        output = false;
        setAllowed(false);
        return;
      }
    });
    if (output) {
      setAllowed(true)};
  }, [data]);
  function NextStep(){
    if(isAllowed){
      handleCompleteStep(currentStep-1);
      setCurrentStep(currentStep+1);
      setRequirementData({...requirementData,...data })
    }
  }
  const HandleChangeData = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
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
  const debouncedOnChange = useCallback(debounce(HandleChangeData, 1000), [HandleChangeData]);
  return (
    <motion.div initial={{ opacity: 0, x:50 }} whileInView={{opacity:1, x:0}} className="mx-16">
      <h2 className="text-[24px] mb-1 mt-3">Matterial </h2>
      <div className="grid grid-cols-5 gap-x-4 mb-[30px]">
            <label htmlFor="material-1" className="rounded-md border border-[#646464] cursor-pointer" >
                <div className="shadow-lg relative h-[100px]">
                <input type="radio" name="material" id="material-1" value="1" className="hidden peer" onChange={debouncedOnChange} />
                <span className="w-[20px] h-[20px] mb-[50px] top-1 left-1 inline-block border-[2px] border-[#e3e3e3] rounded-full relative z-10 peer-checked:bg-primary checkedBoxFormat peer-checked:border-[#3057d5] peer-checked:scale-110 peer-checked:bg-[#3057d5] peer-checked:before:opacity-100"></span>
                <img src="https://e7.pngegg.com/pngimages/469/594/png-clipart-two-1000g-gold-bars-gold-bar-bullion-gold-bar-usb-flash-drive-gold.png" className="rounded-md w-full absolute top-0 h-[80px]"/>
                <p className="text-center">Vàng</p>
                </div>
            </label>
            <label htmlFor="material-2" className="rounded-md border border-[#646464] cursor-pointer">
                <div className="shadow-lg relative h-[100px]">
                <input type="radio" name="material" id="material-2" value="2" className="hidden peer" onChange={debouncedOnChange} />
                <span className="w-[20px] h-[20px] mb-[50px] top-1 left-1 inline-block border-[2px] border-[#e3e3e3] rounded-full relative z-10 peer-checked:bg-primary checkedBoxFormat peer-checked:border-[#3057d5] peer-checked:scale-110 peer-checked:bg-[#3057d5] peer-checked:before:opacity-100"></span>
                <img src="https://cdn.pixabay.com/photo/2021/05/12/06/30/silver-bar-6247498_960_720.jpg" className="rounded-md w-full absolute top-0 h-[80px]"/>
                <p className="text-center">Bạc</p>
                </div>
            </label>
            <label htmlFor="material-3" className="rounded-md border border-[#646464] cursor-pointer">
                <div className="shadow-lg relative h-[100px]">
                <input type="radio" name="material" id="material-3" value="3" className="hidden peer" onChange={debouncedOnChange} />
                <span className="w-[20px] h-[20px] mb-[50px] top-1 left-1 inline-block border-[2px] border-[#e3e3e3] rounded-full relative z-10 peer-checked:bg-primary checkedBoxFormat peer-checked:border-[#3057d5] peer-checked:scale-110 peer-checked:bg-[#3057d5] peer-checked:before:opacity-100"></span>
                <img src="https://atlas-content-cdn.pixelsquid.com/stock-images/copper-ingots-wrought-iron-3ARoVB0-600.jpg" className="rounded-md w-full absolute top-0 h-[80px]"/>
                <p className="text-center">Đồng</p>
                </div>
            </label>
      </div>
      <h2 className="text-[24px] mb-1 mt-3">Size</h2>
      <div className="relative mb-5">
      <TextField type="number" name="size" id="" value={data.size} helperText={ (typeof(data.size)==='string' && !(data.size>=from && data.size<=to )) ?`The size must in range of ${from} to ${to}`: null} error={(typeof(data.size)==='string' && !(data.size>=from && data.size<=to ) )} onChange={HandleChangeData} placeholder={`Enter your size from ${from} to ${to}.`} className="w-full" />
      <span className="checkedBoxFormat absolute"></span>
      </div>
      
      <CustomButton
        variant="contained"
        disabled={!isAllowed}
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
        onClick={NextStep}
      >
        Next
      </CustomButton>
    </motion.div>
  );
}

export default FirstStep;
