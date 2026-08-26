import { useCallback } from "react";
import { showAllRepo,fetchPerPageRepo } from "../services/githubapi";

export function useGithubApi(){
    const getRepos = useCallback(async ()=>{
        try {
            const res = await showAllRepo()
            if (res.status != 200) throw new Error("Fail to fetch data")
            const arr = res.data.map((elem)=> elem.name)
            return arr
        } catch (error) {
            console.log(`Error! Status: ${err?.status}. Message: ${err?.response?.data?.message || err.message}`)
            return []
        }
    },[])
    const getPerPageRepo = async (page,username)=>{
        try {
            const res = await fetchPerPageRepo(page,username)
            const arr = res.data.map((elem)=> elem.name)
            return arr
        } catch (error) {
            console.log(`Error! ${error.message}`)
        }
    }
    return {getRepos, getPerPageRepo}
}

