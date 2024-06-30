import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from '@mui/material';

import MasterGemstoneRow from "./MasterGemstoneRow";
import MasterGemstonePopup from "./MasterGemstonePopup";
import UpdateMasterGemstonePopup from "./UpdateMasterGemstonePopup";
import ApiGetMasterGemstone from "../../../api/manager/ApiGetMasterGemstone";

function ListMasterGemstone() {
   const pageSize = 6;

   const [isOpenPopup, setIsOpenPopup] = useState(false);
   const [masterGemstone, setMasterGemstone] = useState([]);
   const [search, setSearch] = useState('');

   //Update
   const [isOpenUpdatePopup, setIsOpenUpdatePopup] = useState(false);
   const [itemUpdate, setItemUpdate] = useState();

   //Delete 
   const [isDelete, setIsDelete] = useState(false);

   // Search
   const [searchPage, setSearchPage] = useState(1);

   // Pagination
   const [dataSize, setDataSize] = useState(0);
   const [page, setPage] = useState(1);

   const fetchApiGetMasterGemstone = async () => {
      const respone = await ApiGetMasterGemstone({ pageSize, page });
      setMasterGemstone(respone);
   }

   const fetchApiTotal = async () => {
      const respone = await ApiGetMasterGemstone({});
      setDataSize(respone?.length);
      return respone;
   }

   useEffect(() => {

      if (search === '') {
         fetchApiGetMasterGemstone();
      }
      fetchApiTotal();
      // console.log('Call again')

   }, [isOpenPopup, page, isOpenUpdatePopup, isDelete])

   // Dung cho pagination
   useEffect(() => {
      let data = []
      if (search === '') {
         setPage(1);
         fetchApiGetMasterGemstone();
      }
      let gemPagination = async () => {
         data = await fetchApiTotal();
         console.log(data)

         const filteredData = data.filter(item =>
            item.kind.toLowerCase().includes(search.toLowerCase()) ||
            item.size.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.price.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.clarity.toLowerCase().includes(search.toLowerCase()) ||
            item.cut.toLowerCase().includes(search.toLowerCase()) ||
            item.weight.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.shape.toLowerCase().includes(search.toLowerCase())
         );
         const paginatedData = filteredData.slice((searchPage - 1) * pageSize, searchPage * pageSize);

         setMasterGemstone(paginatedData);
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

   // console.log('>>> Log item update : ', itemUpdate)

   return (
      <>
         <div className="min-h-[100vh] py-[3rem] px-[3rem] bg-[#f7f9fc]">
            <div className="w-[100%] min-h-[600px]">
               <div className="rounded-[30px] border-[1px] border-solid border-[#e9eaf3] bg-[white]">

                  <div className="py-[1.75rem] px-[2.25rem] flex items-center justify-between">
                     <div className="flex items-center ">
                        <h2 className="mr-5 font-bold text-[1.5rem] leading-[1.125em]">All Master Gemstone</h2>
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
                     <Button onClick={() => setIsOpenPopup(true)} startIcon={<AddIcon />} variant="contained">New Gemstone</Button>
                  </div>

                  {/* Header row */}
                  <div className="bg-[#f7f9fc] grid grid-cols-8 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3]">
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Kind</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Size</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Clarity</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Cut</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Weight</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Shape</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Price</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]"></h2>
                     </div>
                  </div>

                  {masterGemstone?.map((item, index) => {

                     return (
                        <MasterGemstoneRow key={index} data={item} setIsOpenUpdatePopup={setIsOpenUpdatePopup} setItemUpdate={setItemUpdate} isDelete={isDelete} setIsDelete={setIsDelete} />
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

         {isOpenPopup && <MasterGemstonePopup setIsOpenPopup={setIsOpenPopup} />}
         {isOpenUpdatePopup && <UpdateMasterGemstonePopup setIsOpenUpdatePopup={setIsOpenUpdatePopup} data={itemUpdate} />}

      </>
   )
}

export default ListMasterGemstone;