import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import { useEffect } from "react"
import RepositoryDetail from "./components/RepositoryDetail"
import Pop from "./pages/Pop"
import { showAllRepoLanugage,searchRepoLanguage } from "./services/githubapi"


const App = () => {

  
  useEffect(()=>{
    showAllRepoLanugage()
  },[])
  return (
    <>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="repository/:repoID" element={<RepositoryDetail />} />
        <Route path="/temp" element={<Pop />} />
        
      </Routes>
    </>
  )
}

export default App