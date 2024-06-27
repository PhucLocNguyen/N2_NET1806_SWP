import { motion } from "framer-motion";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Fragment, React, useEffect, useState } from "react";
import PopupOpenOrder from "./PopupOpenOrder";
import PopupWorkingOrder from "./PopupWorkingOrder";
import PopupWaitingCustomer from "./PopupWaitingCustomer";


function Popup({ setIsOpenPopup, data, handleDataUpdate, statusOptions }) {
  let PopupRender = null;
  const status = Number(data.status);

  switch(status){
    case 0:
      PopupRender = PopupOpenOrder;
      break;
    case 1:
      PopupRender = PopupWorkingOrder;
      break;
    case 2:
      PopupRender = PopupWaitingCustomer;
      break;
    default:
      PopupRender = Fragment;
      break;
  }
  return (
    <div
      onClick={() => setIsOpenPopup(false)}
      className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center rounded-[10px] z-10"
    >
      <PopupRender data={data} handleDataUpdate={handleDataUpdate} statusOptions={statusOptions}/>
    </div>
  );
}

export default Popup;
