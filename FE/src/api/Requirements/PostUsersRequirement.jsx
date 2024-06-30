import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx'
import { toast } from 'react-toastify';

const PostUsersRequirement = async ( idRequirement, idUser) => {
    try {
        const dataToPost = {
            "usersId":idUser ,
            "requirementId":idRequirement
          };
        const response = await api.post(`/UserRequirement`, dataToPost, axiosConfigHeader);
            if (response.status === 200  || response.status === 201) {
                toast.success("Successful");
            }
            return response.status;
        
    } catch (e) {
      toast.error("Failed to join the order")
    }
}
export { PostUsersRequirement }