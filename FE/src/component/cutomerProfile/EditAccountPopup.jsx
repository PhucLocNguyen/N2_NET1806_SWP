import { motion } from 'framer-motion';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import { ApiUpdateProfile } from '../../api/customerProfile/ApiCustomerProfile';
import useAuth from '../../hooks/useAuth';
import UploadImage from '../../utils/UploadImage';
import DeleteImage from '../../utils/DeleteImage';

function EditAccountPopUp({ setIsOpenPopup }) {
   const folder = 'CustomerProfile';
   const { UserId } = useAuth();

   const [formData, setFormData] = useState({
      name: '',
      phone: '',
      image: ''
   });

   const [errors, setErrors] = useState({
      name: '',
      phone: '',
      image: ''
   });

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      let errorValue = '';

      let isNotValid = true;
      try {

         if (name === 'name' || name === 'iamge') {
            errorValue = 'This field cannot be blank';
            if (value !== '') {
               isNotValid = false;
            }

         } else if (name === 'phone') {
            errorValue = 'Ten digit phone number';
            const numberValue = Number(value)
            if (!isNaN(numberValue) && value !== '') {
               errorValue = 'This field cannot a number';
            }
            if (value !== '' && !isNaN(numberValue) && value.length == 10) {
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

   // Hinh anh
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
         if (formData.image !== '') {
            await DeleteImage(formData.image);
         }

         let urlImage = await UploadImage(folder, selectedFile)
         console.log(urlImage);
         setFormData({
            ...formData,
            image: urlImage
         });
      }
   };

   const handleSubmit = async () => {
      let isValid = true;
      let newError = {};
      console.log(errors);

      Object.keys(errors).forEach((key) => {
         if (errors[key] !== '') {
            isValid = false;
         }
      });

      Object.keys(formData).forEach((key) => {
         if (formData[key] === '') {
            newError[key] = 'This field cannot be blank';
            isValid = false;
         }
      })

      setErrors(newError);

      if (isValid) {
         const CallApi = async () => {
            const respone = await ApiUpdateProfile({ UserId, formData })
         }
         await CallApi();
         setIsOpenPopup(false)
      }
   }

   console.log(formData);

   return (
      <>
         <div onClick={() => setIsOpenPopup(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-20">
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} onClick={(e) => e.stopPropagation()} className="bg-[#fff] w-[40rem] rounded-[10px] min-h-[310px] z-20">
               {/* Head */}
               <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
                  <h1 className="font-bold leading-5 text-[1.5rem]">Edit Profile</h1>
                  <div onClick={() => setIsOpenPopup(false)} className='absolute top-[10px] right-[10px] cursor-pointer'>
                     <CloseIcon />
                  </div>
               </div>
               {/* Body */}
               <div className='px-[1rem] py-[1rem]'>

                  <div className='flex items-center justify-between'>
                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Name</h2>
                        <div>
                           <TextField name='name' onChange={handleFormChange} error={!!errors.name} helperText={errors?.name} style={{ width: '100%' }} variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                        </div>
                     </div>

                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Phone</h2>
                        <div>
                           <TextField name='phone' onChange={handleFormChange} error={!!errors.phone} helperText={errors?.phone} style={{ width: '100%' }} variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                        </div>
                     </div>
                  </div>

                  <div className='w-[47%]'>
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
                        Upload Gemstone Image
                        <VisuallyHiddenInput type="file" />
                     </Button>
                  </div>

                  <div className='mt-[2rem]'>
                     <Button onClick={handleSubmit} variant="contained" sx={{ minWidth: '6rem' }}>
                        <AddIcon fontSize='small' sx={{ marginRight: '8px' }} />
                        Add
                     </Button>
                  </div>
               </div>
            </motion.div>
         </div>
      </>
   )
}

export default EditAccountPopUp;