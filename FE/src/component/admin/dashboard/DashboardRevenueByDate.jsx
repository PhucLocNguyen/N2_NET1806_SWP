import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { ApiDashboardRevenueByDate } from '../../../api/dashboard/ApiDashboard';
import formatVND from '../../../utils/FormatCurrency';

function DashboardRevenueByDate() {

   const [data, setData] = useState([]);

   const [formData, setFormData] = useState({
      FromDate: '',
      ToDate: ''
   });

   const [errors, setErrors] = useState({
      FromDate: '',
      ToDate: ''
   });

   const fetchApiRevenueByDate = async (fromDate, toDate) => {
      const response = await ApiDashboardRevenueByDate(fromDate, toDate)
      setData(response);
   }

   useEffect(() => {

      let checkDateValid = isAfter(formData.ToDate, formData.FromDate);
      if (checkDateValid && formData.ToDate != '' && formData.FromDate != '') {
         fetchApiRevenueByDate(formData.FromDate, formData.ToDate)
      }

   }, [formData.FromDate, formData.ToDate])

   const isAfter = (date1, date2) => {
      return new Date(date1) >= new Date(date2);
   };

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      let errorValue = '';

      let isNotValid = true;
      try {

         if (name === 'FromDate') {
            errorValue = 'Please select valid date';
            if (value !== '') {
               isNotValid = false;
            }

         } else if (name === 'ToDate') {
            errorValue = `Date must be greater than ${formData.FromDate}`;
            let checkDateValid = isAfter(value, formData.FromDate);
            if (checkDateValid) {
               isNotValid = false;
               console.log('Check point');
            }
         }

      } catch (error) {
         isNotValid = true
      }

      setFormData({
         ...formData,
         [name]: value
      });

      setErrors({
         ...errors,
         [name]: isNotValid ? errorValue : ''
      })

   }

   console.log(data)

   return (
      <>
         <div className='px-[2rem] w-[50%] flex ml-[1rem]'>
            <div className='w-[40%] mr-[20px]'>
               <TextField
                  id="date"
                  label="From Date"
                  name='FromDate'
                  value={formData.FromDate}
                  onChange={handleFormChange}
                  type="date"
                  size='small'
                  InputLabelProps={{
                     shrink: true,
                     style: { fontWeight: 'bold' }
                  }}
                  sx={{
                     width: '100%',
                     minHeight: '5rem'
                  }}
                  error={!!errors.FromDate} helperText={errors?.FromDate}
               />
            </div>

            <div className='w-[40%]'>
               <TextField
                  id="date"
                  label="To Date"
                  name='ToDate'
                  value={formData.ToDate}
                  onChange={handleFormChange}
                  type="date"
                  size='small'
                  InputLabelProps={{
                     shrink: true,
                     style: { fontWeight: 'bold' }
                  }}
                  sx={{
                     width: '100%',
                     minHeight: '5rem'
                  }}
                  disabled={!formData.FromDate}
                  error={!!errors.ToDate} helperText={errors?.ToDate}
               />
            </div>

         </div>

         <div className='px-[24px] py-[20px] flex items-center rounded-[15px] border-[1px] border-solid border-[#ccc] w-[35%] ml-[3rem]'>
            <MonetizationOnIcon className='text-[#1476ff]' sx={{ fontSize: '50px', fontWeight: 'bold' }} />

            <div className='ml-[10px]'>
               <div className='flex items-center'>
                  <p className='font-bold text-[20px]'> {data?.totalMoney?.toTal}</p>
               </div>

               <div className='font-bold text-[20px]'>{formatVND(data?.totalMoney?.revenue)}</div>
            </div>
         </div>

         <div className='py-[10px]'></div>

         <div className='px-[3rem]'>
            <div className="px-[15px] border-[1px] border-solid border-[#000] bg-[##f7f9fc] w-[100%] h-[65vh]">
               <Bar
                  data={{
                     labels: data?.data?.map((item) => item.date),
                     datasets: [
                        {
                           label: 'VND',
                           data: data?.data?.map((item) => item.amount),
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

export default DashboardRevenueByDate;