import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import { useEffect } from "react"
import RepositoryDetail from "./components/RepositoryDetail"
import { totalLanguage } from "./hooks/findAllLanguages"
import { searchRepoLanguage } from "./services/githubapi"

const App = () => {
  useEffect(async ()=>{
    const res = await searchRepoLanguage("MyResumeProject")
    console.log(data.data)
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