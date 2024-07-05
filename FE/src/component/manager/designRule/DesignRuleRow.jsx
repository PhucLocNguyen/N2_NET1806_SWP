import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

function DesignRuleRow({ data, setIsOpenUpdatePopup, setItemUpdate}) {
   const [open, setOpen] = useState(null);

   const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
   };

   const handleCloseMenu = () => {
      setOpen(null);
   };

   return (
      <>

         <div className="grid grid-cols-8 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3] cursor-pointer">
            <div className="flex items-center">
               <h2 className="mx-6 text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data?.designRuleId}</h2>
            </div>
            <div className="flex items-center">
               <h2 className="mx-6 text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data?.typeOfJewellery?.name}</h2>
            </div>
            <div className="flex items-center">
               <h2 className="mx-6 text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data?.minSizeMasterGemstone}</h2>
            </div>
            <div className="flex items-center">
               <h2 className="mx-6 text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data?.maxSizeMasterGemstone}</h2>
            </div>
            <div className="flex items-center">
               <h2 className="mx-6 text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data?.minSizeJewellery}</h2>
            </div>
            <div className="flex items-center">
               <h2 className="mx-6 text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data?.maxSizeJewellery}</h2>
            </div>
            <div className="flex items-center justify-center">
               <IconButton onClick={handleOpenMenu}>
                  <MoreVertIcon />
               </IconButton>
            </div>
         </div>

         <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
               sx: { width: 140 },
            }}
         >
            <MenuItem onClick={() => {
               setIsOpenUpdatePopup(true);
               setItemUpdate(data);
               handleCloseMenu();
            }}>

               Update
            </MenuItem>
         </Popover>
      </>
   )
}

export default DesignRuleRow;