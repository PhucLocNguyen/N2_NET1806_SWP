import { useState, useEffect } from 'react'
import api from './instance.jsx'
import { jwtDecode } from 'jwt-decode'
import axiosConfigHeader from './AxiosConfigHeader.jsx'

const LoginApi = async (pathReq, formData, axiosConfig) => {
    try {
        const response = await api.post(`/User/${pathReq}`, formData, axiosConfig)
        // .then((res) => {
        //     if (pathReq === "login" && res.status === 200) {
        //         localStorage.setItem("userInfo", JSON.stringify(res.data))

        //         console.log(jwtDecode(res.data).given_name)
        //         const accessToken = res.data
        //         const role = jwtDecode(res.data).given_name
        //         console.log(accessToken, role)
        //         return { role, accessToken }
        //     }

        // })

        if(pathReq === 'loginForCustomer' && response.status === 200){

            localStorage.setItem("userInfo", JSON.stringify(response.data))
            const accessToken = response.data;
            console.log(jwtDecode(response.data))
            const role = jwtDecode(response.data).Role
            return { role, accessToken }
        }
    } catch (e) {
        console.error('Error during login:', e);
        return {role : null, accessToken: null}

    }
}

const LoginWithGoogle = async (token)=>{
    try{
        const response = await api.post(`/LoginGoogle/login`,{token});
        localStorage.setItem("userInfo", JSON.stringify(response.data))
        const accessToken = response.data;
        const role = jwtDecode(response.data).Role
        return { role, accessToken }

    }catch(e){
console.error("Error during login with Google : "+ e);

    }
}
export { LoginApi, LoginWithGoogle }

