import api from './instance.jsx'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify';
import axiosConfigHeader from './AxiosConfigHeader.jsx';
const LoginApi = async ( formData) => {
    try {
        var role = null;
        const response = await api.post(`/User/loginForCustomer`, formData)

        if( response.status === 200){

            localStorage.setItem("userInfo", JSON.stringify(response.data))
            const accessToken = response.data;
             role = jwtDecode(accessToken).Role;
             toast.success("Login successful!");
             return {role};
        }
        
    } catch (e) {
        toast.error("Wrong username or password");
        console.error('Error during login:', e);
        return {role : null}

    }
}
const RegisterApi = async (formData) => {
    try {
        const response = await api.post(`/User/registerForCustomer`, formData, axiosConfigHeader)
        toast.info(response.data);
        return true;
    } catch (e) {
        console.error('Error during register:', e);
        toast.error("Register Failed: "+e.response.data);
        return false;
    }
}
const LoginWithGoogle = async (token)=>{
    var role;
    try{
        const response = await api.post(`/LoginGoogle/login`,{token});
        localStorage.setItem("userInfo", JSON.stringify(response.data))
         role = jwtDecode(response.data).Role;
        toast.success("Login successful!");
        return role;

    }catch(e){
            role = null;
            return role;
    }

}
const LoginWithAdmin = async (formData)=>{
    var role = null;
    try{
        const response = await api.post(`/User/loginForStaff`, formData);
        console.log('>>> API login respone: ', response);
        const accessToken = response?.data;
        toast.success("Login successful!");
        localStorage.setItem("userInfo", JSON.stringify(response.data))
         role = jwtDecode(accessToken).Role;
         console.log('>>> API login role: ', role);
        return role;
    }catch(e){
toast.error("Failed: "+ e?.response?.data);
return null;
    }

}
const VerifyRegister = async (verifyCode)=>{
    
    try{const response = await api.post(`/User/VerifyEmail`, verifyCode, axiosConfigHeader);
    toast.success("Verify register successful!");
    return response.status;
    }catch(e){
        toast.error("Failed: ", e.response.data);
    }
}
const ResendCode = async (listState)=>{
    
    try{const response = await api.post(`/User/ResendCode`,{...listState});
    toast.success("Resend code to verify for register successful!");
    return response.status;
    }catch(e){
        toast.error("Failed: ", e.response.data);
    }
}
export { LoginApi, LoginWithGoogle, LoginWithAdmin, RegisterApi, VerifyRegister, ResendCode }