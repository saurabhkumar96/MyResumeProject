import { useParams } from "react-router"



const RepositoryDetail = () => {
    const {ropoID} = useParams()
  return (
    <div>RepositoryDetail "-" {ropoID}</div>
  )
}

export default RepositoryDetail