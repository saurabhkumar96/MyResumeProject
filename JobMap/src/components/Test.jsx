import React, { useEffect } from 'react'
import { useFindJob } from '../hooks/useFindJob'

const Test = () => {
    const {jobs} = useFindJob()
    console.log(jobs)
    return (
        <div>Test</div>
    )
}

export default Test