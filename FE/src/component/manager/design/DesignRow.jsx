import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

import { ApiDeleteParentDesign } from '../../../api/manager/ApiDesign';

function DesignRow({ data, setIsDelete, isDelete, setIsOpenUpdatePopup, setItemUpdate }) {

   const [open, setOpen] = useState(null);


   const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
   };

   const handleCloseMenu = () => {
      setOpen(null);
   };
   const CallApi = async () => {
      let id = data?.designId;
      const respone = await ApiDeleteParentDesign(id);
   }

   const handleDeleteGemstone = () => {
      CallApi();
      handleCloseMenu();
      setIsDelete(!isDelete);
   }

   return (
      <>

         <div className="grid grid-cols-3 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3] cursor-pointer">
            <div className="flex items-center">
               <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em] overflow-hidden">{data?.designName}</h2>
            </div>
            <div className="flex items-center">
               <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data?.typeOfJewellery?.name}</h2>
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

               Update Design
            </MenuItem>

            <MenuItem onClick={handleDeleteGemstone} sx={{ color: 'error.main' }}>

               Delete
            </MenuItem>
         </Popover>
      </>
   )
}

export default DesignRow;