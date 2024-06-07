import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCallback, useContext, useState } from "react";
import { CustomButton } from "../../home/Home";
import { multiStepContext } from "./StepContext";
function SecondStep({ handleCompleteStep }) {
  const { currentStep, setCurrentStep, requirementData, setRequirementData } =
    useContext(multiStepContext);
    const [isAllowed, setAllowed] = useState(false);
  const [isMasterGemStoneChecked, setIsMasterGemStoneChecked] = useState(false);
  const [data, setData] = useState({
    MasterGemStone: {
      material: requirementData.MasterGemStone.material,
      shape: requirementData.MasterGemStone.shape,
      size: requirementData.MasterGemStone.size,
    },
    Stones: {
      quantity: requirementData.Stones.quantity,
      size: requirementData.Stones.size,
    },
  });
  useEffect(() => {
    var output = true;
    Object.entries(data).forEach(([key, value]) => {
      if(value!=null){
        Object.entries(data[key]).forEach(([key,value])=>{
          if(value==null){
            output = false;
            setAllowed(output);
            return;
          }         
        })
      }
    });
    if (output) {
      setAllowed(true)};
  }, [data]);
  const HandleChangeData = (e) => {
    const { name, value } = e.target;
    const dataObject = e.target.getAttribute('data_object');
    setData((prevData) => ({
        ...prevData,
        [dataObject]: {
          ...prevData[dataObject],
          [name]: value,
        },
      }));
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
  const debouncedOnChange = useCallback(debounce(HandleChangeData, 1000), [
    HandleChangeData,
  ]);
  function NextStep(){
    if(isAllowed){
      handleCompleteStep(currentStep-1);
      setCurrentStep(currentStep+1);
      setRequirementData({...requirementData,...data })
    }
  }
  console.log(data);
  function ToogleStone(e) {
    var key = e.target.name;
    var isChecked = e.target.checked;
    var getSection = document.getElementById(key);
    if (isChecked) {
      if (key === "MasterGemStone")
        setData({
          ...data,
          MasterGemStone: {
            material: null,
            shape: null,
            size: null,
          },
        });
      if (key === "Stones")
        setData({
          ...data,
          Stones: {
            quantity: null,
            size: null,
          },
        });
        getSection.style.display="block";
    } else {
      setData({ ...data, [key]: null });
      getSection.style.display="none";
    }
    setIsMasterGemStoneChecked(isChecked);
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="mx-16"
      >
        <h2>Second step</h2>
        <div className="mb-5">
          <div className="flex justify-between content-center">
            <h2 className="text-[24px] mb-1 mt-3">Loại hạt chủ</h2>
            <input
              type="checkbox"
              className="peer"
              name="MasterGemStone"
             
              onClick={ToogleStone}
            />
          </div>
          <div>
            <div id="MasterGemStone">
              <div className="mb-3">
                <h4 className="text-lg">Material</h4>
                <div className="grid grid-cols-5 gap-x-4 mb-[30px]">
                  <label htmlFor="material-1" className="rounded-md border border-[#646464] cursor-pointer" >
                    <div className="shadow-lg relative h-[100px]">
                      <input type="radio" name="material" id="material-1" value="1" className="hidden peer" data_object="MasterGemStone" onChange={debouncedOnChange} />
                      <span className="w-[20px] h-[20px] mb-[50px] top-1 left-1 inline-block border-[2px] border-[#e3e3e3] rounded-full relative z-10 peer-checked:bg-primary checkedBoxFormat peer-checked:border-[#3057d5] peer-checked:scale-110 peer-checked:bg-[#3057d5] peer-checked:before:opacity-100"></span>
                      <img src="https://e7.pngegg.com/pngimages/469/594/png-clipart-two-1000g-gold-bars-gold-bar-bullion-gold-bar-usb-flash-drive-gold.png" className="rounded-md w-full absolute top-0 h-[80px]"/>
                      <p className="text-center">Vàng</p>
                    </div>
                  </label>
                  <label htmlFor="material-2" className="rounded-md border border-[#646464] cursor-pointer">
                    <div className="shadow-lg relative h-[100px]">
                      <input type="radio" name="material" id="material-2" value="2" className="hidden peer" data_object="MasterGemStone" onChange={debouncedOnChange} />
                      <span className="w-[20px] h-[20px] mb-[50px] top-1 left-1 inline-block border-[2px] border-[#e3e3e3] rounded-full relative z-10 peer-checked:bg-primary checkedBoxFormat peer-checked:border-[#3057d5] peer-checked:scale-110 peer-checked:bg-[#3057d5] peer-checked:before:opacity-100"></span>
                      <img src="https://cdn.pixabay.com/photo/2021/05/12/06/30/silver-bar-6247498_960_720.jpg" className="rounded-md w-full absolute top-0 h-[80px]"/>
                      <p className="text-center">Bạc</p>
                    </div>
                  </label>
                  <label htmlFor="material-3" className="rounded-md border border-[#646464] cursor-pointer">
                    <div className="shadow-lg relative h-[100px]">
                      <input type="radio" name="material" id="material-3" value="3" className="hidden peer" data_object="MasterGemStone" onChange={debouncedOnChange} />
                      <span className="w-[20px] h-[20px] mb-[50px] top-1 left-1 inline-block border-[2px] border-[#e3e3e3] rounded-full relative z-10 peer-checked:bg-primary checkedBoxFormat peer-checked:border-[#3057d5] peer-checked:scale-110 peer-checked:bg-[#3057d5] peer-checked:before:opacity-100"></span>
                      <img src="https://atlas-content-cdn.pixelsquid.com/stock-images/copper-ingots-wrought-iron-3ARoVB0-600.jpg" className="rounded-md w-full absolute top-0 h-[80px]"/>
                      <p className="text-center">Đồng</p>
                    </div>
                  </label>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-x-10">
              <div>
                <label htmlFor="size" className="text-lg">Size of Mastergemstone</label>
                <select 
                label="Size of Mastergemstone"
                data_object="MasterGemStone"
                name="size"
                onChange={HandleChangeData} 
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">--Choose MasterGemStone size--</option>
                  <option value="10">10 inches</option>
                  <option value="20">20 inches</option>
                  <option value="30">30 inches</option>
                </select>
              </div>
              <div>
              <label htmlFor="shape" className="text-lg">Shape of MasterGemstone</label>
                <select 
                  data_object="MasterGemStone"
                  name="shape"
                  onChange={HandleChangeData}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  <option value="">--Choose MasterGemStone shape--</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="circle">Circle</option>
                  <option value="triangle">Triangle</option>
                </select>
              </div>
             </div>
            </div>
          </div>
          <div className="flex justify-between content-center">
            <h2 className="text-[24px] mb-1 mt-3">Loại hạt Tấm  </h2>
            <input
              type="checkbox"
              className="peer"
              name="Stones"
             
              onClick={ToogleStone}
            />
          </div>
          <div id="Stones">
          <div className="grid grid-cols-2 gap-x-10">
              <div>
                <label htmlFor="size" className="text-lg">Size of Mastergemstone</label>
                <select 
                label="Size of Mastergemstone"
                data_object="Stones"
                name="size"
                onChange={HandleChangeData} 
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">--Choose Stones size--</option>
                  <option value="0.5">0.5</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                </select>
              </div>
              <div>
                <label htmlFor="shape" className="text-lg">Quantity of Stones</label>
                <select 
                  data_object="Stones"
                  name="quantity"
                  onChange={HandleChangeData}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  <option value="">--Choose Stones quantity--</option>
                  <option value="rectangle">16</option>
                  <option value="circle">24</option>
                  <option value="triangle">32</option>
                </select>
              </div>
             </div>
          </div>
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
    </>
  );
}

export default SecondStep;
