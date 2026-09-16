import React, { use, useRef, useState } from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'



const Home = () => {
    const {loading,  generateReport} = useInterview()
    const [jobDescription, setoJbDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()
    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({jobDescription, selfDescription, resumeFile})
        navigate(`/interview/${data._id}`)
    }

    if(loading) return (<main><h1>loading...</h1></main>)

  return (
    <main>
        <div id='left'>
            <textarea name="jobDescription" id="jobDescription" placeholder='jobDescription'></textarea>
        </div>
        <div id='right'>
            <div className='input-group'>
                <label htmlFor="resume">upload resume</label>
                <input ref={resumeInputRef} type="file" id='resume' name='resume' placeholder='upload resume' className='border-2' />
            </div>
            <div className='input-group'>
                <label htmlFor="selfDescription">self description</label>
                <textarea onChange={(e) => setSelfDescription(e.target.value)} name="selfDescription" id="selfDescription"></textarea>
            </div>
            <div className='input-group'>
                <label htmlFor="jobDescription">job Description</label>
                <textarea onChange={(e) => setoJbDescription(e.target.value)} name="jobDescription" id="jobDescription"></textarea>
            </div>
            <button onClick={handleGenerateReport}>Generate</button>
        </div>
    </main>
  )
}

export default Home