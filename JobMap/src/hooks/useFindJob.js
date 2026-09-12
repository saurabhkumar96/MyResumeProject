import { useEffect, useState } from "react";
import { allRemoteJobs } from "../services/remotiveService";


export function useFindJob(){
    
    // const [jobs,setJobs] = useState([])
    // useEffect(()=>{ 
    //     const fetchJobs = async ()=>{
    //         try {
    //             const response = await allRemoteJobs()
    //             setJobs(response)
    //         } catch (error) {
    //             console.log("somethis is error in useFindJob",error.message)
    //         }
    //     }
    //     fetchJobs()
    // },[])
    // return {jobs};

    const [caterogy, setCaterogy] = useState([])
    useEffect(()=>{
        const fetchCategory = async()=>{
            try {
                const response = await allRemoteJobs()
                const data = response.data.jobs.map((res)=> res.category)
                setCaterogy(data)
            } catch (err) {
                console.log("something is error",err)
            }
        }
        fetchCategory()
    },[])
    return {caterogy}
}