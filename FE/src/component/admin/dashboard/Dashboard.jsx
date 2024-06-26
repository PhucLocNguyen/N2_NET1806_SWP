import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 25;
defaults.plugins.title.color = 'black'

function Dashboard() {

   const dataCount2 = [
      {
         label: 'Ring',
         lastMonth: 10,
         currentMonth: 5
      },
      {
         label: 'Earring',
         lastMonth: 20,
         currentMonth: 1
      },
      {
         label: 'Bracelet',
         lastMonth: 10,
         currentMonth: 10
      },
      {
         label: 'Necklace',
         lastMonth: 8,
         currentMonth: 2
      },

   ]
   const dataAmount = [
      {
         label: 'Jan',
         amount: 1000
      },
      {
         label: 'Feb',
         amount: 2000
      },
      {
         label: 'Mar',
         amount: 3000
      },
      {
         label: 'Apr',
         amount: 1000
      },
      {
         label: 'May',
         amount: 1500
      },
      {
         label: 'Jun',
         amount: 1310
      },
      {
         label: 'Jul',
         amount: 1700
      },
      {
         label: 'Aug',
         amount: 1000
      },
      {
         label: 'Sep',
         amount: 5000
      },
      {
         label: 'Oct',
         amount: 2000
      },
      {
         label: 'Nov',
         amount: 0
      },
      {
         label: 'Dec',
         amount: 10
      },
   ]
   const dataNumber = [
      {
         label: 'Jan',
         amount: 5
      },
      {
         label: 'Feb',
         amount: 10
      },
      {
         label: 'Mar',
         amount: 2
      },
      {
         label: 'Apr',
         amount: 8
      },
      {
         label: 'May',
         amount: 9
      },
      {
         label: 'Jun',
         amount: 0
      },
      {
         label: 'Jul',
         amount: 5
      },
      {
         label: 'Aug',
         amount: 6
      },
      {
         label: 'Sep',
         amount: 7
      },
      {
         label: 'Oct',
         amount: 5
      },
      {
         label: 'Nov',
         amount: 9
      },
      {
         label: 'Dec',
         amount: 12
      },
   ]

   return (
      <>
         <div className="px-[2rem] py-[2rem]  bg-[#fff] min-h-[100vh]">
            <div className="px-[15px] border-[1px] border-solid border-[#000] bg-[##f7f9fc] w-[100%] h-[350px]">
               <Line
                  data={{
                     labels: dataAmount.map((data) => data.label),
                     datasets: [
                        {
                           label: 'Amount',
                           data: dataAmount.map((data) => data.amount)
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

            <div className="flex gap-6 mt-[30px]">
               <div className="px-[15px] border-[1px] border-solid border-[#000] bg-[##f7f9fc] w-[50%] h-[300px]">
                  <Bar
                     data={{
                        labels: dataCount2.map((data) => data.label),
                        datasets: [
                           {
                              label: 'Last month',
                              data: dataCount2.map((data) => data.lastMonth),
                              backgroundColor: '#ff7979'
                           },
                           {
                              label: 'Current month',
                              data: dataCount2.map((data) => data.currentMonth),
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

               <div className="px-[15px] border-[1px] border-solid border-[#000] bg-[##f7f9fc] w-[50%] h-[300px]">
                  <Line
                     data={{
                        labels: dataNumber.map((data) => data.label),
                        datasets: [
                           {
                              label: 'Order Count',
                              data: dataNumber.map((data) => data.amount)
                           }
                        ]
                     }}

                     options={{
                        plugins: {
                           title: {
                              text: 'Quantity Overview'
                           }
                        }
                     }}
                  />
               </div>
            </div>
         </div>
      </>
   )
}

export default Dashboard;