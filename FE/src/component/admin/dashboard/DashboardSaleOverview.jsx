import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

import { ApiSaleOverview } from '../../../api/dashboard/ApiDashboard';

function DashboardSaleOVerview() {
   const yearStart = 2024;
   const currentYear = new Date().getFullYear();
   const yearsArray = [];
   for (let year = yearStart; year <= currentYear; year++) {
      yearsArray.push(year);
   }

   const [yearSelected, setYearSelected] = useState('');
   const [data, setData] = useState([]);

   const fetchApiSaleOverview = async () => {
      const response = await ApiSaleOverview(yearSelected)
      setData(response);
   }

   useEffect(() => {

      fetchApiSaleOverview();

   }, [yearSelected])

   console.log(yearSelected);

   return (
      <>
         <div className='px-[2rem] w-[20%] flex'>
            <h2 className='text-[1.3rem] font-medium pb-[3px] mr-[20px]'>Year</h2>
            <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small' >
               <Select
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={yearSelected}
                  onChange={(e) => setYearSelected(e.target.value)}
               >
                  <MenuItem value=''>
                     <em>None</em>
                  </MenuItem>

                  {yearsArray.map((item, index) => {
                     return (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                     )
                  })}

               </Select>
            </FormControl>
         </div>
         <div className='py-[10px]'></div>
         <div className='px-[3rem]'>
            <div className="px-[15px] border-[1px] border-solid border-[#000] bg-[##f7f9fc] w-[100%] h-[70vh]">
               <Line
                  data={{
                     labels: data?.map((item) => item.month),
                     datasets: [
                        {
                           label: 'Amount',
                           data: data?.map((item) => item.amount)
                        }
                     ]
                  }}

                  options={{
                     plugins: {
                        title: {
                           text: 'Sales Overview'
                        }
                     }
                  }}
               />
            </div>
         </div>
      </>
   )
}

export default DashboardSaleOVerview;