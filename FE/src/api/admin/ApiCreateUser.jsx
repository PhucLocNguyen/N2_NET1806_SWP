import api from '../instance';


const ApiCreateUser = async ({ formData : payload, accessToken }) => {

   try {

      let response = await api.post('/User/registerForAdmin', payload, {
         headers: {
            'Authorization': `Bearer ${accessToken}`
         },
         params: {
            roleEnum: `${payload.role}`
         }
      })

      console.log(response?.data)

   } catch (error) {
      console.log('>>> Error Api Create User: ', error)
   }

}

export default ApiCreateUser;