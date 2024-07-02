import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { ApiUpdateStone } from '../../../api/manager/ApiStone';

function UpdateStonePopup({ data, setIsOpenUpdatePopup }) {

      const [formData, setFormData] = useState({
         kind: data?.kind,
         size: data?.size,
         quantity: data?.quantity,
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

            if (name === 'price') {
               errorValue = 'Input must be number greater than 0';
               const numberValue = Number(value)
               if ((numberValue > 0 && !isNaN(numberValue))) {
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

      const handleSubmit = () => {
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

         if (isValid) {
            let id = data?.stonesId;
            const CallApi = async () => {
               const respone = await ApiUpdateStone({ id, formData })
            }
            CallApi();
            setIsOpenUpdatePopup(false)
         }
      }

      return (
         <>
            <div onClick={() => setIsOpenUpdatePopup(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
               <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} onClick={(e) => e.stopPropagation()} className="bg-[#fff] w-[30rem] rounded-[10px] min-h-[250px]">
                  {/* Head */}
                  <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
                     <h1 className="font-bold leading-5 text-[1.5rem]">Update Price</h1>
                     <div onClick={() => setIsOpenUpdatePopup(false)} className='absolute top-[10px] right-[10px] cursor-pointer'>
                        <CloseIcon />
                     </div>
                  </div>
                  {/* Body */}
                  <div className='px-[1rem] py-[1rem]'>

                     <h2 className='text-[1.1rem] font-medium pb-[3px]'>Price</h2>
                     <div>
                        <TextField name='price' onChange={handleFormChange} error={!!errors.price} helperText={errors?.price} style={{ width: '100%' }} placeholder='Dimond' id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '5.5rem' }} />
                     </div>

                     <div className='mt-[1rem]'>
                        <Button onClick={handleSubmit} variant="contained" sx={{ minWidth: '6rem' }}>
                           Update
                        </Button>
                     </div>
                  </div>
               </motion.div>
            </div>
         </>
      )
   }

export default UpdateStonePopup;