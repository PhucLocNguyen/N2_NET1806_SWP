import Chip from '@mui/material/Chip';

function RowRequirement({ data }) {
   return (
      <>
         {/* Requirement rows */}
         <div className="grid grid-cols-5 gap-x-[1rem] py-[1rem] px-[2.25rem] border-t-[1px] border-solid border-[#e9eaf3] cursor-pointer">
            <div className="flex items-center">
               <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data.id}</h2>
            </div>
            <div className="flex items-center">
               <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data.staff}</h2>
            </div>
            <div className="flex items-center">
               {/* <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data.status}</h2> */}
               <Chip label={data.status} color={data.status === 'Cho bao gia' ? 'warning' : 'primary'} variant='outlined' sx={{fontSize: '14px', fontWeight: 400}}/>
            </div>
            <div className="flex items-center">
               <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data.orderdate}</h2>
            </div>
            <div className="flex items-center">
               <h2 className="text-[14px] font-medium tracking-[0.06em] leading-[1.167em]">{data.type}</h2>
            </div>
         </div>
      </>
   )
}

export default RowRequirement;