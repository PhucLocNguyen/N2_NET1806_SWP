import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PutApiDesignRule from "../../../api/designRule/PutApiDesignRule.jsx";

function UpdateDesignRule({ data, setIsOpenUpdatePopup }) {
  const [formData, setFormData] = useState({
    minSizeMasterGemstone: "",
    maxSizeMasterGemstone: "",
    minSizeJewellery: "",
    maxSizeJewellery: "",
  });
  const [errors, setErrors] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value == "" && !isNaN(Number(value))) {
        newErrors[key] = `${key} must be a valid number`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const id = data?.designRuleId;
      const CallApi = async () => {
        await PutApiDesignRule({ id, formData });
      };
      CallApi();
      toast.success("Update Success");
      setIsOpenUpdatePopup(false);
      console.log("Updating with data:", formData);
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpenUpdatePopup(false)}
        className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#fff] w-[30rem] rounded-[10px] min-h-[250px]"
        >
          {/* Head */}
          <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
            <h1 className="font-bold leading-5 text-[1.5rem]">
              Update Design Rule
            </h1>
            <div
              onClick={() => setIsOpenUpdatePopup(false)}
              className="absolute top-[10px] right-[10px] cursor-pointer"
            >
              <CloseIcon />
            </div>
          </div>
          {/* Body */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h2 className="text-[1.1rem] font-medium pb-[3px]">
                Current Data
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <p>Type Of Jewellery ID: {data?.typeOfJewelleryId}</p>
                <p>Min Size Master Gemstone: {data?.minSizeMasterGemstone}</p>
                <p>Max Size Master Gemstone: {data?.maxSizeMasterGemstone}</p>
                <p>Min Size Jewellery: {data?.minSizeJewellery}</p>
                <p>Max Size Jewellery: {data?.maxSizeJewellery}</p>
              </div>
            </AccordionDetails>
          </Accordion>

          <div className="px-[1rem] py-[1rem]">
            <div className="flex flex-col ">
              <div className="w-full">
                <h2 className="text-[1.1rem] font-medium pb-[3px]">
                  Min Size Master Gemstone
                </h2>
                <div>
                  <TextField
                    name="minSizeMasterGemstone"
                    onChange={handleFormChange}
                    error={!!errors.minSizeMasterGemstone}
                    helperText={errors?.minSizeMasterGemstone}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ minHeight: "4rem" }}
                  />
                </div>
              </div>

              <div className="w-full">
                <h2 className="text-[1.1rem] font-medium pb-[3px]">
                  Max Size Master Gemstone
                </h2>
                <div>
                  <TextField
                    name="maxSizeMasterGemstone"
                    onChange={handleFormChange}
                    error={!!errors.maxSizeMasterGemstone}
                    helperText={errors?.maxSizeMasterGemstone}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ minHeight: "4rem" }}
                  />
                </div>
              </div>

              <div className="w-full">
                <h2 className="text-[1.1rem] font-medium pb-[3px]">
                  Min Size Jewellery
                </h2>
                <div>
                  <TextField
                    name="minSizeJewellery"
                    onChange={handleFormChange}
                    error={!!errors.minSizeJewellery}
                    helperText={errors?.minSizeJewellery}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ minHeight: "4rem" }}
                  />
                </div>
              </div>

              <div className="w-full">
                <h2 className="text-[1.1rem] font-medium pb-[3px]">
                  Max Size Jewellery
                </h2>
                <div>
                  <TextField
                    name="maxSizeJewellery"
                    onChange={handleFormChange}
                    error={!!errors.maxSizeJewellery}
                    helperText={errors?.maxSizeJewellery}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ minHeight: "4rem" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-[1rem]">
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ minWidth: "6rem" }}
              >
                Update
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default UpdateDesignRule;
