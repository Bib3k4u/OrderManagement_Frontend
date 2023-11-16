import React from 'react'
import Navbar from './Components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import BookOrder from './Pages/BookOrder'
import PendingOrder from './Pages/PendingOrder'
import CompletedOrder from './Pages/CompletedOrder'

const App = () => {
  return (
    <BrowserRouter>
    <div className='App h-min-screen bg-gradient-to-r from-[#D0A2F7] via-[#c182f9] to-[#a64ff2]'>
      <Navbar/>
    <Routes>
      <Route path ='/' element={<BookOrder/>}/>
      <Route path ='/pending' element={<PendingOrder/>}/>
      <Route path ='/completed' element={<CompletedOrder/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
