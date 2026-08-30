import React from 'react'
import { useParams } from 'react-router'


const ActionPage = () => {
  const {id} = useParams()
  return (
    <div>ActionPage : {id}</div>
  )
}

export default ActionPage