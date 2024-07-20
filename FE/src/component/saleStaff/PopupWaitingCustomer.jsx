import { useEffect, useState } from "react";
import { FetchApiDesignById } from "../../api/Requirements/FetchApiDesign";
import { FetchApiUserBasedRoleInRequirement } from "../../api/Requirements/FetchApiUser";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {motion} from "framer-motion";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CustomerAva from "../../assets/icon/staffIcon.jpg"

function PopupWaitingCustomer({data, handleDataUpdate, statusOptions}) {
    const [designDetail, setDesignDetail]= useState({});
    const [customerInformation, setCustomerInformation] = useState({});
    async function loadDesignDetail(designId){
        const getDesignById = await FetchApiDesignById(designId);
        setDesignDetail(getDesignById);
    }
    async function loadCustomerDetail(){
        const roleIdCustomer = 6;
        const getCustomerByRequirement = await FetchApiUserBasedRoleInRequirement(roleIdCustomer,data.requirementId );
        if(getCustomerByRequirement!=null){
            setCustomerInformation(getCustomerByRequirement);
        }
    }
    useEffect(()=>{ 
        loadDesignDetail(data.designId);
        loadCustomerDetail();
    },[])
    return (  
        <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#fff] w-[45rem] rounded-[10px] h-max py-3"
            >
              <h2 className="text-[36px] text-center border-b mb-3">Requirement #{data.requirementId} detail</h2>
        
              <div className="h-[600px] overflow-y-auto">
              <h4 className="mt-4 mb-4 text-lg font-medium px-2 h-fit w-fit rounded ">
             <span className="text-lg bg-green-600 text-white rounded-full ml-2 py-1 px-2"> {statusOptions[Number(data.status)].label}</span> 
          </h4>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className="text-[24px]"
                  >
                    Custom Detailed Design order by Customer
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="px-2">
                      <h3 className="text-[24px] text-[#000] mb-3">Design: {designDetail.designName}</h3>
                      <div className="px-3 grid grid-cols-2 gap-2 mb-3 border">
                        <div>
                          <img src={designDetail.image} className="h-[250px] object-cover rounded-[5px]" alt="" />
                        </div>
                        <div>
                          <h4 className="text-[24px]">Information:</h4>
                          <ul className="list-disc px-6">
                            <li>Size: {data.size}</li>
                            <li>Type of jewelry: {designDetail.typeOfJewellery?.name}</li>
                            <li>Material: {designDetail.material?.name}</li>
                          </ul>
                        </div>
                        {designDetail.masterGemstone != null && (
                          <>
                            <div>
                              <h4 className="text-[24px]">Master Gemstone:</h4>
                              <ul className="list-disc px-6">
                                <li>Kind: {designDetail.masterGemstone?.kind}</li>
                                <li>Size: {designDetail.masterGemstone?.size}</li>
                                <li>Shape: {designDetail.masterGemstone?.shape}</li>
                              </ul>
                            </div>
                            <div>
                              <img src={designDetail.masterGemstone?.image} className="h-[250px] object-cover rounded-[5px]" alt="" />
                            </div>
                          </>
                        )}
                        {designDetail.stone != null && (
                          <div className="col-span-2 py-3">
                            <h4 className="text-[24px]">Melee stones:</h4>
                            <ul className="list-disc px-6">
                              <li>Kind: {designDetail.stone?.kind}</li>
                              <li>Size: {designDetail.stone?.size}</li>
                              <li>Quantity: {designDetail.stone?.quantity}</li>
                            </ul>
                          </div>
                        )}
                        <div className="col-span-2 py-3">
                          <h4 className="text-[24px] mb-3">Customer note:</h4>
                          <p className="px-3 border py-1">{data.customerNote}</p>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
        
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className="text-[24px]"
                  >
                    <Typography variant="h3" sx={{ width: '33%', flexShrink: 0, fontSize:"24px"}}>
              Customer details
            </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        <Link to="/staff/chat">
                      <Button variant="contained" onClick={(e) => { e.stopPropagation(); CreateConversationJoin(UserId, customerInformation.usersId); }}>
                        Chat with customer
                      </Button>
                        </Link>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex items-center gap-4">
                      <img
                        src={customerInformation.image !=null? customerInformation.image:CustomerAva}
                        className="w-[150px] rounded-full"
                        alt=""
                      />
                      <div>
                        <h4 className="text-[20px]">Customer name: {customerInformation.name}</h4>
                        <h4>Email: {customerInformation.email}</h4>
                        
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
        
              </div>
        
            </motion.div>
          );
}

export default PopupWaitingCustomer;