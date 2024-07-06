import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from '@mui/material/Typography';

import Background from '../../assets/profile/profilebackground.jpg';

import { ApiGetUser } from '../../api/customerProfile/ApiCustomerProfile';
import useAuth from '../../hooks/useAuth';
import EditAccountPopUp from './EditAccountPopup';

function MyAccount() {
   const { UserId } = useAuth();
   const [userData, setUserData] = useState();
   const [isOpenPopup, setIsOpenPopup] = useState(false)

   const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" href="/">
         Home
      </Link>,
      <Typography key="2" color="text.primary">
         My profile
      </Typography>
   ];

   const fetchApiGetUser = async () => {
      const response = await ApiGetUser(UserId);
      setUserData(response)
   }

   useEffect(() => {

      fetchApiGetUser();

   }, [isOpenPopup])

   return (
      <>
         <div className="py-[48px] min-h-[100vh] bg-[#f7f9fc]">
            <div className="w-[70%] mx-auto mb-4">
               <Stack spacing={2}>
                  <Breadcrumbs
                     separator={<NavigateNextIcon fontSize="small" />}
                     aria-label="breadcrumb"
                  >
                     {breadcrumbs}
                  </Breadcrumbs>
               </Stack>
            </div>
            <div className="max-w-[1092px] mx-[auto] ">

               {/* Head */}
               <div className="rounded-[30px] flex flex-col justify-end p-[36px] mb-[24px] truncate relative">

                  <img src={Background} alt="background" className='absolute top-0 bottom-0 left-0 right-0 object-cover w-[100%] inline-block' />
                  <div className='opacity-[0.6] absolute top-[24%] left-0 right-0 bottom-0'></div>
                  <div className='flex justify-between gap-x-[12px] gap-y-[24px] z-10'>
                     <div className='flex items-center'>
                        {/* Avatar */}
                        <div className='p-[4px] mr-[16px] w-[88px] h-[88px] bg-[#fff] rounded-[50%] relative flex items-center justify-center'>
                           <img className='w-[100%] h-[100%] rounded-[50%] overflow-hidden object-cover' src={userData?.image} />
                        </div>

                        {/* Name */}
                        <div>
                           <div className='text-[#fff] text-[24px] font-bold leading-[1.4em]'>
                              {userData?.name}
                           </div>
                        </div>

                     </div>
                  </div>

               </div>

               <div className='rounded-[30px] p-[36px] mb-[24px] bg-[#fff] min-h-[300px] relative'>

                  <div className='flex items-center mt-[10px]'>
                     <h1 className='font-bold text-[20px] mr-[20px] min-w-[150px]'>Name</h1>
                     <input type="text" placeholder={userData?.name} readOnly className='px-[12px] py-[8px] border-[1px] border-solid border-[#000]  rounded-[3px] min-w-[50%]' />
                  </div>

                  <div className='flex items-center mt-[15px]'>
                     <h1 className='font-bold text-[20px] mr-[20px] min-w-[150px]'>Email</h1>
                     <input type="text" placeholder={userData?.email} readOnly className='px-[12px] py-[8px] border-[1px] border-solid border-[#000]  rounded-[3px] min-w-[50%]' />
                  </div>

                  <div className='flex items-center mt-[15px]'>
                     <h1 className='font-bold text-[20px] mr-[20px] min-w-[150px]'>Phone Number</h1>
                     <input type="text" placeholder={userData?.phone} readOnly className='px-[12px] py-[8px] border-[1px] border-solid border-[#000]  rounded-[3px] min-w-[50%]' />
                  </div>



                  <div className='mt-[1rem] absolute top-[31px] right-[30px]'>
                     <Button onClick={() => setIsOpenPopup(true)} variant="contained" sx={{ minWidth: '6rem' }}>
                        <AddIcon fontSize='small' sx={{ marginRight: '8px' }} />
                        Update
                     </Button>
                  </div>

               </div>

            </div>
         </div>

         {isOpenPopup && <EditAccountPopUp setIsOpenPopup={setIsOpenPopup} />}

      </>
   )
}

export default MyAccount;