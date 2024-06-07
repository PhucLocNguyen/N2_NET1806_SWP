import { useState, useEffect } from 'react'
import api from './instance.jsx'

const LoginApi = async (pathReq, listState) => {


    // try {
    //     const response = await api.post(`/api/account/${pathReq}`, listState).then((res)=>
    //     {
    //         if(e.target.name==="login" && res.status === 200) {localStorage.setItem("userInfo",JSON.stringify(res.data))};
    //         setDataSource([...dataSource, res.data]);
    //        });
        
    // } catch (error) {
    //     console.error('Error during login:', error);
    // }
}

export { LoginApi }