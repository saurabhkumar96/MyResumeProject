import { useEffect, useState } from "react";
import { allRemoteJobs } from "../services/remotiveService";


export function useFindJob(){
    const [jobs,setJobs] = useState([])
    useEffect(()=>{ 
        const fetchJobs = async ()=>{
            try {
                const response = await allRemoteJobs()
                setJobs(response)
            } catch (error) {
                console.log("somethis is error in useFindJob",error.message)
            }
        }
        fetchJobs()
    },[])
    return {jobs};
}