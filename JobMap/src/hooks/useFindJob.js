import { useEffect, useState } from "react";
import { allRemoteJobs } from "../services/remotiveService";


export function useFindJob() {

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

    const [loading, setLoading] = useState(true)
    const [listofjob,setListofjob] = useState([])
    const [caterogy, setCaterogy] = useState([])
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                if (loading) {
                    const response = await allRemoteJobs()
                    const data = response.data.jobs.map((res) => res.category)
                    setCaterogy(data)
                }
            } catch (err) {
                console.log("something is error", err)
            } finally {
                setLoading(false)
            }
        }
        fetchCategory()
    }, [])

    useEffect(()=>{
        const fetchListOfJobs = async ()=> {
            try {
                if(loading){
                    const response = await allRemoteJobs()
                    console.log(response.data.jobs)
                    setListofjob(response.data.jobs)
                }
            } catch (error) {
                console.log("something is error in the",error)
            } finally {
                setLoading(false)
            }
        }
        fetchListOfJobs()
    }, [])

    return { caterogy,loading,listofjob }
}