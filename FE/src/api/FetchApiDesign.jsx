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

      let design = await api.get(`/Design/${id}`)
      console.log('Fetch API Design by ID')
      return design.data

   } catch (error) {
      console.log(error)
   }
}

export { fetchApiDesign, fetchApiDesignById }