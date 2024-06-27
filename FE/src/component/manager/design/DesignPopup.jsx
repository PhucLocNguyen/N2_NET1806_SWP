import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';

function DesignPopup({ setIsOpenPopup }) {


   const [formData, setFormData] = useState({
      image: '',
      designName: '',
      description: '',
      stonesId: '',
      masterGemstoneId: '',
      managerId: '',
      typeOfJewelleryId: '',
      materialId: ''
   });

   const [errors, setErrors] = useState({
      image: '',
      designName: '',
      description: '',
      stonesId: '',
      masterGemstoneId: '',
      managerId: '',
      typeOfJewelleryId: '',
      materialId: ''
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

   return (
      <>
         <div onClick={() => setIsOpenPopup(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} onClick={(e) => e.stopPropagation()} className="bg-[#fff] w-[50rem] rounded-[10px] min-h-[450px]">
               {/* Head */}
               <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
                  <h1 className="font-bold leading-5 text-[1.5rem]">Add New Design</h1>
                  <div onClick={() => setIsOpenPopup(false)} className='absolute top-[10px] right-[10px] cursor-pointer'>
                     <CloseIcon />
                  </div>
               </div>
               {/* Body */}
               <div className='px-[1rem] py-[1rem]'>

                  <h2 className='text-[1.1rem] font-medium pb-[3px]'>Design name</h2>
                  <div>
                     <TextField name='designName' onChange={handleFormChange} error={!!errors.designName} helperText={errors?.designName} style={{ width: '100%' }} id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                  </div>

                  <h2 className='text-[1.1rem] font-medium pb-[3px]'>Design description</h2>
                  <div>
                     <textarea data-testid='textarea' name='description' onChange={handleFormChange} className='w-[100%] h-[100px] border-[1px] border-solid border-[#000]'></textarea>
                  </div>

                  <div className='flex items-center justify-between'>
                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Role</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small' error={!!errors.role}>
                           <Select
                              value={formData.role}
                              name='role'
                              onChange={handleFormChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>
                              <MenuItem value={2}>Manager</MenuItem>
                              <MenuItem value={5}>Sale Staff</MenuItem>
                              <MenuItem value={4}>Production Staff</MenuItem>
                              <MenuItem value={3}>Design Staff</MenuItem>
                           </Select>
                           {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                        </FormControl>
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
                        {/* <Button
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
                           </Button> */}
                     </div>
                  </div>

                  <div className='mt-[1rem]'>
                     <Button variant="contained" sx={{ minWidth: '6rem' }}>
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

export default DesignPopup;