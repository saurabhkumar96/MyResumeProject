import React from 'react'
import { useFindJob } from '../hooks/useFindJob'

const Test = () => {
    const {caterogy} = useFindJob()
  return (
    <div>
        {caterogy.map((res)=> {
            return(
                <div>{res}</div>
            )
        })}
        <br />
        <br />
        <hr />
    </div>
  )
}

export default Test