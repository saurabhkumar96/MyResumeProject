import { useParams } from "react-router";
import { searchRepoLanguage } from "../services/githubapi";
import { useEffect, useState } from "react";


const RepositoryDetail = () => {
  const { repoLanguage } = useParams();
  const [language, setLanguage] = useState([])
  const [error, setError] = useState("");

/*
I took this approach from the chatGPT
  const [language, setLanguage] = useState([]);
const [error, setError] = useState("");
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchLanguages = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await searchRepoLanguage(repoLanguage);
      const keys = Object.keys(res);

      if (keys.length === 0) {
        throw new Error("No languages found");
      }

      setLanguage(keys);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchLanguages();
}, [repoLanguage]);
*/


  useEffect(() => {
    const owner = localStorage.getItem("githubUsername")
    searchRepoLanguage(owner,"ellocent_labs")
    .then((res)=>{
      const keys = Object.keys(res);
      if(keys.length > 0){
        setLanguage(keys)
        setError("")
      }
      else{
        throw new Error("language is not present")
      }
    })
    .catch((err)=> setError(err.message))
  }, [repoLanguage])

  if(error){
    return(
      <div>{error}</div>
    )
  }
  return (
    <div>
      {/* <h2>Repository Detail - {typeof(language)}</h2> */}

      <div>
        {language.map((lang,index)=>{
          return(
            <div key={index}>
              {lang}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default RepositoryDetail;
