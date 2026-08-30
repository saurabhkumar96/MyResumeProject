import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import AdminPage from './pages/AdminPage'
import { postDetail } from './services/jsonPlaceholderapi'
import ActionPage from './pages/ActionPage'
import Toastify from './components/Toastify'

const App = () => {
  useEffect(()=>{
    // postDetail()
  },[])
  return (
    <>
    <Toastify />
    <Routes>
      <Route index element={<AdminPage />} />
      <Route path='posts/:id' element={<ActionPage />} />
    </Routes>
    </>
  )
}

export default App