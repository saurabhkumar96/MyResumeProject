import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import { useEffect } from "react"
const App = () => {
  useEffect(()=>{
    
  },[])
  return (
    <>
      <Routes>
        <Route index element={<Home />}/>
      </Routes>
    </>
  )
}

export default App