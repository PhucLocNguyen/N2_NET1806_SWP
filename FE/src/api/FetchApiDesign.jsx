import api from './instance.jsx'

const fetchApiDesign = async () => {

   try {

      let design = await api.get('/Design')

      console.log("Fetch API Design log")

      return design.data
   } catch (error) {
      console.log(error)
   }

}

const fetchApiDesignById = async (id) => {

   try {

      let response = await api.get(`/Design/${id}`)
      const dataGetById = response.data;
      return dataGetById;

   } catch (error) {
      console.log(error)
   }
}

const ApiRelatedDesign = async ({ typeDesign, idDesign }) => {
   try {

      const response = await api.get('/Design', {
         params: {
            TypeOfJewellery: typeDesign,
            pageIndex: 1,
            pageSize: 3,
            DesignId: idDesign
         }
      })
      return response.data

   } catch (error) {
      console.log('>>> Api Related Design Error : ', error)
      return []
   }
}


export { fetchApiDesign, fetchApiDesignById, ApiRelatedDesign }