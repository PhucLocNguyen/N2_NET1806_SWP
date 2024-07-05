import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

import { ApiDashboardMasterGemstone } from '../../../api/dashboard/ApiDashboard';

function DashboardMasterGemstone() {
   const [data, setData] = useState([]);

   const fetchApiMasterGemstone = async () => {
      const response = await ApiDashboardMasterGemstone();
      let newData = response?.sort((a, b) => b.amount - a.amount)
      setData(newData);
   }

   useEffect(() => {
      fetchApiMasterGemstone()
   }, [])

   return (
      <>
         <div className='px-[3rem] pt-[5rem]'>
            <div className="px-[15px] border-[1px] border-solid border-[#000] bg-[##f7f9fc] h-[500px]">
               <Bar
                  data={{
                     labels: data?.map((item) => item.masterGemstone),
                     datasets: [
                        {
                           label: 'Last month',
                           data: data?.map((item) => item.amount),
                           backgroundColor: '#ff7979'
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

export default DashboardMasterGemstone;