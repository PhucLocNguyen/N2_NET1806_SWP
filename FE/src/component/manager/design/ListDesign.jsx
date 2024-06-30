import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from '@mui/material';

import DesignRow from "./DesignRow";
import DesignPopup from "./DesignPopup";
import UpdateDesignPopup from "./UpdateDesignPopup";
import { ApiGetParentDesign } from '../../../api/manager/ApiDesign'

function ListDesign() {
   const pageSize = 6;

   const [isOpenPopup, setIsOpenPopup] = useState(false);
   const [search, setSearch] = useState('');


   const [design, setDesign] = useState([]);

   //Pagination
   const [dataSize, setDataSize] = useState(0);
   const [page, setPage] = useState(1);

   //Update
   const [isOpenUpdatePopup, setIsOpenUpdatePopup] = useState(false);
   const [itemUpdate, setItemUpdate] = useState();

   //Delete 
   const [isDelete, setIsDelete] = useState(false);

   // Search
   const [searchPage, setSearchPage] = useState(1);

   const fetchApiGetParentDesign = async () => {
      const response = await ApiGetParentDesign({ pageSize, page })
      setDesign(response);
   }

   const fetchApiTotal = async () => {
      const respone = await ApiGetParentDesign({});
      setDataSize(respone?.length);
      return respone;
   }

   //Du lieu design binh thuong
   useEffect(() => {

      if (search === '') {
         fetchApiGetParentDesign();
      }
      fetchApiTotal();

   }, [page, isOpenPopup, isDelete, isOpenUpdatePopup])

   //Dung cho pagination
   useEffect(() => {
      let data = []
      if (search === '') {
         setPage(1);
         fetchApiGetParentDesign();
      }

      let designPagination = async () => {
         data = await fetchApiTotal();
         console.log('>>>', data)

         const filteredData = data.filter(item =>
            item.designName.toLowerCase().includes(search.toLowerCase()) ||
            item.typeOfJewellery?.name.toLowerCase().includes(search.toLowerCase())
         );
         const paginatedData = filteredData.slice((searchPage - 1) * pageSize, searchPage * pageSize);

         setDesign(paginatedData);
         setDataSize(filteredData?.length);
      }
      designPagination()

   }, [search, searchPage, isDelete, isOpenUpdatePopup])

   const handleChange = (event, value) => {
      if (search === '') {
         setPage(value);
      } else {
         setSearchPage(value)
      }
   };

   // Xu ly khi nhap du lieu search
   const handleSearchChange = (e) => {
      setSearch(e.target.value);
      setSearchPage(1);
   }

   console.log(search)

   return (
      <>
         <div className="min-h-[100vh] py-[3rem] px-[3rem] bg-[#f7f9fc]">
            <div className="w-[100%] min-h-[600px]">
               <div className="rounded-[30px] border-[1px] border-solid border-[#e9eaf3] bg-[white]">

                  <div className="py-[1.75rem] px-[2.25rem] flex items-center justify-between">
                     <div className="flex items-center ">
                        <h2 className="mr-5 font-bold text-[1.5rem] leading-[1.125em]">All Design</h2>
                        <TextField onChange={handleSearchChange} value={search} id="outlined-basic" placeholder="Search..." variant="outlined" size="small" sx={{
                           '& .MuiOutlinedInput-root': {
                              borderRadius: '30px',
                           },
                           '& .MuiOutlinedInput-notchedOutline': {
                              borderRadius: '30px',
                           },
                        }}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <SearchIcon />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </div>
                     <Button onClick={() => setIsOpenPopup(true)} startIcon={<AddIcon />} variant="contained">New Design</Button>
                  </div>

                  {/* Header row */}
                  <div className="bg-[#f7f9fc] grid grid-cols-3 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3]">
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Design name</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Type</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]"></h2>
                     </div>
                  </div>

                  {design?.map((item, index) => {

                     return (
                        <DesignRow key={index} data={item} setIsOpenPopup={setIsOpenPopup} isDelete={isDelete} setIsDelete={setIsDelete} setItemUpdate={setItemUpdate} setIsOpenUpdatePopup={setIsOpenUpdatePopup} />
                     )
                  })}

               </div>

            </div>
            <div className='flex justify-center items-center'>
               <Stack>
                  <Pagination count={(Math.ceil(dataSize / 6)) || 0} page={search === '' ? page : searchPage} onChange={handleChange} />

               </Stack>
            </div>
         </div>

         {isOpenPopup && <DesignPopup setIsOpenPopup={setIsOpenPopup} />}
         {isOpenUpdatePopup && <UpdateDesignPopup setIsOpenUpdatePopup={setIsOpenUpdatePopup} data={itemUpdate} />}

      </>
   )
}

export default ListDesign;