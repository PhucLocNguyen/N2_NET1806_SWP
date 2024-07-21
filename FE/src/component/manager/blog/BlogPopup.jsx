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

import PostApiBlog from "../../../api/blog/PostApiBlog";
import { FetchApiBlog } from "../../../api/blog/FetchApiBlog";
import UploadImage from "../../../utils/UploadImage";
import DeleteImage from "../../../utils/DeleteImage";

function BlogPopup({ setIsOpenPopup }) {
  const folder = "Design3D";
  const { UserId } = useAuth();

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const respone = await FetchApiBlog({});
      setBlog(respone);
    };

    getBlog();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    managerId: UserId,
  });

  const checkDuplicate = (userData, apiData) => {
    return apiData.some(
      (item) =>
        item.title == userData.title &&
        item.description == userData.description &&
        item.image == userData.image
    );
  };

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let errorValue = "";

    let isNotValid = true;
    try {
      if(name == "description" || name == "title") {
        errorValue = "This field cannot be blank";
        const numberValue = Number(value);
        if (!isNaN(numberValue) && value !== "") {
          errorValue = "This field cannot a number";
        }
        if (value !== "" && isNaN(numberValue)) {
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
      formData.title !== "" &&
      formData.description !== "" &&
      formData.image !== "" &&
      formData.managerId !== ""
    ) {
      const isDuplicate = checkDuplicate(formData, blog);
      if (isDuplicate) {
        isValid = false;
        toast.error("Blog Already Exists");
      }
    }

    console.log(">>> Check success: ", isValid);

    if (isValid) {
      const CallApi = async () => {
        const respone = await PostApiBlog({ formData });
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

  console.log(formData);

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
            <h1 className="font-bold leading-5 text-[1.5rem]">Add New Blog</h1>
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
                <h2 className="text-[1.1rem] font-medium pb-[3px]">Title</h2>
                <div>
                  <TextField
                    name="title"
                    onChange={handleFormChange}
                    error={!!errors.title}
                    helperText={errors?.title}
                    style={{ width: "100%" }}
                    placeholder="Title"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ minHeight: "4rem" }}
                  />
                </div>
              </div>

              <div className="w-full">
                <h2 className="text-[1.1rem] font-medium pb-[3px]">
                  Description
                </h2>
                <div>
                  <TextField
                    name="description"
                    onChange={handleFormChange}
                    error={!!errors.description}
                    helperText={errors?.description}
                    fullWidth
                    placeholder="description"
                    id="outlined-basic"
                    variant="outlined"
                    size="medium"
                    sx={{ minHeight: "4rem" }}
                    multiline
                    rows={4}
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
                    Upload Blog Image
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

export default BlogPopup;