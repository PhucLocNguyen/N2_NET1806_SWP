import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx'
import { toast } from 'react-toastify';

const PutApiRequirement = async ( data, successMessage, failedMessage) => {
const dataToPut=
    {
        status: data.status,
        expectedDelivery:data.expectedDelivery,
        size: data.size,
        designId: data.designId,
        design3D:data.design3D,
        weightOfMaterial: data.weightOfMaterial,
        materialPriceAtMoment: data.materialPriceAtMoment,
        stonePriceAtMoment:  data.stonePriceAtMoment,
        machiningFee:  data.machiningFee,
        totalMoney:  data.totalMoney,
        customerNote: data.customerNote,
        staffNote:data.staffNote
      }
    try {
       
        const response = await api.put(`/Requirement/${data.requirementId}`, dataToPut, axiosConfigHeader);
            const requirementReq = response.data;
            if (response.status === 200  || response.status === 201) {
                toast.success(successMessage);
            }else{
                toast.error(failedMessage);
            }
            return requirementReq;
        
    } catch (e) {
        console.error('Error during Post design:', e);
    }
}
export { PutApiRequirement }