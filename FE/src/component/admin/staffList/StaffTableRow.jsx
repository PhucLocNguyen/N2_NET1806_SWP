import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';


function StaffTableRow({ data, setItemUpdate, setIsOpenUpdatePopup }) {
   const [open, setOpen] = useState(null);

   const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
   }

   const handleCloseMenu = () => {
      setOpen(null);
   };

   return (
      <>
         <TableRow>
            <TableCell align='left'>{data.name}</TableCell>
            <TableCell align='left'>{data.roleId == 2 ? 'Manager' : (data.roleId == 3 ? 'Design' : (data.roleId == 4 ? 'Production' : (data.roleId == 5 ? 'Sale' : '')))}</TableCell>
            <TableCell align='left'>{data.email}</TableCell>
            <TableCell>
               <IconButton onClick={handleOpenMenu}>
                  <MoreVertIcon />
               </IconButton>
            </TableCell>
         </TableRow>

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
               setItemUpdate(data)
               setIsOpenUpdatePopup(true)
               handleCloseMenu()
            }}>
               Edit
            </MenuItem>
         </Popover>
      </>
   )
}

export default StaffTableRow