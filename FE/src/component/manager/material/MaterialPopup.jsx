import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth.jsx";

import PostApiMaterial from "../../../api/material/PostApiMaterial.jsx";
import { FetchApiMaterial } from "../../../api/material/FetchApiMaterial.jsx";
import UploadImage from "../../../utils/UploadImage";
import DeleteImage from "../../../utils/DeleteImage";

function MaterialPopup({ setIsOpenPopup }) {
    const folder = "Material";
    const { UserId } = useAuth();
  
    const [material, setMaterial] = useState([]);
  
    useEffect(() => {
      const getMaterial = async () => {
        const respone = await FetchApiMaterial({});
        setMaterial(respone);
      };
  
      getMaterial();
    }, []);
  
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      image: "",
      managerId: UserId,
    });
  
    const checkDuplicate = (userData, apiData) => {
      return apiData.some(
        (item) =>
          item.name == userData.name &&
          item.price == userData.price &&
          item.image == userData.image
      );
    };
  
    const [errors, setErrors] = useState({
        name: "",
        price: "",
        image: "",
    });
  
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        let errorValue = "";
        let isNotValid = true;
      
        try {
          if (name === "name") {
            errorValue = "This field cannot be blank";
            if (value === "") {
              isNotValid = true;
            } else if (!isNaN(Number(value))) {
              errorValue = "This field cannot contain a number";
              isNotValid = true;
            } else {
              isNotValid = false;
            }
          }
      
          if (name === "price") {
            errorValue = "This field cannot be blank";
            const numberValue = Number(value);
            if (value === "") {
              isNotValid = true;
            } else if (isNaN(numberValue)) {
              errorValue = "This field must be a number";
              isNotValid = true;
            } else {
              isNotValid = false;
            }
          }
        } catch (error) {
          isNotValid = true;
        }
      
        setFormData({
          ...formData,
          [name]: value,
        });
      
        setErrors({
          ...errors,
          [name]: isNotValid ? errorValue : "",
        });
      };
      
    console.log(formData);
  
    const handleSubmit = () => {
      let isValid = true;
      let newError = {};
      console.log(errors);
  
      Object.keys(errors).forEach((key) => {
        if (errors[key] !== "") {
          isValid = false;
        }
      });
  
      Object.keys(formData).forEach((key) => {
        if (formData[key] === "") {
          newError[key] = "This field cannot be blank";
          isValid = false;
        }
      });
  
      setErrors(newError);
  
      // Kiem tra du lieu co bi trung
      if (
        formData.name !== "" &&
        formData.price !== "" &&
        formData.image !== "" &&
        formData.managerId !== ""
      ) {
        const isDuplicate = checkDuplicate(formData, material);
        if (isDuplicate) {
          isValid = false;
          toast.error("Material Already Exists");
        }
      }
  
      console.log(">>> Check success: ", isValid);
  
      if (isValid) {
        const CallApi = async () => {
          const respone = await PostApiMaterial({ formData });
        };
        CallApi();
        toast.success("Create Success");
        setIsOpenPopup(false);
      }
    };
  
    // Hinh anh
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
        const fileType = selectedFile.type;
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!validImageTypes.includes(fileType)) {
            toast.error('Please select a valid image file (JPEG, PNG, GIF).');
            return;
        }

        if (formData.image !== "") {
          await DeleteImage(formData.image);
        }
  
        let urlImage = await UploadImage(folder, selectedFile);
        console.log(urlImage);
        setFormData({
          ...formData,
          image: urlImage,
        });
      }
    };
  
    return (
      <>
        <div
          onClick={() => setIsOpenPopup(false)}
          className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fff] w-[40rem] rounded-[10px] min-h-[450px]"
          >
            {/* Head */}
            <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
              <h1 className="font-bold leading-5 text-[1.5rem]">Add New Material</h1>
              <div
                onClick={() => setIsOpenPopup(false)}
                className="absolute top-[10px] right-[10px] cursor-pointer"
              >
                <CloseIcon />
              </div>
            </div>
            {/* Body */}
            <div className="px-[1rem] py-[1rem]">
              <div className="flex flex-col ">
                <div className="w-[100%]">
                  <h2 className="text-[1.1rem] font-medium pb-[3px]">Name</h2>
                  <div>
                    <TextField
                      name="name"
                      onChange={handleFormChange}
                      error={!!errors.name}
                      helperText={errors?.name}
                      style={{ width: "100%" }}
                      placeholder="Name Material"
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      sx={{ minHeight: "4rem" }}
                    />
                  </div>
                </div>
  
                <div className="w-full">
                  <h2 className="text-[1.1rem] font-medium pb-[3px]">
                    Price
                  </h2>
                  <div>
                    <TextField
                      name="price"
                      onChange={handleFormChange}
                      error={!!errors.price}
                      helperText={errors?.price}
                      fullWidth
                      placeholder="Price"
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
                  <AddIcon fontSize="small" sx={{ marginRight: "8px" }} />
                  Add
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );
}

export default MaterialPopup;