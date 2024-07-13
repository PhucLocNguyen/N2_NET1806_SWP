import { useState } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

import DashboardSaleOVerview from './DashboardSaleOverview';
import DashboardCountType from './DashboardCountType';
import DashboardMasterGemstone from './DashboardMasterGemstone';
import DashboardRevenueByDate from './DashboardRevenueByDate';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 25;
defaults.plugins.title.color = 'black'

function Dashboard() {
   const [activeTab, setActiveTab] = useState('saleOverview');

   const renderComponent = () => {
      switch (activeTab) {
         case 'saleOverview':
            return <DashboardSaleOVerview />;
         case 'typeOverview':
            return <DashboardCountType />;
         case 'masterGemstone':
            return <DashboardMasterGemstone />;
         case 'revenueByDate':
            return <DashboardRevenueByDate />;
      }
   };

   return (
      <>
         <div className='flex items-center justify-around w-[100%] bg-[#f5f3fd] py-[8px]'>
            <div onClick={() => setActiveTab('saleOverview')} className={`px-[30px] py-[10px] cursor-pointer rounded-[30px] min-w-[200px] text-center ${activeTab == 'saleOverview' ? 'bg-[#9b59b6]' : ''}`}>
               <h1 className='text-[20px] font-bold'>Sale Overview</h1>
            </div>

            <div onClick={() => setActiveTab('typeOverview')} className={`px-[30px] py-[10px] cursor-pointer rounded-[30px] min-w-[200px] text-center ${activeTab == 'typeOverview' ? 'bg-[#9b59b6]' : ''}`}>
               <h1 className='text-[20px] font-bold'>Type Overview</h1>
            </div>

            <div onClick={() => setActiveTab('masterGemstone')} className={`px-[30px] py-[10px] cursor-pointer rounded-[30px] min-w-[200px] text-center ${activeTab == 'masterGemstone' ? 'bg-[#9b59b6]' : ''}`}>
               <h1 className='text-[20px] font-bold'>Master Gemstone</h1>
            </div>

            <div onClick={() => setActiveTab('revenueByDate')} className={`px-[30px] py-[10px] cursor-pointer rounded-[30px] min-w-[200px] text-center ${activeTab == 'revenueByDate' ? 'bg-[#9b59b6]' : ''}`}>
               <h1 className='text-[20px] font-bold'>Revenue By Date</h1>
            </div>
         </div>

         <div className='mt-[20px]'>
            {renderComponent()}
         </div>
         
      </>
   )
}

export default Dashboard;