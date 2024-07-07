import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { FetchApiDesignById } from "../../api/Requirements/FetchApiDesign";
import WestIcon from '@mui/icons-material/West';
import { IconButton, Tooltip } from "@mui/material";
import { CustomButton } from "../home/Home";
import useAuth from "../../hooks/useAuth"
import { PostPaymentApi } from "../../api/payment/PaymentApi";
import PaymentSelection from "./PaymentSelection";
import { useContext } from "react";
import { summaryContext } from "./SummaryContext";
import formatVND from "../../utils/FormatCurrency";
function PaymentConfirm() {
    const { requirementDetail, designDetail, ChangeToggle } = useContext(summaryContext);
    return (
        <motion.div>
            <div className="grid grid-cols-6 h-screen">
                <div className="col-span-4 bg-gray-500 flex justify-center items-center">
                    <div className="min-h-[350px] max-h-1/2 max-w-[800px]">
                        <div className="flex gap-3 items-center">
                            <Tooltip title="back" sx={{}} >
                                <IconButton onClick={() => { ChangeToggle() }}>
                                    <WestIcon sx={{ fontSize: "30px" }} />
                                </IconButton>
                            </Tooltip>

                            <h3 className="text-white text-[32px] font-bold mb-3">Order #{requirementDetail.requirementId} detail:</h3>
                        </div>
                        <div>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Design information
                                </AccordionSummary>
                                <AccordionDetails>
                                    <motion.div initial={{ opacity: 0, y: 15 }} transition="ease in" whileInView={{ opacity: 1, y: 0 }} className="grid grid-cols-5 w-full gap-3">
                                        <div className="image col-span-1">
                                            <img src={designDetail.image} className="w-full object-cover" alt={"image " + designDetail.designName} />
                                        </div>
                                        <div className="image col-span-4">
                                            <h3 className="text-[24px] font-semibold">{designDetail.designName}</h3>
                                            <p className="line-clamp-2">Description: {designDetail.description}</p>
                                            <p className="border-b pt-3 pb-2"></p>
                                            <p className="font-bold">Size of jewellery: {requirementDetail.size}</p>
                                        </div>
                                    </motion.div>
                                </AccordionDetails>
                            </Accordion>
                            {designDetail.masterGemstone != null ? <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    Master Gemstone
                                </AccordionSummary>
                                <AccordionDetails>
                                    <motion.div initial={{ opacity: 0, y: 15 }} transition="ease in" whileInView={{ opacity: 1, y: 0 }} className="grid grid-cols-5 w-full gap-3">
                                        <div className="image col-span-1">
                                            <img src={designDetail.masterGemstone?.image} className="w-full object-contain h-[100px]" alt={"image " + designDetail.masterGemstone?.kind} />
                                        </div>
                                        <div className="image col-span-4">
                                            <h3 className="text-[24px] font-semibold">{designDetail.masterGemstone?.kind}</h3>
                                            <div className="grid grid-cols-2">
                                                <p className="">Size: {designDetail.masterGemstone?.size}</p>
                                                <p className="">Clarity: {designDetail.masterGemstone?.clarity}</p>
                                                <p className="">Shape: {designDetail.masterGemstone?.shape} </p>
                                                <p className="">Cut: {designDetail.masterGemstone?.cut} </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AccordionDetails>
                            </Accordion> : null}
                            {designDetail.stone != null ? <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                >
                                    Melee stones
                                </AccordionSummary>
                                <AccordionDetails>
                                    <motion.div initial={{ opacity: 0, y: 15 }} transition="ease in" whileInView={{ opacity: 1, y: 0 }} className="grid grid-cols-5 w-full gap-3">
                                        <div className="image col-span-5">
                                            <h3 className="text-[24px] font-semibold">{designDetail.stone?.kind}</h3>
                                            <p className="line-clamp-2">Size: {designDetail.stone?.size} mm</p>
                                            <p className="line-clamp-2">Quantity: {designDetail.stone?.quantity}</p>
                                        </div>
                                    </motion.div>
                                </AccordionDetails>
                            </Accordion> : null}
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                >
                                    Material for jewellery
                                </AccordionSummary>
                                <AccordionDetails>
                                    <motion.div initial={{ opacity: 0, y: 15 }} transition="ease in" whileInView={{ opacity: 1, y: 0 }} className="grid grid-cols-5 w-full gap-3">
                                        <div className="image col-span-1">
                                            <img src={designDetail.material?.image} className="w-full object-contain h-[100px]" alt={"image " + designDetail.masterGemstone?.image} />
                                        </div>
                                        <div className="image col-span-4">
                                            <h3 className="text-[24px] font-semibold">{designDetail.material?.name}</h3>
                                            <p className="line-clamp-2">Weight of material: {requirementDetail.weightOfMaterial} mace</p>
                                            <p className="line-clamp-2">price: {requirementDetail.status > 3 ? formatVND(requirementDetail.materialPriceAtMoment) : formatVND(designDetail.material?.price)}  / mace</p>
                                        </div>
                                    </motion.div>
                                </AccordionDetails>
                            </Accordion>

                        </div>
                    </div>
                </div>
                <PaymentSelection />

            </div>
        </motion.div>);
}

export default PaymentConfirm;