import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';

import ApiGetMasterGemstone from "../../../api/manager/ApiGetMasterGemstone";
import ApiCreateMasterGemstone from '../../../api/manager/ApiCreateMasterGemstone';
import UploadImage from '../../../utils/UploadImage';
import DeleteImage from '../../../utils/DeleteImage';

function MasterGemstonePopup({ setIsOpenPopup }) {
   const folder = 'MasterGemstone'

   const [masterGemstone, setMasterGemstone] = useState([]);

   useEffect(() => {

      const fetchApiGetMasterGemstone = async () => {
         const respone = await ApiGetMasterGemstone({});
         setMasterGemstone(respone);
      }

      fetchApiGetMasterGemstone();

   }, [])

   const [formData, setFormData] = useState({
      kind: '',
      size: '',
      price: '',
      clarity: '',
      cut: '',
      weight: '',
      shape: '',
      image: ''
   });

   const checkDuplicate = (userData, apiData) => {
      return apiData.some(item =>
         item.kind == userData.kind &&
         item.size == userData.size &&
         item.clarity == userData.clarity &&
         item.cut == userData.cut &&
         item.weight == userData.weight &&
         item.shape == userData.shape
      )
   }

   const [errors, setErrors] = useState({
      kind: '',
      size: '',
      price: '',
      clarity: '',
      cut: '',
      weight: '',
      shape: '',
      image: ''
   });

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      let errorValue = '';

      let isNotValid = true;
      try {

         if (name === 'size' || name === 'weight' || name === 'price') {
            errorValue = 'Input must be number greater than 0';
            const numberValue = Number(value)
            if ((numberValue > 0 && !isNaN(numberValue)) || value === '') {
               isNotValid = false;
            }

         } else {
            errorValue = 'This field cannot be blank';
            const numberValue = Number(value)
            if (!isNaN(numberValue) && value !== '') {
               errorValue = 'This field cannot a number';
            }
            if (value !== '' && isNaN(numberValue)) {
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

   console.log(formData)

   const handleSubmit = () => {
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

      // Kiem tra du lieu co bi trung
      if (formData.kind !== '' && formData.size !== '' && formData.price !== '' && formData.clarity !== '' && formData.cut !== '' && formData.weight !== '' && formData.shape !== '') {
         const isDuplicate = checkDuplicate(formData, masterGemstone);
         if (isDuplicate) {
            isValid = false;
            toast.error('Master Gemstone Already Exists');
         }
      }

      console.log('>>> Check success: ', isValid)

      if (isValid) {
         const CallApi = async () => {
            const respone = await ApiCreateMasterGemstone({ formData })
         }
         CallApi();
         toast.success('Create Success');
         setIsOpenPopup(false)
      }
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
         if(formData.image !== '') {
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

   

   console.log(formData);

   return (
      <>
         <div onClick={() => setIsOpenPopup(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} onClick={(e) => e.stopPropagation()} className="bg-[#fff] w-[40rem] rounded-[10px] min-h-[450px]">
               {/* Head */}
               <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
                  <h1 className="font-bold leading-5 text-[1.5rem]">Add New Gemstone</h1>
                  <div onClick={() => setIsOpenPopup(false)} className='absolute top-[10px] right-[10px] cursor-pointer'>
                     <CloseIcon />
                  </div>
               </div>
               {/* Body */}
               <div className='px-[1rem] py-[1rem]'>

                  <div className='flex items-center justify-between'>
                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Kind</h2>
                        <div>
                           <TextField name='kind' onChange={handleFormChange} error={!!errors.kind} helperText={errors?.kind} style={{ width: '100%' }} placeholder='Dimond' id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                        </div>
                     </div>

                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Size</h2>
                        <div>
                           <TextField name='size' onChange={handleFormChange} error={!!errors.size} helperText={errors?.size} style={{ width: '100%' }} placeholder='5' id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                        </div>
                     </div>
                  </div>

                  <div className='flex items-center justify-between'>
                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Clarity</h2>
                        <div>
                           <TextField name='clarity' onChange={handleFormChange} error={!!errors.clarity} helperText={errors?.clarity} style={{ width: '100%' }} placeholder='IF' id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                        </div>
                     </div>

                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Cut</h2>
                        <div>
                           <TextField name='cut' onChange={handleFormChange} error={!!errors.cut} helperText={errors?.cut} style={{ width: '100%' }} id="outlined-basic" placeholder='EX' variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                        </div>
                     </div>
                  </div>

                  <div className='flex items-center justify-between'>
                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Weight</h2>
                        <div>
                           <TextField name='weight' onChange={handleFormChange} error={!!errors.weight} helperText={errors?.weight} style={{ width: '100%' }} placeholder='0.8' id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                        </div>
                     </div>

                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Shape</h2>
                        <div>
                           <TextField name='shape' onChange={handleFormChange} error={!!errors.shape} helperText={errors?.shape} style={{ width: '100%' }} id="outlined-basic" placeholder='Round' variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                        </div>
                     </div>
                  </div>

                  <div className='flex items-center justify-between'>
                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Price</h2>
                        <div>
                           <TextField name='price' onChange={handleFormChange} error={!!errors.price} helperText={errors?.price} style={{ width: '100%' }} placeholder='1000' id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
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
                  </div>

                  <div className='mt-[1rem]'>
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

export default MasterGemstonePopup;