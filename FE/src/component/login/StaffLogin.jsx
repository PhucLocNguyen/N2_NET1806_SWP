import InputText from "./InputText";
import InputPassword from "./InputPassword";
import Button from '@mui/material/Button';
import { LoginWithAdmin } from "../../api/ApiLogin";
import { Navigate, useNavigate } from "react-router-dom";
function StaffLogin() {
   const navigate = useNavigate();

   const HandleSubmit = async (e)=>{
      e.preventDefault();
      //reset cac field trong form
      const form = e.target;
      // console.log(form);
      var data = new FormData(form);
      const listState ={
         username:"",
         password:"",
      };
      await Object.entries(listState).forEach(([key, value]) => {
          listState[key] =data.get(key);
      });
      var htmlCollection =[...e.target];
      htmlCollection.forEach((element, index)=>{
          if(element.tagName === "INPUT"){
              element.value = "";
              element.blur();
          }
      })
      const role = await LoginWithAdmin(listState);
      console.log('>>> StaffLogin' , role)
      if(role!=null){
         if(role === "Admin"){
            navigate('/admin',{ replace: true })
         }else if (role === 'Manager'){
            navigate('/manager', {replace: true})
         }else {
            navigate('/staff', {replace: true})
         }
      }else{
         
      }
      
      // Navigate()
  }
   return (
      <>
         <div className="bg-[#f7f9fc]">
               <form onSubmit={HandleSubmit} className="">
            <div className="max-w-[1092px] min-h-[100vh] mx-[auto] my-[auto] flex flex-col items-center justify-center ">
               <div className="bg-[white] max-w-[600px] w-[100%] min-h-[400px] border-[1px] rounded-[30px] border-solid p-[3rem] flex flex-col items-center justify-center">
                  <h2 className="text-[32px] font-bold leading-[1.5em] mb-[8px] text-center">Sign In</h2>
                  <InputText label='username' type='text' inputCase="login"  />
                  <InputPassword label='password' inputCase='login'></InputPassword>
                  <div className="mt-[1rem]"></div>
                  <Button variant="contained" type='submit'>Sign Up</Button>
               </div>
            </div>
               </form>
         </div>
      </>
   )
}

export default StaffLogin;