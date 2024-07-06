import CategoryItem from "./CategoryItem"
import { useEffect, useState } from "react"
import { fetchApiDesign } from "../../api/FetchApiDesign"
import { useLocation } from "react-router-dom"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function ListAll() {
   const [design, setDesign] = useState([])
   const location = useLocation()
   const pageSize = 8;
   const [page, setPage] = useState(1);
   const [dataSize, setDataSize] = useState(0);

   // Goi API de lay du lieu cua tat ca design
   useEffect(() => {
      const fetchAPI = async () => {
         const respone = await fetchApiDesign()
         let filterDesign = filter === 'all' ? respone : respone.filter(item => item.typeOfJewellery.name.toLowerCase() === filter)
         // Neu pagination sai thi vo sua lai dieu kien cho nay
         let size = filterDesign.length
         filterDesign = filterDesign.slice((page - 1) * pageSize, page * pageSize);
         setDataSize(size)

         setDesign(filterDesign)
      }
      fetchAPI()

   }, [location.pathname, page])

   // Lay type cua san pham thong qua path
   const getTypeFromPath = (path) => {
      const values = path.split('/').filter(value => value !== '')
      return values[values.length - 1]
   }

   const filter = getTypeFromPath(location.pathname) === 'design' ? 'all' : getTypeFromPath(location.pathname)

   const handleChange = (event, value) => {
      setPage(value);
   };

   console.log(filter)

   return (
      <div className="px-[6.25rem] pb-[3rem]">
         <div className="text-[1rem] leading-[1.3em] font-normal">
            <div className="grid gap-x-[2.5rem] gap-y-[2.5rem] grid-cols-4">

               {design?.map((item, index) => {
                  return (
                     // <Link key={index} to={`/design/${item.designId}`}>
                     <CategoryItem key={index} design={item} />
                     // </Link>
                  )

               })}
            </div>

            <div className='flex justify-center items-center mt-[15px]'>
               <Stack>
                  <Pagination count={(Math.ceil(dataSize / 8)) || 0} page={page} onChange={handleChange} />

               </Stack>
            </div>

         </div>
      </div>
   )
}

export default ListAll