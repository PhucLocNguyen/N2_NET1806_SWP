import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCallback, useContext, useState } from "react";
import { FetchApiMasterGemstone } from "../../../api/Requirements/FetchApiMasterGemstone";
import { CustomButton } from "../../home/Home";
import { multiStepContext } from "./StepContext";
function SecondStep({ handleCompleteStep, completedSteps }) {
  const { currentStep, setCurrentStep, requirementData, setRequirementData } =
    useContext(multiStepContext);
    const [isAllowed, setAllowed] = useState(false);
  const [masterGemstoneData, setMasterGemstoneData] = useState([]);
  const [filterMasterGemstoneData, setFilterMasterGemstoneData] = useState([]);
  const [kind, setKind] = useState([]);
  const [sizeMasterGemstone, setSizeMasterGemstone] = useState([]);
  const [shapeMasterGemstone, setShapeMasterGemstone] = useState([]);
  const [data, setData] = useState({
    MasterGemStone: {
      kind: requirementData.MasterGemStone== null? "":requirementData.MasterGemStone.kind ,
      shape: requirementData.MasterGemStone== null? "":requirementData.MasterGemStone.shape ,
      size: requirementData.MasterGemStone== null? "":requirementData.MasterGemStone.size ,
    },
    Stones: {
      quantity: requirementData.Stones== null? "":requirementData.Stones.quantity ,
      size: requirementData.Stones== null? "":requirementData.Stones.size,
    },
  });
  console.log(filterMasterGemstoneData);
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
  useEffect(()=>{
   var masterGemstoneApiData = FetchApiMasterGemstone().then((res)=>{
    let getFromApi = res;

    if(data.MasterGemStone.kind !==null){
      getFromApi= getFromApi.filter((current) => {
        return current["kind"] === requirementData.MasterGemStone.kind;
      
      });
      const selectSize = new Set(getFromApi.map(item => item.size));
      setSizeMasterGemstone([...selectSize]);
      const selectShape = new Set(getFromApi.map(item=> item.shape));
      setShapeMasterGemstone([...selectShape]);
    }
    setFilterMasterGemstoneData(getFromApi);
    setMasterGemstoneData(res);
  console.log(filterMasterGemstoneData);
    
    const kinds = new Set(res.map(item => item.kind));
    setKind([...kinds]);
   });
   if(requirementData.MasterGemStone==null && completedSteps[currentStep-1]){
    document.getElementById("MasterGemStone").style.display="none";
   }
   if(requirementData.Stones==null && completedSteps[currentStep-1]){
    document.getElementById("Stones").style.display="none";
   }
  },[]);
  
  useEffect(()=>{
    console.log("warn");
    console.log(filterMasterGemstoneData);
    const selectSize = new Set(filterMasterGemstoneData.map(item => item.size));
    
    setSizeMasterGemstone([...selectSize]);
    const selectShape = new Set(filterMasterGemstoneData.map(item=> item.shape));
    setShapeMasterGemstone([...selectShape]);
  },[filterMasterGemstoneData]);

  const HandleChangeData = (e) => {
    const { name, value } = e.target;
    const dataObject = e.target.getAttribute('data_object');
    if(dataObject =="MasterGemStone"){
      var filterData = filterMasterGemstoneData;
        if(name==="kind"){
           filterData = masterGemstoneData.filter((current) => {
            return current[name] === value;
          })
        
        }else{
          if(value!==""){
             filterData = filterMasterGemstoneData.filter((current) => {
              return current[name] === value;
            })
          }
        }
        setFilterMasterGemstoneData(filterData);

    }
    if(dataObject)
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
  // console.log(data);
  function ToogleStone(e) {
    var key = e.target.name;
    var isChecked = e.target.checked;
    var getSection = document.getElementById(key);
    if (isChecked) {
      if (key === "MasterGemStone")
        setData({
          ...data,
          MasterGemStone: {
            kind: null,
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
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="mx-16"
      >
        <div className="mb-5">
          <div className="flex justify-between content-center">
            <h2 className="text-[24px] mb-1 mt-3">Select MasterGemstone</h2>
            <input
              type="checkbox"
              className="peer"
              name="MasterGemStone"
              defaultChecked={requirementData.MasterGemStone!=null ||  !completedSteps[currentStep-1]? true : false}
              onClick={ToogleStone}
            />
          </div>
          <div>
            <div id="MasterGemStone">
              <div className="mb-3">
                <h4 className="text-lg">Material</h4>
                
                <div className="grid grid-cols-5 gap-x-4 mb-[30px]">
    {kind.map((val, index) => {
        return (
            <label 
                key={val + index} 
                htmlFor={"material-" + index} 
                className="rounded-md border border-[#646464] cursor-pointer"
            >
                <div className="shadow-lg relative h-[100px]">
                    <input 
                        type="radio" 
                        name="kind" 
                        id={"material-" + index} 
                        value={val} 
                        className="hidden peer" 
                        defaultChecked={data.MasterGemStone!=null&&data.MasterGemStone.kind === val} 
                        data_object="MasterGemStone" 
                        onChange={debouncedOnChange} 
                    />
                    <span className="w-[20px] h-[20px] mb-[50px] top-1 left-1 inline-block border-[2px] border-[#e3e3e3] rounded-full relative z-10 peer-checked:bg-primary checkedBoxFormat peer-checked:border-[#3057d5] peer-checked:scale-110 peer-checked:bg-[#3057d5] peer-checked:before:opacity-100"></span>
                    <img 
                        src="https://e7.pngegg.com/pngimages/469/594/png-clipart-two-1000g-gold-bars-gold-bar-bullion-gold-bar-usb-flash-drive-gold.png" 
                        className="rounded-md w-full absolute top-0 h-[80px]"
                    />
                    <p className="text-center">{val}</p>
                </div>
            </label>
        );
    })}
</div>

             </div>
             <div className="grid grid-cols-2 gap-x-10">
              <div>
                <label htmlFor="size" className="text-lg">Size of Mastergemstone</label>
                <select 
                    label="Size of Mastergemstone"
                    data_object="MasterGemStone"
                    name="size"
                    key="mastergemstonesize"
                    onChange={HandleChangeData} 
                    value={data.MasterGemStone==null ? "" : data.MasterGemStone.size}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option key="defaultSelect" value="">--Choose MasterGemStone size--</option>
                    {sizeMasterGemstone.map((items, index) => (
                        <option key={items + index} value={items}>{items}</option>
                    ))}
                </select>

              </div>
              <div>
              <label htmlFor="shape" className="text-lg">Shape of MasterGemstone</label>
              <select 
    key="mastergemstoneshape"
    data_object="MasterGemStone"
    name="shape"
    onChange={HandleChangeData}
    value={data.MasterGemStone==null ? "" : data.MasterGemStone.shape}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>
    <option key="defaultSelectShape" value="">--Choose MasterGemStone shape--</option>
    {
        shapeMasterGemstone.map((item, index) => (
            <option key={item} value={item}>{item}</option>
        ))
    }
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
              defaultChecked={requirementData.Stones!=null ||  !completedSteps[currentStep-1]? true : false}
              onClick={ToogleStone}
            />
          </div>
          <div id="Stones">
          <div className="grid grid-cols-2 gap-x-10">
              <div>
                <label htmlFor="size" className="text-lg">Size</label>
                <select 
                key="sizeOfStones"
                label="Size of Stones"
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
                key="quantityStones"
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
