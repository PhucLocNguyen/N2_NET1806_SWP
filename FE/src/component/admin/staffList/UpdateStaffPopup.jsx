import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { ApiModifyStaff } from '../../../api/admin/ApiAdmin';

function UpdateStaffPopup({ data, setIsOpenUpdatePopup }) {

   const [newData, setNewData] = useState({
      username: '',
      password: ''
   })

   const [errors, setErrors] = useState({
      username: '',
      password: ''
   });

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      let errorValue = '';

      let isNotValid = true;
      try {

         if (name == 'username' || name == 'password') {
            errorValue = 'This field cannot be blank';
            if (value !== '') {
               isNotValid = false
            }
         }

      } catch (error) {
         isNotValid = true
      }

      setNewData({
         ...newData,
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

      Object.keys(newData).forEach((key) => {
         if (newData[key] === '') {
            newError[key] = 'This field cannot be blank';
            isValid = false;
         }
      })

      setErrors(newError);

      if (isValid) {
         let id = data.usersId
         let payload = [
            {
               "path": "username",
               "op": "replace",
               "value": newData.username
            },
            {
               "path": "password",
               "op": "replace",
               "value": newData.password
            }
         ]

         await ApiModifyStaff({ payload, id })
         setIsOpenUpdatePopup(false)
      }

   }

   console.log('>>> data update staff :', data)

   return (
      <>
         <div onClick={() => setIsOpenUpdatePopup(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} onClick={(e) => e.stopPropagation()} className="bg-[#fff] w-[40rem] rounded-[10px] min-h-[400px]">
               {/* Head */}
               <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
                  <h1 className="font-bold leading-5 text-[1.5rem]">Edit Staff Infomation</h1>
                  <div onClick={() => setIsOpenUpdatePopup(false)} className='absolute top-[10px] right-[10px] cursor-pointer'>
                     <CloseIcon />
                  </div>
               </div>
               {/* Body */}
               <div className='px-[1rem] py-[1rem]'>

                  <h2 className='text-[1.1rem] font-medium pb-[3px]'>Email</h2>
                  <div>
                     <TextField name='email' value={data?.email} style={{ width: '100%' }} disabled placeholder='hung@gmail.com' id="outlined-basic" variant="outlined" size='small' InputProps={{ readOnly: true }} />
                  </div>

                  <h2 className='text-[1.1rem] font-medium pb-[3px] mt-[1rem]'>Role : {data.roleId == 2 ? 'Manager' : (data.roleId == 3 ? 'Design' : (data.roleId == 4 ? 'Production' : (data.roleId == 5 ? 'Sale' : '')))}</h2>

                  <div className='flex items-center justify-between mt-[1rem]'>
                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Username</h2>
                        <div>
                           <TextField name='username' onChange={handleFormChange} error={!!errors.username} helperText={errors.username} style={{ width: '100%' }} variant="outlined" size='small' sx={{ minHeight: '5.5rem' }} />
                        </div>
                     </div>

                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Password</h2>
                        <div>
                           <TextField name='password' onChange={handleFormChange} error={!!errors.password} helperText={errors.password} style={{ width: '100%' }} variant="outlined" size='small' sx={{ minHeight: '5.5rem' }} />
                        </div>
                     </div>

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

export default UpdateStaffPopup;