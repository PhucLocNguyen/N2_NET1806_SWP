import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from '@mui/material';

import { ApiGetStone } from '../../../api/manager/ApiStone'
import StoneRow from "./StoneRow";
import StonePopup from "./StonePopup";
import UpdateStonePopup from "./UpdateStonePopup";

function ListStone() {
   const pageSize = 6;

   const [isOpenPopup, setIsOpenPopup] = useState(false);
   const [stone, setStone] = useState([]);
   const [search, setSearch] = useState('');

   //Update
   const [isOpenUpdatePopup, setIsOpenUpdatePopup] = useState(false);
   const [itemUpdate, setItemUpdate] = useState();

   //Delete 
   const [isDelete, setIsDelete] = useState(false);

   // Search
   const [searchPage, setSearchPage] = useState(1);

   //Pagination
   const [dataSize, setDataSize] = useState(0);
   const [page, setPage] = useState(1);

   const FetchApiGetStone = async () => {
      const response = await ApiGetStone({ pageSize, page });
      setStone(response);
   }

   const FetchApiTotal = async () => {
      const response = await ApiGetStone({});
      setDataSize(response?.length);
      return response;
   }

   useEffect(() => {

      if (search === '') {
         FetchApiGetStone();
      }

      FetchApiTotal();

   }, [page, isOpenPopup, isOpenUpdatePopup, isDelete]);

   useEffect(() => {

      let data = []
      if (search === '') {
         setPage(1);
         FetchApiGetStone();
      }

      let gemPagination = async () => {
         data = await FetchApiTotal();

         const filteredData = data.filter(item =>
            item.kind.toLowerCase().includes(search.toLowerCase()) ||
            item.size.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.price.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.quantity.toString().toLowerCase().includes(search.toLowerCase()) 
         );
         const paginatedData = filteredData.slice((searchPage - 1) * pageSize, searchPage * pageSize);

         setStone(paginatedData);
         setDataSize(filteredData?.length);
      }

      gemPagination()

   }, [search, searchPage, isOpenUpdatePopup, isDelete])


   const handleChange = (event, value) => {
      if (search === '') {
         setPage(value);
      } else {
         setSearchPage(value)
      }
   };

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
                        <h2 className="mr-5 font-bold text-[1.5rem] leading-[1.125em]">All Melee Stones</h2>
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
                     <Button onClick={() => setIsOpenPopup(true)} startIcon={<AddIcon />} variant="contained">New Melee Stones</Button>
                  </div>

                  {/* Header row */}
                  <div className="bg-[#f7f9fc] grid grid-cols-5 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3]">
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Kind</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Size</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Quantity</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Price</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]"></h2>
                     </div>
                  </div>

                  {stone?.map((item, index) => {

                     return (
                        <StoneRow key={index} data={item} setIsOpenUpdatePopup={setIsOpenUpdatePopup} setItemUpdate={setItemUpdate} isDelete={isDelete} setIsDelete={setIsDelete} />
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

         {isOpenPopup && <StonePopup setIsOpenPopup={setIsOpenPopup} />}
         {isOpenUpdatePopup && <UpdateStonePopup setIsOpenUpdatePopup={setIsOpenUpdatePopup} data={itemUpdate} />}
      </>
   )
}

export default ListStone;