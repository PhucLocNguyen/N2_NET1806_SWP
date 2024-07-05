import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tooltip } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { PutApiRequirement } from "../../../api/Requirements/PutApiRequirement";
import { useState } from "react";
import { getStatusClass, getStatusCustomerByCode } from "../../orderCustomer/OrderCustomer";
import formatVND from "../../../utils/FormatCurrency";
import {motion} from "framer-motion";
function ViewOrderDetailPopup({
  requirement,
  design,
  togglePopup,
  handleUpdateData,
}) {
    const [open, setOpen] =useState(false);
  const [isChange,setIsChange] = useState(false);
  const [data, setData]= useState(requirement);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseUpdate = (data)=>{
    setOpen(false);
    CancelOrder(data);
    setIsChange(!isChange);

  }
  const CancelOrder = async (data) => {
    const actionUpdate = await PutApiRequirement(
      { ...data, status: "-1" },
      "Cancel order completed",
      "Failed to cancel the order"
    );
    handleUpdateData();
    setStatus("-1");
  };

  return (
    <motion.div initial={{opacity:0, x:10}} whileInView={{opacity:1, x:0}} transition={{ease:"linear", duration:0.3}} className="absolute z-10 top-0 left-0 right-0 bottom-0 py-[3rem] px-[3rem] min-h-[100vh] bg-[#f7f9fc]">
      <Tooltip title="back" sx={{}}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            togglePopup();
          }}
        >
          <WestIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Tooltip>
      <div className="grid grid-cols-3 gap-x-[1.5rem]">
        <div className="col-span-2 ">
          <div className="py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]">
            <div>
              <h2 className="text-[32px] font-bold ">
                Order #{requirement.requirementId}
              </h2>

              <div
            className={"rounded-full px-2 w-fit "+ getStatusClass(getStatusCustomerByCode(data.status))}
            sx={{ fontSize: "14px", fontWeight: 400 }}
          >
            <p>{getStatusCustomerByCode(data.status)}</p>
            </div>
            </div>

            <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

            <div>
              <h2 className="text-[22px] mb-[1rem] font-bold leading-[1.273em]">
                {design?.designName}
              </h2>
              <div className="flex ">
                <img className="w-[15rem] h-[15rem]" src={design?.image} />
                <p className="ml-[1rem] text-[#6f7182]">
                  {design?.description}
                </p>
              </div>
            </div>

            <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

            <div>
              <h2 className="text-[32px] mb-[1rem] font-bold leading-[1.273em]">
                Customer Requirement
              </h2>

              <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">
                General Information
              </h2>
              <table className="table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]">
                <thead className="bg-[#eccc68] border-[1px] border-solid border-[#000]">
                  <tr>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Jewelry Type
                    </th>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Jewelry Size
                    </th>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Jewelry Material
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {design?.typeOfJewellery?.name}
                    </td>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {requirement?.size}
                    </td>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {design?.material?.name}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="my-[1rem]"></div>

              <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">
                Master Gemstone
              </h2>
              <table className="table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]">
                <thead className="bg-[#eccc68] border-[1px] border-solid border-[#000]">
                  <tr>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Kind
                    </th>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Size
                    </th>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Weight
                    </th>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Shape
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {design?.masterGemstone?.kind}
                    </td>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {design?.masterGemstone?.size}
                    </td>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {design?.masterGemstone?.weight}
                    </td>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {design?.masterGemstone?.shape}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="my-[1rem]"></div>

              <h2 className="text-[20px] mb-[1rem] font-bold leading-[1.273em]">
                Stones
              </h2>
              <table className="table-fixed w-[100%] font-medium overflow-hidden border-collapse border-[1px] border-solid border-[#000]">
                <thead className="bg-[#eccc68] border-[1px] border-solid border-[#000]">
                  <tr>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Kind
                    </th>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Size
                    </th>
                    <th className="px-[1rem] py-[0.5rem] text-left border-[1px] border-solid border-[#000]">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {design?.stone?.kind}
                    </td>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {design?.stone?.size}
                    </td>
                    <td className="px-[1rem] py-[1rem] border-[1px] border-solid border-[#000]">
                      {design?.stone?.quantity}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className=" my-[1.5rem] py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]">
            <h2 className="text-[22px] mb-[1rem] font-bold leading-[1.273em]">
              Customer Note
            </h2>
            <p className="text-[#6f7182]">{requirement?.customerNote}</p>
          </div>

          <div className="py-[2.5rem] px-[2.5rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]">
            <h2 className="text-[22px] mb-[1rem] font-bold leading-[1.273em]">
              Sell Staff Note
            </h2>
            <p className="text-[#6f7182]">{requirement?.staffNote}</p>
          </div>
        </div>

        <div className="sticky top-[24px]  py-[2.5rem] px-[2rem] rounded-[30px] border-[1px] border-[#e9eaf3] border-solid bg-[white]">
          <h2 className="text-[22px] mb-[1rem] font-bold leading-[1.273em]">
            Price Quotation
          </h2>

          <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Weight of material
              </Typography>
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
              <Typography sx={{ fontWeight: "bold" }}>Machining fee</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{requirement?.machiningFee!=null?formatVND(requirement?.machiningFee):null}</Typography>
            </AccordionDetails>
          </Accordion>

          <div className="h-[1.5px] bg-[#e9eaf3] my-[1.5rem]"></div>

          <div>
            <div className="mt-[1rem]">
              <Button
                variant="outlined"
                color="error"
                disabled={requirement.status=="-1"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickOpen();
                }}
              >
                Cancel order
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Cancel this order?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                After clicking the Agree button, the order will be cancel and you can't restore.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={(e)=>{e.stopPropagation();
            handleCloseUpdate(data)}} color="error" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    </motion.div>
  );
}

export default ViewOrderDetailPopup;
