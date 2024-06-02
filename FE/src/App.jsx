import { Routes, Route } from 'react-router-dom'

import Login from './component/login/Login.jsx'
import Home from './component/home/Home.jsx'
import Category from './component/category/Category.jsx'
import ListAll from './component/category/ListAll.jsx'
import ListEarring from './component/category/ListEarring.jsx'
import ListBracelet from './component/category/ListBracelet.jsx'
import ListNecklace from './component/category/ListNecklace.jsx'
import ListRing from './component/category/ListRing.jsx'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/design' element={<Category></Category>}>
        <Route index element={<ListAll></ListAll>}></Route>
        <Route path='earring' element={<ListEarring></ListEarring>}></Route>
        <Route path='bracelet' element={<ListBracelet></ListBracelet>}></Route>
        <Route path='necklace' element={<ListNecklace></ListNecklace>}></Route>
        <Route path='ring' element={<ListRing></ListRing>}></Route>
      </Route>
    </Routes>
  )
}

export default App
