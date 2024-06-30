import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormHelperText from '@mui/material/FormHelperText';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';

import useAuth from '../../../hooks/useAuth';
import UploadImage from '../../../utils/UploadImage';
import DeleteImage from '../../../utils/DeleteImage';
import { ApiUpdateParentDesign } from '../../../api/manager/ApiDesign';

function UpdateDesignPopup({ data, setIsOpenUpdatePopup }) {
   const folder = 'Design';
   const { UserId } = useAuth();

   console.log(data)

   const [newImage, setNewImage] = useState('');

   const [formData, setFormData] = useState({
      image: data?.image,
      description: data?.description,
      managerId: UserId
   });

   const [errors, setErrors] = useState({
      image: '',
      description: ''
   });

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      let errorValue = '';

      let isNotValid = true;
      try {

         if (name === 'description') {
            errorValue = 'This field cannot be blank';
            if (value !== '') {
               isNotValid = false;
            }

         }

      } catch (error) {
         isNotValid = true
      }

      setFormData({
         ...formData,
         [name]: value
      });

      setErrors({
         ...errors,
         [name]: isNotValid ? errorValue : ''
      })

   }

   const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
   });

   const handleFileChange = async (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
         if (newImage !== '') {
            await DeleteImage(newImage);
         }

         let urlImage = await UploadImage(folder, selectedFile)
         console.log(urlImage);
         setNewImage(urlImage);
      }
   };

   const handleSubmit = () => {
      let isValid = true;
      let newError = {};

      Object.keys(errors).forEach((key) => {
         if (errors[key] !== '') {
            isValid = false;
         }
      });

      Object.keys(formData).forEach((key) => {
         if (key == 'image' || key == 'designName') {
            if (formData[key] === '') {
               newError[key] = 'This field cannot be blank';
               isValid = false;
            }
         }
      });

      if (isValid) {
         let id = data?.designId;
         let payload = { ...formData }
         if (newImage != '') {
            payload.image = newImage;
         }
         const CallApi = async () => {
            const response = await ApiUpdateParentDesign({ id, payload });
         }
         CallApi();
         setIsOpenUpdatePopup(false);
      }
   }

   console.log(formData)

   return (
      <>
         <div onClick={() => setIsOpenUpdatePopup(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} onClick={(e) => e.stopPropagation()} className="bg-[#fff] w-[30rem] rounded-[10px] min-h-[450px] min-w-[70%]">
               {/* Head */}
               <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
                  <h1 className="font-bold leading-5 text-[1.5rem]">Update Design</h1>
                  <div onClick={() => setIsOpenUpdatePopup(false)} className='absolute top-[10px] right-[10px] cursor-pointer'>
                     <CloseIcon />
                  </div>
               </div>
               {/* Body */}
               <div className='px-[1rem] py-[1rem]'>

                  <h2 className='text-[1.1rem] font-medium pb-[3px]'>Design description</h2>
                  <div>
                     <textarea value={formData.description} data-testid='textarea' name='description' onChange={handleFormChange} className='w-[100%] h-[100px] border-[1px] border-solid border-[#000]'></textarea>
                     {errors.description && <FormHelperText>{errors.description}</FormHelperText>}
                  </div>

                  <h2 className='text-[1.1rem] font-medium pb-[3px]'>Image</h2>
                  <img className='h-[200px] w-[200px] object-cover mb-[20px]' src={newImage != '' ? newImage : formData?.image} alt="" />
                  <div className='w-[50%]'>
                     <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{
                           border: '2px solid',
                           color: `${formData.image == '' ? 'red' : 'green'}`
                        }}
                        onChange={handleFileChange}
                     >
                        Upload Image
                        <VisuallyHiddenInput type="file" />
                     </Button>
                  </div>

                  <div className='mt-[1rem]'>
                     <Button onClick={handleSubmit} variant="contained" sx={{ minWidth: '6rem' }}>
                        Add
                     </Button>
                  </div>

               </div>
            </motion.div>
         </div>
      </>
   )
}

export default UpdateDesignPopup;