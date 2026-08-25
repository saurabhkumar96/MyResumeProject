import { showAllRepo } from "../services/githubapi";

export async function useGithubApi(){
    const res =  showAllRepo()
    const arr = []
    res.then((elem)=>{
        elem.forEach((data)=>{
            arr.push(data.name)
        })
    })
    return arr
    .catch((err)=>{
        console.log("error in finding",err)
    })
}