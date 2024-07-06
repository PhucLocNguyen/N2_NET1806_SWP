import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth.jsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PutApiMaterial from "../../../api/material/PutApiMaterial.jsx";
import UploadImage from "../../../utils/UploadImage.jsx";
import DeleteImage from "../../../utils/DeleteImage.jsx";

function UpdateMaterial({ data, setIsOpenUpdatePopup }) {
  const folder = "Material";
  const { UserId } = useAuth();

  const [formData, setFormData] = useState({ name: "", price: "", image: "" });
  const [errors, setErrors] = useState({ name: "", price: "" });

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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (formData.image !== "" && formData.image != null) {
        await DeleteImage(formData.image);
      }

      let urlImage = await UploadImage(folder, selectedFile);
      setFormData({
        ...formData,
        image: urlImage,
        managerId: UserId,
      });
    }
  };

  const validateForm = () => {
    const newErrors = { name: "", price: "" };

    if (!formData.name) {
      newErrors.name = "name cannot be empty";
    }

    if (!formData.price) {
      newErrors.price = "Price cannot be empty";
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.price;
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
                <h3 className="text-[1rem] font-medium pb-[2px]">Old Image</h3>
                <div className="flex justify-center">
                  <img
                    src={data?.image}
                    alt="Current Blog Image"
                    className="max-w-[80%] max-h-[10rem] object-cover"
                  />
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-[1rem] font-medium pb-[2px]">Old Name</h3>
                <div className="flex justify-center">
                  <p className="w-[90%] text-sm font-medium tracking-wide leading-snug overflow-hidden text-ellipsis line-clamp-2">
                    {data?.name}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-[1rem] font-medium pb-[2px]">Old Price</h3>
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
              <div className="w-[100%]">
                <h2 className="text-[1.1rem] font-medium pb-[3px]">New Name</h2>
                <div>
                  <TextField
                    name="name"
                    onChange={handleFormChange}
                    error={!!errors.name}
                    helperText={errors?.name}
                    style={{ width: "100%" }}
                    placeholder="New Name"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ minHeight: "4rem" }}
                  />
                </div>
              </div>

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

              <div>
                <div className="w-80 mt-5">
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      border: "2px solid",
                      color: `${formData.image == "" ? "red" : "green"}`,
                    }}
                    onChange={handleFileChange}
                  >
                    Upload Material Image
                    <VisuallyHiddenInput type="file" />
                  </Button>
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
