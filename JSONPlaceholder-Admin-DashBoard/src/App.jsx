import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import AdminPage from './pages/AdminPage'
import ActionPage from './pages/ActionPage'
import Toastify from './components/Toastify'
import { showSinglePost } from './services/jsonPlaceholderapi'
import AllPosts from './components/AllPosts'

const App = () => {
    // some
  return (
    <>
    <Toastify />
    <Routes>
      <Route index element={<AdminPage />} />
      <Route path='posts/:id' element={<ActionPage />} />
      <Route path='/allpost' element={<AllPosts />} />
    </Routes>
    </>
  )
}

export default App