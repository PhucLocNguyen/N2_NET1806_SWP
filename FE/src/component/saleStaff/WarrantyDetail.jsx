import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


import ApiRequirementById from '../../api/manager/FetchApiRequirementById';
import { fetchApiDesignById } from '../../api/FetchApiDesign';
import WarrantyPopup from './WarrantyPopup';
import { ApiGetWarrantyByRequirementId } from '../../api/warranty/ApiChangeWarranty';
import ApiUpdateRequirement from '../../api/manager/ApiUpdateRequirement';

function WarrantyDetail() {
   const { id } = useParams(); // requirement id
   const navigate = useNavigate();

   const [design, setDesign] = useState();
   const [requirement, setRequirement] = useState();
   const [isOpenPopup, setIsOpenPopup] = useState(false);
   const [warranty, setWarranty] = useState();
   const [openDialog, setOpenDialog] = useState(false)
   const [formData, setFormData] = useState({

   })

   const fetchData = async () => {

      const requirementRespone = await ApiRequirementById(id);
      setRequirement(requirementRespone)

      const dataDesignId = requirementRespone?.designId;

      const designRespone = await fetchApiDesignById(dataDesignId);
      setDesign(designRespone)

   }

   const fetchWarrantyByRequirementId = async () => {
      const response = await ApiGetWarrantyByRequirementId(id);
      setWarranty(response);
   }

   useEffect(() => {
      fetchData();
   }, [])

   useEffect(() => {
      fetchWarrantyByRequirementId();
   }, [isOpenPopup])

   const BootstrapDialog = styled(Dialog)(({ theme }) => ({
      '& .MuiDialogContent-root': {
         padding: theme.spacing(2),
      },
      '& .MuiDialogActions-root': {
         padding: theme.spacing(1),
      },
   }));


   const handleOpen = (e) => {
      e.stopPropagation();
      setOpenDialog(true);
   }

   const handleClose = (e) => {
      e.stopPropagation();
      setOpenDialog(false);
   };

   const CallApiUpdateRequirement = async (data, id) => {
      const response = await ApiUpdateRequirement({ data, id });
   }

   const handleSave = async () => {
      let data = {
         ...requirement,
         status: '12'
      }
      await CallApiUpdateRequirement(data, id)
      // Chuyen huong
      navigate('/staff/warranty', { replace: true })
   }

   console.log(warranty)

   return (
      <>
         {requirement?.status == 11 ?
            <div className="py-[3rem] px-[3rem] min-h-[100vh] bg-[#f7f9fc]">
               <div className="grid grid-cols-3 gap-x-[1.5rem]">
                  {/* Ben trai */}
                  <div className="col-span-2 ">
                     <div className="py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]" >

                        <div>
                           <h2 className="text-[32px] font-bold ">Order #{id}</h2>
                        </div>

                        <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

                        <div>
                           <h2 className="text-[22px] mb-[1rem] font-bold leading-[1.273em]">{design?.designName}</h2>
                           <div className="flex ">
                              <img className="w-[15rem] h-[15rem]" src={design?.image} />
                              <p className="ml-[1rem] text-[#6f7182]">
                                 {design?.description}
                              </p>
                           </div>
                        </div>

                        <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

                        <div>
                           <h2 className="text-[32px] mb-[1rem] font-bold leading-[1.273em]">Customer Requirement</h2>

                           {/* Bang thong tin tong the */}
                           <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">General Information</h2>
                           <table className='table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]'>
                              <thead className='bg-[#eccc68] border-[1px] border-solid border-[#000]'>
                                 <tr>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Jewelry Type</th>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Jewelry Size</th>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Jewelry Material</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>

                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{design?.typeOfJewellery?.name}</td>
                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{requirement?.size}</td>
                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{design?.material?.name}</td>

                                 </tr>
                              </tbody>
                           </table>

                           <div className='my-[1rem]'></div>

                           {/* Bang thong tin cho hat chu */}
                           <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">Master Gemstone</h2>
                           <table className='table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]'>
                              <thead className='bg-[#eccc68] border-[1px] border-solid border-[#000]'>
                                 <tr>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Kind</th>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Size</th>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Weight</th>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Shape</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{design?.masterGemstone?.kind}</td>
                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{design?.masterGemstone?.size}</td>
                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{design?.masterGemstone?.weight}</td>
                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{design?.masterGemstone?.shape}</td>
                                 </tr>
                              </tbody>
                           </table>

                           <div className='my-[1rem]'></div>

                           {/* Bang thong tin cho hat tam */}
                           <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">Stones</h2>
                           <table className='table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]'>
                              <thead className='bg-[#eccc68] border-[1px] border-solid border-[#000]'>
                                 <tr>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Kind</th>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Size</th>
                                    <th className='px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]'>Quantity</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{design?.stone?.kind}</td>
                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{design?.stone?.size}</td>
                                    <td className='px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]'>{design?.stone?.quantity}</td>
                                 </tr>
                              </tbody>
                           </table>

                        </div>

                     </div>


                  </div>

                  {/* Ben phai */}
                  <div className='sticky top-[24px]  py-[2.5rem] px-[2rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]'>

                     <div className='flex item justify-between items-center'>
                        <h2 className='text-[22px] font-bold leading-[1.273em]'>Warranty</h2>
                        <Button onClick={() => setIsOpenPopup(true)} size='small' variant="contained" sx={{ minWidth: '6rem' }}>
                           Add Warranty
                        </Button>
                     </div>

                     <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>


                     {
                        warranty?.map((item, index) => {
                           let dateCreatedObj = new Date(item?.dateCreated);
                           let expirationDateObj = new Date(item?.expirationDate);

                           let formattedDateCreated = `${dateCreatedObj.getFullYear()}-${String(dateCreatedObj.getMonth() + 1).padStart(2, '0')}-${String(dateCreatedObj.getDate()).padStart(2, '0')}`;
                           let formattedDateExpiration = `${expirationDateObj.getFullYear()}-${String(expirationDateObj.getMonth() + 1).padStart(2, '0')}-${String(expirationDateObj.getDate()).padStart(2, '0')}`;

                           return (
                              <Accordion key={index}>
                                 <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                 >
                                    <Typography sx={{ fontWeight: 'bold' }} >{item?.warrantyCard?.title}</Typography>
                                 </AccordionSummary>
                                 <AccordionDetails>
                                    <Typography>{item?.warrantyCard?.description}</Typography>
                                    <Typography>Date Created: {formattedDateCreated}</Typography>
                                    <Typography>Expiration Date: {formattedDateExpiration}</Typography>
                                 </AccordionDetails>
                              </Accordion>
                           )
                        })
                     }

                     <div className='mt-[2rem]'>
                        <Button onClick={handleOpen} size='small' variant="contained" sx={{ minWidth: '6rem' }}>
                           Warranty Complete
                        </Button>
                     </div>

                  </div>

               </div>

               <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={openDialog}
               >
                  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" onClick={(e) => e.stopPropagation()}>
                     Confirmed completion
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
                        After clicking the complete button, the order will not be able to add any warranty.
                     </Typography>
                  </DialogContent>
                  <DialogActions onClick={(e) => e.stopPropagation()}>
                     <Button onClick={handleSave} autoFocus>
                        Complete
                     </Button>
                  </DialogActions>
               </BootstrapDialog>

            </div>
            : <div></div>}
         {isOpenPopup && <WarrantyPopup setIsOpenPopup={setIsOpenPopup} requirementId={id} />}
      </>
   )
}

export default WarrantyDetail;