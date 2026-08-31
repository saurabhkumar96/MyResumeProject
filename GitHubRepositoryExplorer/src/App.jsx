import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import { useEffect } from "react"
import RepositoryDetail from "./components/RepositoryDetail"
import Pop from "./pages/Pop"
import { getAllCommits } from "./services/githubapi"
import { userAndCommits } from "./hooks/useFetch"


const App = () => {
  useEffect(()=>{
    // userAndCommits()
    // getAllCommits()
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