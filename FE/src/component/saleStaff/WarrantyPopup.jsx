import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';

import ApiGetAllTypeWarranty from '../../api/warranty/ApiGetAllTypeWarranty';
import ApiRequirementById from '../../api/manager/FetchApiRequirementById';
import { ApiAddWarranty, ApiGetWarrantyByRequirementId } from '../../api/warranty/ApiChangeWarranty';


function WarrantyPopup({ setIsOpenPopup, requirementId }) {

   const [warrantyCardOption, setWarrantyCardOption] = useState([]);
   const [requirement, setRequirement] = useState({});
   const [date, setDate] = useState();
   const [openDialog, setOpenDialog] = useState(false)

   const BootstrapDialog = styled(Dialog)(({ theme }) => ({
      '& .MuiDialogContent-root': {
         padding: theme.spacing(2),
      },
      '& .MuiDialogActions-root': {
         padding: theme.spacing(1),
      },
   }));

   const [formData, setFormData] = useState({
      warrantyCardId: '',
      requirementId: requirementId,
      dateCreated: '',
      expirationDate: '',
   });

   const [errors, setErrors] = useState({
      warrantyCardId: '',
      requirementId: '',
      dateCreated: '',
      expirationDate: '',
   });

   // Thuc hien luon cong viec filter
   const fetchApiGetAllTypeWarranty = async () => {
      const responseAll = await ApiGetAllTypeWarranty();
      const responseSelected = await fetchWarrantyByRequirementId()
      console.log('>> ', responseAll);
      console.log('>>> ', responseSelected);
      let data = filterOption(responseAll, responseSelected)
      setWarrantyCardOption(data)
   }

   const fetchApiRequirementById = async () => {
      const response = await ApiRequirementById(requirementId);
      setRequirement(response)
      setDate(response?.createdDate)
      return response
   }

   const fetchWarrantyByRequirementId = async () => {
      const response = await ApiGetWarrantyByRequirementId(requirementId);
      return response;
   }

   const filterOption = (all, selected) => {
      let filterData = all;
      filterData = filterData.filter(item => {
         return !selected.some(itemSelected => itemSelected?.warrantyCard?.warrantyCardId == item?.warrantyCardId);
      })
      console.log('>>>', filterData);
      return filterData;
   }

   useEffect(() => {

      fetchApiGetAllTypeWarranty();
      fetchApiRequirementById();
      // fetchWarrantyByRequirementId();

   }, [])


   const isAfter = (date1, date2) => {
      return new Date(date1) > new Date(date2);
   };

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      let errorValue = '';
      let errorValueCreate = errors.dateCreated ? errors.dateCreated : '';
      let errorValueExpiration = errors.expirationDate ? errors.expirationDate : '';

      let isNotValid = true;
      let isNotValidForDateCreate = true;
      let isNotValidForExpirationDate = true;

      try {

         if (name === 'dateCreated') {
            errorValueCreate = `Date create must be greater than ${date} ${formData.expirationDate != '' ? 'and smaller than expirationdate ' : ''}`;

            // Dung de kiem tra cho date create
            let checkValidAfterOrderDate = isAfter(value, date);   // For date order
            let checkValidBeforeExpirationDate = isAfter(formData.expirationDate, value); // Tra ve false la dung
            console.log('>>> 1 : ', checkValidAfterOrderDate);
            console.log('>>> 2 : ', checkValidBeforeExpirationDate);


            // Dung de kiem tra cho date expiration
            if (formData.expirationDate != '') {
               let checkExpirationAfterCreateDate = isAfter(formData.expirationDate, value);
               let checkExpirationAfterOrderDate = isAfter(formData.expirationDate, date);
               if (checkExpirationAfterCreateDate && checkExpirationAfterOrderDate) {
                  errorValueExpiration = '';
               }
               if (checkValidAfterOrderDate && checkValidBeforeExpirationDate) {
                  isNotValidForDateCreate = false;
               }
            } else {
               if (checkValidAfterOrderDate) {
                  isNotValidForDateCreate = false;
               }
            }



         } else if (name === 'expirationDate') {
            errorValueExpiration = `Date expiration must be greater than date create and date order`;

            // Dung de kiem tra cho date expiration
            let checkValidAfterCreateDate = isAfter(value, formData.dateCreated);  // For date create
            let checkValidAfterOrderDate = isAfter(value, date);   // For date order

            // Dung de kiem tra cho date create
            let checkDateValidForCreateDate = isAfter(formData.dateCreated, date);
            let checkDateNotValidForExpirationDate = isAfter(formData.dateCreated, value);

            if (checkDateValidForCreateDate && checkDateNotValidForExpirationDate == false) {
               errorValueCreate = ''
               console.log('Check point');
            }

            if (checkValidAfterCreateDate && checkValidAfterOrderDate) {
               isNotValidForExpirationDate = false;
            }

         } else if (name === 'warrantyCardId') {
            errorValue = 'This field cannot be blank';
            if (value !== '') {
               isNotValid = false
            }
         }

      } catch (error) {
         isNotValid = true
      }

      setFormData({
         ...formData,
         [name]: value
      });

      if (name === 'warrantyCardId') {
         setErrors({
            ...errors,
            [name]: isNotValid ? errorValue : ''
         })
      }

      if (name === 'dateCreated' || name === 'expirationDate') {
         setErrors({
            ...errors,
            dateCreated: isNotValidForDateCreate ? errorValueCreate : '',
            expirationDate: isNotValidForExpirationDate ? errorValueExpiration : ''
         })
      }


   }

   const handleConfirm = () => {
      let isValid = true;
      let newError = {};

      Object.keys(errors).forEach((key) => {
         if (errors[key] !== '') {
            isValid = false;
         }
      });

      Object.keys(formData).forEach((key) => {
         if (key == 'warrantyCardId' || key == 'dateCreated' || key == 'expirationDate') {
            if (formData[key] === '') {
               newError[key] = 'This field cannot be blank';
               isValid = false;
            }
         }
      });

      if (isValid) {
         setOpenDialog(true);
      }

   }

   const handleSaveWarranty = async (e) => {
      e.stopPropagation();
      const response = await ApiAddWarranty({ formData })
      setOpenDialog(false)
      setIsOpenPopup(false)
   }

   const handleClose = (e) => {
      e.stopPropagation();
      setOpenDialog(false);
   };

   console.log(formData)
   console.log(warrantyCardOption)

   return (
      <>
         <div onClick={() => setIsOpenPopup(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} onClick={(e) => e.stopPropagation()} className="bg-[#fff] w-[45rem] rounded-[10px] min-h-[300px]">
               {/* Head */}
               <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
                  <h1 className="font-bold leading-5 text-[1.5rem]">Add Warranty</h1>
                  <div onClick={() => setIsOpenPopup(false)} className='absolute top-[10px] right-[10px] cursor-pointer'>
                     <CloseIcon />
                  </div>
               </div>
               {/* Body */}
               <div className='px-[1rem] py-[1rem]'>

                  <div className='flex items-center justify-between'>
                     <div className='w-[100%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Type Warranty</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small' error={!!errors.warrantyCardId}>
                           <Select
                              value={formData.warrantyCardId}
                              name='warrantyCardId'
                              onChange={handleFormChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>
                              {warrantyCardOption?.map((item, index) => {
                                 return (
                                    <MenuItem key={index} value={item?.warrantyCardId}>{item?.title}</MenuItem>
                                 )
                              })}
                           </Select>
                           {errors.warrantyCardId && <FormHelperText>{errors.warrantyCardId}</FormHelperText>}
                        </FormControl>
                     </div>
                  </div>

                  <div className='flex items-center justify-between mt-[1rem]'>
                     <div className='w-[47%]'>
                        <TextField
                           id="date"
                           label="Date Created"
                           name='dateCreated'
                           value={formData.dateCreated}
                           onChange={handleFormChange}
                           type="date"
                           size='small'
                           InputLabelProps={{
                              shrink: true,
                              style: { fontWeight: 'bold' }
                           }}
                           sx={{
                              width: '100%',
                              minHeight: '5rem'
                           }}
                           error={!!errors.dateCreated} helperText={errors?.dateCreated}
                        />
                     </div>

                     <div className='w-[47%]'>
                        <TextField
                           id="date"
                           label="Expiration Date"
                           name='expirationDate'
                           value={formData.expirationDate}
                           onChange={handleFormChange}
                           type="date"
                           size='small'
                           InputLabelProps={{
                              shrink: true,
                              style: { fontWeight: 'bold' }
                           }}
                           sx={{
                              width: '100%',
                              minHeight: '5rem'
                           }}
                           disabled={!formData.dateCreated}
                           error={!!errors.expirationDate} helperText={errors?.expirationDate}
                        />
                     </div>
                  </div>

                  <div className='mt-[1rem]'>
                     <Button onClick={handleConfirm} variant="contained" sx={{ minWidth: '6rem' }}>
                        <AddIcon fontSize='small' sx={{ marginRight: '8px' }} />
                        Add
                     </Button>
                  </div>
               </div>
            </motion.div>

            <BootstrapDialog
               onClose={handleClose}
               aria-labelledby="customized-dialog-title"
               open={openDialog}
            >
               <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" onClick={(e) => e.stopPropagation()}>
                  Warranty Confirmation
               </DialogTitle>
               <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                     position: 'absolute',
                     right: 8,
                     top: 8,
                     color: (theme) => theme.palette.grey[500],
                  }}
               >
                  <CloseIcon />
               </IconButton>
               <DialogContent dividers onClick={(e) => e.stopPropagation()}>
                  <Typography gutterBottom>
                     After adding warranty to the product, you will not be able to change any information. Please confirm the information before clicking the save changes button.
                  </Typography>
               </DialogContent>
               <DialogActions onClick={(e) => e.stopPropagation()}>
                  <Button autoFocus onClick={handleSaveWarranty}>
                     Save changes
                  </Button>
               </DialogActions>
            </BootstrapDialog>
         </div>
      </>
   )
}

export default WarrantyPopup;