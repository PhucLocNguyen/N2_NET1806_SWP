import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import ApiRequirementById from '../../api/manager/FetchApiRequirementById';
import { fetchApiDesignById } from '../../api/FetchApiDesign';
import formatVND from '../../utils/FormatCurrency';
import ApiUpdateRequirement from '../../api/manager/ApiUpdateRequirement';

function OrderSupportDetail() {
   const navigate = useNavigate();
   const { id } = useParams(); // requirement id

   const [requirement, setRequirement] = useState();
   const [design, setDesign] = useState();
   const [staffNote, setStaffNote] = useState("");
   // Thong tin form de dang len

   useEffect(() => {

      const fetchData = async () => {

         const requirementRespone = await ApiRequirementById(id);
         setRequirement(requirementRespone)

         const dataDesignId = requirementRespone?.designId;

         const designRespone = await fetchApiDesignById(dataDesignId);
         setDesign(designRespone)

      }

      fetchData();

   }, [])
   const HandleChangeData = (e) => {
    const valueInput = e.target.value;
   setStaffNote(valueInput);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedOnChange = useCallback(debounce(HandleChangeData, 500), []);

   const handleSubmit = () => {
      if (staffNote.length>0) {
         const data = {
            ...requirement,
            staffNote: staffNote,
            status: '-3'
         }
         const CallApi = async () => {
            const response = await ApiUpdateRequirement({ data, id });
         }
         CallApi()
         navigate('/staff/order-support/', { replace: true })
         window.location.reload();
      }
   }

   return (
      <>
         {requirement?.status == -2 ?
            <div className="py-[3rem] px-[3rem] min-h-[100vh] bg-[#f7f9fc]">
               <div className="grid grid-cols-3 gap-x-[1.5rem]">
                  {/* Ben trai */}
                  <div className="col-span-2 ">
                     <div className="py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]" >

                        <div>
                           <h2 className="text-[32px] font-bold ">Order #{id}</h2>

                           <Chip label="Need support" color='warning' variant="outlined" sx={{ fontWeight: 700 }} />
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

                     {/* Note cua customer */}
                     <div className=' my-[1.5rem] py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]'>
                        <h2 className='text-[22px] mb-[1rem] font-bold leading-[1.273em]'>Customer Note</h2>
                        <p className='text-[#6f7182]'>
                           {requirement?.customerNote}
                        </p>
                     </div>

                     {/* Note cua sell staff */}
                     <div className='py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]'>
                        <h2 className='text-[22px] mb-[1rem] font-bold leading-[1.273em]'>Sell Staff Note</h2>
                        <p className='text-[#6f7182]'>
                           {requirement?.staffNote}
                        </p>
                     </div>
                  </div>

                  {/* Ben phai */}
                  <div className='sticky top-[24px]  py-[2.5rem] px-[2rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]'>
                     <h2 className='text-[22px] mb-[1rem] font-bold leading-[1.273em]'>Price Quotation</h2>

                     <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

                     <Accordion>
                        <AccordionSummary
                           expandIcon={<ArrowDropDownIcon />}
                           aria-controls="panel2-content"
                           id="panel2-header"
                        >
                           <Typography sx={{ fontWeight: 'bold' }} >Weight of material</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography>{requirement?.weightOfMaterial}</Typography>
                        </AccordionDetails>
                     </Accordion>

                     <Accordion>
                        <AccordionSummary
                           expandIcon={<ArrowDropDownIcon />}
                           aria-controls="panel2-content"
                           id="panel2-header"
                        >
                           <Typography sx={{ fontWeight: 'bold' }} >Machining fee</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography>{formatVND(requirement?.machiningFee)}</Typography>
                        </AccordionDetails>
                     </Accordion>

                     <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

                     {/* Form dien khoi luong va tien cong */}
                     <div>
                        <h2 className='text-[1rem] font-medium pb-[3px] mb-3'>Staff note</h2>
                            <textarea name="staffNote" onChange={debouncedOnChange} id="" className="w-full min-h-[200px] px-6 py-3 rounded-[10px] border mb-3">

                            </textarea>
                        <div className='my-[1rem]'></div>
                     </div>

                     <div className='mt-[1rem]'>
                        <Button onClick={handleSubmit} disabled={staffNote.length==0} variant="contained" sx={{ minWidth: '6rem' }} >
                           Send to manager
                        </Button>
                     </div>

                  </div>

               </div>
            </div>
            : <div></div>}
      </>
   )
}

export default OrderSupportDetail;