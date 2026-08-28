import { useParams } from "react-router";
import { searchRepoLanguage, searchRepositoriesLanguage } from "../services/githubapi";
import { useEffect, useState } from "react";


const RepositoryDetail = () => {
  const { repoID } = useParams();
  console.log(repoID)
  const [language, setLanguage] = useState("python");
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    searchRepoLanguage(repoID)
      .then((res) => {
        console.log(res.data)
        setRepositories(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [language]);

  return (
    <div>
      <h2>Repository Detail - {repoID}</h2>

      <div>
        <p>Language: {language}</p>

        {repositories.map((repo,i) => (
          <div key={i}>
            {repo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryDetail;
