import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import { useEffect } from "react"
import { totalLanguage } from "./hooks/findAllLanguages"
import RepositoryDetail from "./components/RepositoryDetail"

const App = () => {
  useEffect(()=>{
    // totalLanguage()
  },[])
  return (
    <>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="repository/:ropoID" element={<RepositoryDetail />} />
      </Routes>
    </>
  )
}

export default App