import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import { octoapi } from "./services/githubapi"
import { useEffect } from "react"



const App = () => {
  useEffect(()=>{
    octoapi()
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