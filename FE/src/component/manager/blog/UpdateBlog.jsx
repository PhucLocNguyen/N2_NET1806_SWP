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

import PutApiBlog from "../../../api/blog/PutApiBlog.jsx";
import UploadImage from "../../../utils/UploadImage.jsx";
import DeleteImage from "../../../utils/DeleteImage.jsx";

function UpdateBlog({ data, setIsOpenUpdatePopup }) {
  const folder = "Design3D";
  const { UserId } = useAuth();

  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [errors, setErrors] = useState({ title: '', description: '' });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
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
    const newErrors = { title: '', description: '' };
    if (!formData.title) {
      newErrors.title = 'Title cannot be empty';
    }
    if (!formData.description) {
      newErrors.description = 'Description cannot be empty';
    }
    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      let id = data?.blogId;
      const CallApi = async () => {
        const respone = await PutApiBlog({ id, formData });
      };
      CallApi();
      toast.success("Create Success");
      setIsOpenUpdatePopup(false);
      console.log('Updating with data:', formData);
    } else {
      console.log('Form validation failed');
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
            <h1 className="font-bold leading-5 text-[1.5rem]">Update Blog</h1>
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
              <h2 className="text-[1.1rem] font-medium pb-[3px]">Old Image</h2>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex justify-center">
                <img
                  src={data?.image}
                  alt="Current Blog Image"
                  className="max-w-full max-h-[10rem] object-cover"
                />
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h2 className="text-[1.1rem] font-medium pb-[3px]">Old Title</h2>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex justify-center">
              <p className="w-[90%] text-sm font-medium tracking-wide leading-snug overflow-hidden text-ellipsis line-clamp-2">
                  {data?.title}
                </p>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h2 className="text-[1.1rem] font-medium pb-[3px]">
                Old Description
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex justify-center">
                <p className="w-[90%] text-sm font-medium tracking-wide leading-snug overflow-hidden text-ellipsis line-clamp-2">
                  {data?.description}
                </p>
              </div>
            </AccordionDetails>
          </Accordion>

          <div className="px-[1rem] py-[1rem]">
            <div className="flex flex-col ">
              <div className="w-[100%]">
                <h2 className="text-[1.1rem] font-medium pb-[3px]">
                  New Title
                </h2>
                <div>
                  <TextField
                    name="title"
                    onChange={handleFormChange}
                    error={!!errors.title}
                    helperText={errors?.title}
                    style={{ width: "100%" }}
                    placeholder="New Title"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ minHeight: "4rem" }}
                  />
                </div>
              </div>

              <div className="w-full">
                <h2 className="text-[1.1rem] font-medium pb-[3px]">
                  New Description
                </h2>
                <div>
                  <TextField
                    name="description"
                    onChange={handleFormChange}
                    error={!!errors.description}
                    helperText={errors?.description}
                    fullWidth
                    placeholder="New Description"
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
                Update
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default UpdateBlog;
