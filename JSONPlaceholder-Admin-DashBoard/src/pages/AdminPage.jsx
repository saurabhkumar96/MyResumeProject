import React, { useEffect, useState } from 'react'
import { allUsers, showAllPost, commentDetail } from '../services/jsonPlaceholderapi'
import { Link } from 'react-router'
import HeaderDashboard from '../components/HeaderDashboard'
import StatsDashboard from '../components/StatsDashboard'
import UserTable from '../components/UserTable'


const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // all User
    allUsers()
      .then((res) => {
        // console.log(res.data)
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(`Something went wrong -> ${err.message}`)
      })
      .finally(() => {
        setLoading(false)
      })

    // all posts
    showAllPost()
      .then((res) => {
        setPosts(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(`Something went wrong -> ${err.message}`)
      })
    // all comments
    commentDetail()
      .then((res) => {
        setComments(res.data)
      })
      .catch((err) => {
        console.log(`Something went wrong -> ${err.message}`)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">

      {<HeaderDashboard />}
      {/* Stats */}
      {<StatsDashboard users={users} posts={posts} comments={comments}/>}
      {/* Posts */}
      <UserTable loading={loading} users = {users}/>
    </div>
  )
}

export default AdminPage