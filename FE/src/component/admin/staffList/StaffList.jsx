import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useEffect, useState } from 'react';

import { ApiGetAllStaff } from '../../../api/admin/ApiAdmin';

import StaffTableRow from './StaffTableRow';
import StaffPopup from './StaffPopup';
import UpdateStaffPopup from './UpdateStaffPopup';

function StaffList() {
   const pageSize = 6;

   const [isOpenPopup, setIsOpenPopup] = useState(false)
   const [dataStaff, setDataStaff] = useState([]);

   //Update
   const [isOpenUpdatePopup, setIsOpenUpdatePopup] = useState(false);
   const [itemUpdate, setItemUpdate] = useState();

   // Pagination
   const [dataSize, setDataSize] = useState(0);
   const [page, setPage] = useState(1);

   const fetchApiGetStaff = async () => {
      const response = await ApiGetAllStaff({ pageSize, page });
      setDataStaff(response)
   }

   const fetApiGetStaffTotal = async () => {
      const response = await ApiGetAllStaff({})
      setDataSize(response?.length)
   }

   useEffect(() => {

      fetchApiGetStaff()
      fetApiGetStaffTotal()
      console.log('Check recall')
   }, [isOpenPopup, page, isOpenUpdatePopup])

   const handleChange = (event, value) => {
      setPage(value);
   };

   console.log('>>>', isOpenPopup)
   console.log(page)
   console.log(dataStaff)

   return (
      <>
         <div className="py-[2rem] px-[2rem] ">
            <div className="flex items-center justify-between mb-[3rem]">
               <h4 className="text-[1.5rem] font-bold leading-[1.5]">Staff List</h4>
               <Button onClick={() => setIsOpenPopup(true)} startIcon={<AddIcon />} variant="contained">New Staff</Button>
            </div>

            <div className='min-h-[500px]'>

               {/* Staff table */}
               <div>

                  <TableContainer>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableCell align='left'>Name</TableCell>
                              <TableCell align='left'>Role</TableCell>
                              <TableCell align='left'>Email</TableCell>
                              <TableCell align='left'></TableCell>
                           </TableRow>
                        </TableHead>

                        <TableBody>
                           {dataStaff.map((item, index) => {
                              return (
                                 <StaffTableRow key={index} data={item} setItemUpdate={setItemUpdate} setIsOpenUpdatePopup={setIsOpenUpdatePopup} />
                              )
                           })}
                        </TableBody>
                     </Table>
                  </TableContainer>

               </div>

            </div>
            <div className='flex justify-center items-center'>
               <Stack>
                  <Pagination count={(Math.ceil(dataSize / 6)) || 0} page={page} onChange={handleChange} />

               </Stack>
            </div>

         </div>

         {isOpenPopup && <StaffPopup setIsOpenPopup={setIsOpenPopup} />}
         {isOpenUpdatePopup && <UpdateStaffPopup setIsOpenUpdatePopup={setIsOpenUpdatePopup} data={itemUpdate} />}
      </>
   )
}

export default StaffList