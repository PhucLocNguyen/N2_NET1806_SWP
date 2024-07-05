import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

import { ApiCountType } from '../../../api/dashboard/ApiDashboard';


function DashboardCountType() {
   const year = [2024, 2023, 2022, 2021];
   const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

   const [yearSelected, setYearSelected] = useState('');
   const [monthSelected, setMonthSelected] = useState('');
   const [data, setData] = useState([]);

   const fetchApiCountType = async () => {
      const response = await ApiCountType(monthSelected, yearSelected)
      setData(response);
   }

   useEffect(() => {

      fetchApiCountType();

   }, [yearSelected, monthSelected])

   console.log(data);

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

                  {year.map((item, index) => {
                     return (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                     )
                  })}

               </Select>
            </FormControl>

            <h2 className='text-[1.3rem] font-medium pb-[3px] mr-[20px] ml-[2rem]'>Month</h2>
            <FormControl sx={{ minWidth: 120, width: '100%', minHeight: '4rem' }} size='small' >
               <Select
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={monthSelected}
                  onChange={(e) => setMonthSelected(e.target.value)}
               >
                  <MenuItem value=''>
                     <em>None</em>
                  </MenuItem>

                  {month.map((item, index) => {
                     return (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                     )
                  })}

               </Select>
            </FormControl>
         </div>
         <div className='py-[10px]'></div>
         <div className='px-[3rem]'>
            <div className="px-[15px] border-[1px] border-solid border-[#000] bg-[##f7f9fc] h-[500px]">
               <Bar
                  data={{
                     labels: data?.map((item) => item.typeOfJewelleryName),
                     datasets: [
                        {
                           label: 'Last month',
                           data: data?.map((item) => item.lastMonth),
                           backgroundColor: '#ff7979'
                        },
                        {
                           label: 'Current month',
                           data: data?.map((item) => item.currentMonth),
                           backgroundColor: '#2ecc71'
                        }
                     ]
                  }}

                  options={{
                     plugins: {
                        title: {
                           text: 'Order Count By Type Overview'
                        }
                     }
                  }}
               />
            </div>
         </div>
      </>
   )
}

export default DashboardCountType;