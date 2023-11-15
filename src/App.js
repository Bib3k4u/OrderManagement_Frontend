import React from 'react'
import Navbar from './Components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import BookOrder from './Pages/BookOrder'
import PendingOrder from './Pages/PendingOrder'
import CompletedOrder from './Pages/CompletedOrder'

const App = () => {
  return (
    <BrowserRouter>
    <div className='App'>
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
