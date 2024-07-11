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

import PutApiMaterial from "../../../api/material/PutApiMaterial.jsx";

function UpdateMaterial({ data, setIsOpenUpdatePopup }) {
  const { UserId } = useAuth();

  const [formData, setFormData] = useState({
    materialId: data.materialId,
    name: data.name,
    price: "",
    image: data.image,
    managerId: UserId,
  });
  const [errors, setErrors] = useState({ price: "" });

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
    const newErrors = { price: "" };
    if (!formData.price) {
      newErrors.price = "Price cannot be empty";
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number";
    }

    setErrors(newErrors);
    return !newErrors.price;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      let id = data?.materialId;
      const CallApi = async () => {
        const respone = await PutApiMaterial({ id, formData });
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
              Update Material
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
                Material Detail
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mb-4">
                <h3 className="text-[1rem] font-medium pb-[2px]">Image</h3>
                <div className="flex justify-center">
                  <img
                    src={data?.image}
                    alt="Current Blog Image"
                    className="max-w-[80%] max-h-[10rem] object-cover"
                  />
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-[1rem] font-medium pb-[2px]">Name</h3>
                <div className="flex justify-center">
                  <p className="w-[90%] text-sm font-medium tracking-wide leading-snug overflow-hidden text-ellipsis line-clamp-2">
                    {data?.name}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-[1rem] font-medium pb-[2px]">Price</h3>
                <div className="flex justify-center">
                  <p className="w-[90%] text-sm font-medium tracking-wide leading-snug overflow-hidden text-ellipsis line-clamp-2">
                    {data?.price}
                  </p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          <div className="px-[1rem] py-[1rem]">
            <div className="flex flex-col ">
              <div className="w-full">
                <h2 className="text-[1.1rem] font-medium pb-[3px]">
                  New Price
                </h2>
                <div>
                  <TextField
                    name="price"
                    onChange={handleFormChange}
                    error={!!errors.price}
                    helperText={errors?.price}
                    fullWidth
                    placeholder="New Price"
                    id="outlined-basic"
                    variant="outlined"
                    size="medium"
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

export default UpdateMaterial;
