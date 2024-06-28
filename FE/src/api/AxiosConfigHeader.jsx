const axiosConfigHeader = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("userInfo")!= null? "Bearer " + localStorage.getItem("userInfo").slice(1,-1) : ""
    },
    withCredentials: true // Nếu API của bạn yêu cầu cookie
};
export default axiosConfigHeader;