import InputText from "./InputText";
import InputPassword from "./InputPassword";
import Button from '@mui/material/Button';

function StaffLogin() {
   return (
      <>
         <div className="bg-[#f7f9fc]">
            <div className="max-w-[1092px] min-h-[100vh] mx-[auto] my-[auto] flex flex-col items-center justify-center ">
               <div className="bg-[white] max-w-[600px] w-[100%] min-h-[400px] border-[1px] rounded-[30px] border-solid p-[3rem] flex flex-col items-center justify-center">
                  <h2 className="text-[32px] font-bold leading-[1.5em] mb-[8px] text-center">Sign In</h2>
                  <InputText label='username' type='text'></InputText>
                  <InputPassword label='password' inputCase='register'></InputPassword>
                  <div className="mt-[1rem]"></div>
                  <Button variant="contained" type='submit'>Sign Up</Button>
               </div>
            </div>
         </div>
      </>
   )
}

export default StaffLogin;