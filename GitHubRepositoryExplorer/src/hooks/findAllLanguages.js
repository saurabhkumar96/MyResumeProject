import { searchRepositoriesLanguage, showAllRepo } from "../services/githubapi";

export const totalLanguage = async ()=>{
    try {
        const repo = await showAllRepo()
        
        const arr = repo.map((r)=> searchRepositoriesLanguage(r.name))
        
        const uniqueLanguage = new Set(arr)
        console.log(uniqueLanguage,uniqueLanguage.size)
    } catch (error) {
        console.log(error.message)
    }
}