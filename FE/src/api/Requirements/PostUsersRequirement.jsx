import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx'

const PostUsersRequirement = async ( idRequirement, idUser) => {
    try {
        const dataToPost = {
            "usersId":idUser ,
            "requirementId":idRequirement
          };
        const response = await api.post(`/UserRequirement`, dataToPost, axiosConfigHeader);
            const requirementReq = response.data;
            if (response.status === 200  || response.status === 201) {
                console.log("Join Success !!!");
            }else{
                console.log("Failed");
            }
            return requirementReq;
        
    } catch (e) {
        console.error('Error during Post design:', e);
    }
}
export { PostUsersRequirement }