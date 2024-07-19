import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx'
const PostApiRequirement = async ( formData) => {
    try {
        const response = await api.post(`/Requirement`, formData, axiosConfigHeader);
            const requirementReq = response.data;
            if (response.status === 200  || response.status === 201) {
                console.log("Created !!!");
            }else{
                console.log("Failed");
            }
            return requirementReq;
        
    } catch (e) {
        console.error('Error during Post design:', e);
    }
}
const PostApiConfirmPrice = async (requirementById)=>{
    try {
        const response = await api.post(`/Requirement/ConfirmPrice`, requirementById, axiosConfigHeader);
            const requirementReq = response.data;
            return requirementReq;
        
    } catch (e) {
        console.error('Error during Post design:', e);
        return null;
    }
}
export { PostApiRequirement ,PostApiConfirmPrice}