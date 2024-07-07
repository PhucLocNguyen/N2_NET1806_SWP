import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';

import { ApiCreateStone } from '../../../api/manager/ApiStone';

function StonePopup({ setIsOpenPopup }) {

      const [formData, setFormData] = useState({
         kind: '',
         size: '',
         quantity: '',
         price: ''
      });

      const [errors, setErrors] = useState({
         kind: '',
         size: '',
         quantity: '',
         price: ''
      });

      const handleFormChange = (e) => {
         const { name, value } = e.target;
         let errorValue = '';

         let isNotValid = true;
         try {

            if (name === 'size' || name === 'quantity' || name === 'price') {
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

      const handleSubmit = async () => {
         let isValid = true;
         let newError = {};

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

         console.log('>>> Check success: ', isValid)

         if (isValid) {
            const CallApi = async () => {
               const respone = await ApiCreateStone({ formData })
            }
            await CallApi();
            setIsOpenPopup(false)
         }
      }

      console.log(formData)

      return (
         <>
            <div onClick={() => setIsOpenPopup(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
               <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} onClick={(e) => e.stopPropagation()} className="bg-[#fff] w-[40rem] rounded-[10px] min-h-[350px]">
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
                              <TextField name='kind' onChange={handleFormChange} error={!!errors.kind} helperText={errors?.kind} style={{ width: '100%' }} placeholder='CZ' id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
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
                           <h2 className='text-[1.1rem] font-medium pb-[3px]'>Quantity</h2>
                           <div>
                              <TextField name='quantity' onChange={handleFormChange} error={!!errors.quantity} helperText={errors?.quantity} style={{ width: '100%' }} placeholder='IF' id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                           </div>
                        </div>

                        <div className='w-[47%]'>
                           <h2 className='text-[1.1rem] font-medium pb-[3px]'>Price</h2>
                           <div>
                              <TextField name='price' onChange={handleFormChange} error={!!errors.price} helperText={errors?.price} style={{ width: '100%' }} id="outlined-basic" placeholder='EX' variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                           </div>
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

export default StonePopup;