import { useContext, useEffect, useState } from "react";
import { multiStepContext } from "./StepContext";
import { CustomButton } from "../../home/Home";
import { motion } from "framer-motion";
import "./style.css";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { FetchApiMaterial } from "../../../api/Requirements/FetchApiMaterial";

function FirstStep({ handleCompleteStep }) {
  const {
    currentStep,
    setCurrentStep,
    requirementData,
    setRequirementData,
    designRuleState,
    animate,
  } = useContext(multiStepContext);
  const [isAllowed, setAllowed] = useState(false);
  const [data, setData] = useState({
    material: requirementData.material === 0 ? null : requirementData.material,
    size: requirementData.size === 0 ? null : requirementData.size,
  });
  const [spacingSelect, setSpacingSelect] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const spacingFunction = (designRuleState) => {
    let arraySpacing = [];
    let count = designRuleState.MinSizeJewellery;
    while (count <= designRuleState.MaxSizeJewellery) {
      arraySpacing.push(count);
      if (designRuleState.MaxSizeJewellery > 100) {
        count += 50;
      } else {
        count += 0.5;
      }
    }
    return arraySpacing;
  };
  useEffect(() => {
    const fetchMaterials = async () => {
      const res = await FetchApiMaterial();
      setMaterialList([...res]);
    };
    fetchMaterials();
    if (designRuleState != null) {
      const arraySpacing = spacingFunction(designRuleState);
      setSpacingSelect([...arraySpacing]);
    }
  }, []);

  useEffect(() => {
    let output = true;
    Object.entries(data).forEach(([key, value]) => {
      if (
        value === -1 ||
        (key === "size" &&
          !(
            value >= designRuleState.MinSizeJewellery &&
            value <= designRuleState.MaxSizeJewellery
          )) ||
        data.material === null
      ) {
        output = false;
        setAllowed(false);
        return;
      }
    });
    if (output) {
      setAllowed(true);
    }
  }, [
    data,
    designRuleState.MinSizeJewellery,
    designRuleState.MaxSizeJewellery,
  ]);

  function NextStep() {
    if (isAllowed) {
      handleCompleteStep(currentStep - 1);
      setCurrentStep(currentStep + 1);
      setRequirementData({ ...requirementData, ...data });
    }
  }

  const HandleChangeData = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="mx-16"
    >
      <h2 className="text-[24px] mb-1 mt-3">Material</h2>
      <div className="grid grid-cols-5 mb-[30px] gap-4">
        {materialList.map((item, index) => (
          <label
            key={item.name + index}
            htmlFor={"material-" + index}
            className="rounded-md border border-[#646464] cursor-pointer"
          >
            <div className="shadow-lg relative h-[100px]">
              <input
                type="radio"
                name="material"
                id={"material-" + index}
                defaultChecked={requirementData.material === item.materialId}
                value={item.materialId}
                className="hidden peer"
                onChange={HandleChangeData}
              />
              <span className="w-[20px] h-[20px] mb-[50px] top-1 left-1 inline-block border-[2px] border-[#e3e3e3] rounded-full relative z-10 peer-checked:bg-primary checkedBoxFormat peer-checked:border-[#3057d5] peer-checked:scale-110 peer-checked:bg-[#3057d5] peer-checked:before:opacity-100"></span>
              <img
                src={item.image}
                className="rounded-md w-full absolute top-0 h-[80px]"
              />
              <p className="text-center">{item.name}</p>
            </div>
          </label>
        ))}
      </div>
      <h2 className="text-[24px] mb-1 mt-3">Size</h2>
      <div className="relative mb-5">
        <FormControl
          sx={{ minWidth: 120, width: "100%", minHeight: "4rem" }}
          size="small"
        >
          <Select
            name="size"
            onChange={HandleChangeData}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={requirementData.size == 0 ? "" : requirementData.size}
          >
            <MenuItem value="">
              <em>Please select the jewelery size</em>
            </MenuItem>
            {spacingSelect.map((items, index) => (
              <MenuItem key={items} value={items}>
                {items}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
        onClick={NextStep}
      >
        Next
      </CustomButton>
    </motion.div>
  );
}

export default FirstStep;
