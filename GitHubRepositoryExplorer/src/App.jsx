import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import { useEffect } from "react"
import RepositoryDetail from "./components/RepositoryDetail"
import Pop from "./pages/Pop"
import { searchRepoLanguage } from "./services/githubapi"


const App = () => {
  useEffect(()=>{
        const owner = localStorage.getItem("githubUsername")
        searchRepoLanguage(owner,"ellocent_labs")
  },[])
  return (
    <>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="repository/:repoLanguage" element={<RepositoryDetail />} />
        <Route path="/temp" element={<Pop />} />
        
      </Routes>
    </>
  )
}

export default App