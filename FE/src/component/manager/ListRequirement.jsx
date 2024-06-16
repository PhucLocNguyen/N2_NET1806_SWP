import RowRequirement from "./RowRequirement"


function ListRequirement() {

   const data = [
      {
         id: 1,
         staff: 'Nguyen Duc Hung',
         status: 'Cho bao gia',
         orderdate: '15/06/2024',
         type: 'Ring'
      },
      {
         id: 2,
         staff: 'Nguyen Duc Hung',
         status: 'Cho xac nhan gia',
         orderdate: '15/06/2024',
         type: 'Ring'
      },
      {
         id: 3,
         staff: 'Nguyen Duc Hung',
         status: 'Cho bao gia',
         orderdate: '15/06/2024',
         type: 'Ring'
      },
      {
         id: 4,
         staff: 'Nguyen Duc Hung',
         status: 'Cho bao gia',
         orderdate: '15/06/2024',
         type: 'Ring'
      },
      {
         id: 5,
         staff: 'Nguyen Duc Hung',
         status: 'Cho bao gia',
         orderdate: '15/06/2024',
         type: 'Ring'
      },
   ]

   return (

         <div className="min-h-[100vh] py-[3rem] px-[3rem] bg-[#f7f9fc]">
            <div className="w-[100%]">
               <div className="rounded-[30px] border-[1px] border-solid border-[#e9eaf3] bg-[white]">

                  <div className="py-[1.75rem] px-[2.25rem] flex items-center">
                     <h2 className="font-bold text-[1rem] leading-[1.125em]">All Requirement</h2>
                  </div>

                  {/* Header row */}
                  <div className="bg-[#f7f9fc] grid grid-cols-5 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3]">
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Order ID</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Staff Name</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Status</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Order Date</h2>
                     </div>
                     <div className="flex items-center">
                        <h2 className="text-[1rem] font-medium tracking-[0.06em] leading-[1.167em]">Type</h2>
                     </div>
                  </div>

                  {data.map((item, index) => {
                     return(
                        <RowRequirement key={index} data={item} />
                     )
                  })}        

               </div>
            </div>
         </div>

   )
}

export default ListRequirement