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
import FormHelperText from '@mui/material/FormHelperText';
import { toast } from 'react-toastify';

import { ApigGetTypeOfJewellery, ApiCreateParentDesign } from '../../../api/manager/ApiDesign';
import { FetchApiDesignRuleById } from '../../../api/Requirements/FetchApiDesignRule';
import { FetchApiMasterGemstone } from '../../../api/Requirements/FetchApiMasterGemstone';
import { FetchApiStones } from '../../../api/Requirements/FetchApiStones';
import { FetchApiMaterial } from '../../../api/Requirements/FetchApiMaterial';
import UploadImage from '../../../utils/UploadImage';
import DeleteImage from '../../../utils/DeleteImage';
import useAuth from '../../../hooks/useAuth';

function DesignPopup({ setIsOpenPopup }) {
   const folder = 'Design';
   const { UserId } = useAuth();

   const [dataMasterGemstone, setDataMasterGemstone] = useState([]);
   const [dataTypeOfJewellery, setDataTypeOfJewellery] = useState([]);
   const [dataMeleeStone, setDataMeleeStone] = useState([]);
   const [dataMaterial, setDataMaterial] = useState([]);

   //Form gui du lieu di
   const [formData, setFormData] = useState({
      image: '',
      designName: '',
      description: '',
      stonesId: '',
      masterGemstoneId: '',
      managerId: UserId,
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

   // Master gemstone
   const [masterGemstoneSelect, setMasterGemstoneSelect] = useState({
      selectedKind: '',
      selectedSize: '',
      selectedShape: ''
   });

   const [masterGemstoneOption, setMasterGemstoneOption] = useState({
      optionKind: [],
      optionSize: [],
      optionShape: []
   });

   const filterOptions = () => {
      let filteredData = dataMasterGemstone;
      if (masterGemstoneSelect.selectedKind) {
         filteredData = filteredData.filter(item => item.kind == masterGemstoneSelect.selectedKind);
      }
      if (masterGemstoneSelect.selectedSize) {
         filteredData = filteredData.filter(item => item.size == masterGemstoneSelect.selectedSize);
      }
      if (masterGemstoneSelect.selectedShape) {
         filteredData = filteredData.filter(item => item.shape == masterGemstoneSelect.selectedShape);
      }
      const kindOptions = [...new Set(filteredData.map(item => item.kind))];
      const sizeOptions = [...new Set(filteredData.map(item => item.size))];
      const shapeOptions = [...new Set(filteredData.map(item => item.shape))];

      setMasterGemstoneOption({
         optionKind: kindOptions,
         optionSize: sizeOptions,
         optionShape: shapeOptions
      });
   };

   useEffect(() => {
      const kindOptions = [...new Set(dataMasterGemstone.map(item => item.kind))];
      const sizeOptions = [...new Set(dataMasterGemstone.map(item => item.size))];
      const shapeOptions = [...new Set(dataMasterGemstone.map(item => item.shape))];

      setMasterGemstoneOption({
         optionKind: kindOptions,
         optionSize: sizeOptions,
         optionShape: shapeOptions
      });
   }, [dataMasterGemstone]);

   useEffect(() => {

      filterOptions();
      if (masterGemstoneSelect.selectedKind !== '' && masterGemstoneSelect.selectedSize !== '' && masterGemstoneSelect.selectedShape !== '') {
         const filterData = dataMasterGemstone.filter(item =>
            item.kind.toLowerCase() == masterGemstoneSelect.selectedKind.toLowerCase() &&
            item.size.toString().toLowerCase() == masterGemstoneSelect.selectedSize.toString().toLowerCase() &&
            item.shape.toLowerCase() == masterGemstoneSelect.selectedShape.toLowerCase()
         )
         console.log(filterData[0])
         setFormData({
            ...formData,
            masterGemstoneId: filterData[0].masterGemstoneId
         })
      }

   }, [masterGemstoneSelect.selectedKind, masterGemstoneSelect.selectedSize, masterGemstoneSelect.selectedShape])

   const handleMasterGemstoneSelectChange = (e) => {
      const { name, value } = e.target;
      setMasterGemstoneSelect({
         ...masterGemstoneSelect,
         [name]: value
      })
   }
   // ---------------------------

   // Melee Stone

   const [meleeStoneSelect, setMeleeStoneSelect] = useState({
      selectedMeleeKind: '',
      selectedMeleeSize: '',
      selectedMeleeQuantity: ''
   });

   const [meleeStoneOption, setMeleeStoneOption] = useState({
      optionMeleeKind: [],
      optionMeleeSize: [],
      optionMeleeQuantity: []
   });

   const FilterMeleeStoneOption = () => {
      let filteredData = dataMeleeStone;
      if (meleeStoneSelect.selectedMeleeKind) {
         filteredData = filteredData.filter(item => item.kind == meleeStoneSelect.selectedMeleeKind);
      }
      if (meleeStoneSelect.selectedMeleeSize) {
         filteredData = filteredData.filter(item => item.size == meleeStoneSelect.selectedMeleeSize);
      }
      if (meleeStoneSelect.selectedMeleeQuantity) {
         filteredData = filteredData.filter(item => item.quantity == meleeStoneSelect.selectedMeleeQuantity);
      }

      const kindOptions = [...new Set(filteredData.map(item => item.kind))];
      const sizeOptions = [...new Set(filteredData.map(item => item.size))];
      const quantityOptions = [...new Set(filteredData.map(item => item.quantity))];

      setMeleeStoneOption({
         optionMeleeKind: kindOptions,
         optionMeleeSize: sizeOptions,
         optionMeleeQuantity: quantityOptions
      });
   }


   useEffect(() => {

      const kindOptions = [...new Set(dataMeleeStone.map(item => item.kind))];
      const sizeOptions = [...new Set(dataMeleeStone.map(item => item.size))];
      const quantityOptions = [...new Set(dataMeleeStone.map(item => item.quantity))];

      setMeleeStoneOption({
         optionMeleeKind: kindOptions,
         optionMeleeSize: sizeOptions,
         optionMeleeQuantity: quantityOptions
      });

   }, [dataMeleeStone])

   useEffect(() => {

      FilterMeleeStoneOption();
      if (meleeStoneSelect.selectedMeleeKind !== '' && meleeStoneSelect.selectedMeleeSize !== '' && meleeStoneSelect.selectedMeleeQuantity !== '') {
         const filterData = dataMeleeStone.filter(item =>
            item.kind.toLowerCase() == meleeStoneSelect.selectedMeleeKind.toLowerCase() &&
            item.size.toString().toLowerCase() == meleeStoneSelect.selectedMeleeSize.toString().toLowerCase() &&
            item.quantity.toString().toLowerCase() == meleeStoneSelect.selectedMeleeQuantity.toString().toLowerCase()
         )
         console.log('>>> Melee: ', filterData[0])
         setFormData({
            ...formData,
            stonesId: filterData[0].stonesId
         })
      }

   }, [meleeStoneSelect.selectedMeleeKind, meleeStoneSelect.selectedMeleeSize, meleeStoneSelect.selectedMeleeQuantity])

   const handleMeleeStoneSelectChange = (e) => {
      const { name, value } = e.target;
      setMeleeStoneSelect({
         ...meleeStoneSelect,
         [name]: value
      })
   }

   // ----------------------------

   const FetchApigGetTypeOfJewellery = async () => {
      const response = await ApigGetTypeOfJewellery();
      setDataTypeOfJewellery(response);
   }

   const FetchApiGetMaterial = async () => {
      const response = await FetchApiMaterial();
      setDataMaterial(response);
   }

   const FetchApiGetMeleeStone = async () => {
      const response = await FetchApiStones();
      setDataMeleeStone(response);
   }

   const FetchApiGetMasterGemstoneByRule = async (designRule) => {
      const response = await FetchApiMasterGemstone(designRule.minSizeMasterGemstone, designRule.maxSizeMasterGemstone);
      setDataMasterGemstone(response);
   }

   // Get design rule and get master gemstone by rule
   const FetchApiDesignRule = async () => {
      let id = formData.typeOfJewelleryId;
      if (id !== '') {
         const response = await FetchApiDesignRuleById(id);
         console.log(response)
         await FetchApiGetMasterGemstoneByRule(response);
      }
   }

   useEffect(() => {

      FetchApigGetTypeOfJewellery();
      FetchApiGetMeleeStone();
      FetchApiGetMaterial();

   }, [])

   useEffect(() => {

      FetchApiDesignRule();

   }, [formData.typeOfJewelleryId])

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      let errorValue = '';

      let isNotValid = true;
      try {

         if (name === 'designName' || name === 'description' || name === 'typeOfJewelleryId' || name === 'materialId') {
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

   const handleSubmit = () => {
      let isValid = true;
      let newError = {};

      Object.keys(errors).forEach((key) => {
         if (errors[key] !== '') {
            isValid = false;
         }
      });

      Object.keys(formData).forEach((key) => {
         if (key == 'image' || key == 'designName' || key == 'description' || key == 'managerId' || key == 'typeOfJewelleryId') {
            if (formData[key] === '') {
               newError[key] = 'This field cannot be blank';
               isValid = false;
            }
         }
      });

      if (isValid) {
         let payload = formData;
         if (payload.masterGemstoneId == '') {
            delete payload['masterGemstoneId']
         }
         if (payload.stonesId == '') {
            delete payload['stonesId']
         }
         console.log(payload)
         const CallApi = async () => {
            const response = await ApiCreateParentDesign({ payload });
         }
         CallApi();
         setIsOpenPopup(false);
      }

   }

   console.log(formData)

   return (
      <>
         <div onClick={() => setIsOpenPopup(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} onClick={(e) => e.stopPropagation()} className="bg-[#fff] w-[50rem] rounded-[10px] min-h-[450px] min-w-[70%]">
               {/* Head */}
               <div className="relative text-center border-b-[1px] border-solid border-[#333] px-[1rem] py-[1rem] ">
                  <h1 className="font-bold leading-5 text-[1.5rem]">Add New Design</h1>
                  <div onClick={() => setIsOpenPopup(false)} className='absolute top-[10px] right-[10px] cursor-pointer'>
                     <CloseIcon />
                  </div>
               </div>
               {/* Body */}
               <div className='px-[1rem] py-[1rem]'>
                  <div className='flex items-center justify-between'>
                     <div className='w-[47%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Design name</h2>
                        <div>
                           <TextField name='designName' onChange={handleFormChange} error={!!errors.designName} helperText={errors?.designName} style={{ width: '100%' }} id="outlined-basic" variant="outlined" size='small' sx={{ minHeight: '4rem' }} />
                        </div>
                     </div>

                     {/* Select type of jewellery */}
                     <div className='w-[47%]'>

                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Type</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small' error={!!errors.role}>
                           <Select
                              value={formData.typeOfJewelleryId}
                              name='typeOfJewelleryId'
                              onChange={handleFormChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>

                              {dataTypeOfJewellery.map((item, index) => {
                                 return (
                                    <MenuItem key={index} value={item.typeOfJewelleryId}>{item.name}</MenuItem>
                                 )
                              })}

                           </Select>
                           {errors.typeOfJewelleryId && <FormHelperText>{errors.typeOfJewelleryId}</FormHelperText>}
                        </FormControl>

                     </div>
                  </div>

                  {/* ------------------------------ */}

                  <h2 className='text-[1.1rem] font-medium pb-[3px]'>Design description</h2>
                  <div>
                     <textarea data-testid='textarea' name='description' onChange={handleFormChange} className='w-[100%] h-[100px] border-[1px] border-solid border-[#000]'></textarea>
                     {errors.description && <FormHelperText>{errors.description}</FormHelperText>}
                  </div>

                  {/* ------------------------------ */}

                  <h1 className='text-[1.5rem] font-bold pb-[3px]'>Master Gemstone</h1>

                  <div className='flex items-center justify-between'>
                     <div className='w-[30%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Kind</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small'>
                           <Select
                              value={masterGemstoneSelect.selectedKind}
                              name='selectedKind'
                              onChange={handleMasterGemstoneSelectChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              disabled={!formData.typeOfJewelleryId}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>
                              {masterGemstoneOption.optionKind.map((item, index) => {
                                 return (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                 )
                              })}
                           </Select>
                        </FormControl>
                     </div>

                     <div className='w-[30%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Size</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small'>
                           <Select
                              value={masterGemstoneSelect.selectedSize}
                              name='selectedSize'
                              onChange={handleMasterGemstoneSelectChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              disabled={!formData.typeOfJewelleryId}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>
                              {masterGemstoneOption.optionSize.map((item, index) => {
                                 return (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                 )
                              })}
                           </Select>
                        </FormControl>
                     </div>

                     <div className='w-[30%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Shape</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small'>
                           <Select
                              value={masterGemstoneSelect.selectedShape}
                              name='selectedShape'
                              onChange={handleMasterGemstoneSelectChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              disabled={!formData.typeOfJewelleryId}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>
                              {masterGemstoneOption.optionShape.map((item, index) => {
                                 return (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                 )
                              })}
                           </Select>
                        </FormControl>
                     </div>
                  </div>

                  {/* ----------------------------------------- */}

                  <h1 className='text-[1.5rem] font-bold pb-[3px]'>Melee Stones</h1>

                  <div className='flex items-center justify-between'>
                     <div className='w-[30%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Kind</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small'>
                           <Select
                              value={meleeStoneSelect.selectedMeleeKind}
                              name='selectedMeleeKind'
                              onChange={handleMeleeStoneSelectChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              disabled={!formData.typeOfJewelleryId}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>
                              {meleeStoneOption.optionMeleeKind.map((item, index) => {
                                 return (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                 )
                              })}
                           </Select>
                        </FormControl>
                     </div>

                     <div className='w-[30%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Size</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small'>
                           <Select
                              value={meleeStoneSelect.selectedMeleeSize}
                              name='selectedMeleeSize'
                              onChange={handleMeleeStoneSelectChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              disabled={!formData.typeOfJewelleryId}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>
                              {meleeStoneOption.optionMeleeSize.map((item, index) => {
                                 return (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                 )
                              })}
                           </Select>
                        </FormControl>
                     </div>

                     <div className='w-[30%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Quantity</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small'>
                           <Select
                              value={meleeStoneSelect.selectedMeleeQuantity}
                              name='selectedMeleeQuantity'
                              onChange={handleMeleeStoneSelectChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              disabled={!formData.typeOfJewelleryId}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>
                              {meleeStoneOption.optionMeleeQuantity.map((item, index) => {
                                 return (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                 )
                              })}
                           </Select>
                        </FormControl>
                     </div>
                  </div>

                  {/* ------------------------------------- */}

                  <div className='flex items-center justify-between'>
                     <div className='w-[30%]'>
                        <h2 className='text-[1.1rem] font-medium pb-[3px]'>Material</h2>
                        <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small' error={!!errors.materialId}>
                           <Select
                              value={formData.materialId}
                              name='materialId'
                              onChange={handleFormChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              disabled={!formData.typeOfJewelleryId}
                              MenuProps={{
                                 PaperProps: {
                                    sx: {
                                       maxHeight: '200px',
                                       overflow: 'auto'
                                    }
                                 }
                              }}
                           >
                              <MenuItem value=''>
                                 <em>None</em>
                              </MenuItem>

                              {dataMaterial.map((item, index) => {
                                 return (
                                    <MenuItem key={index} value={item.materialId}>{item.name}</MenuItem>
                                 )
                              })}

                           </Select>
                           {errors.materialId && <FormHelperText>{errors.materialId}</FormHelperText>}
                        </FormControl>
                     </div>

                     <div className='w-[30%]'>
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

                     <div className='w-[30%]'>

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

export default DesignPopup;