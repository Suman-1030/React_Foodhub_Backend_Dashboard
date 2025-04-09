import React from 'react'
import Landingpage from './Pages/Landingpage'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Notfound from './Pages/Notfound'
import Login from './Components/Forms/Login'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/*' element={<Notfound/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </div>
  )
}

export default App
