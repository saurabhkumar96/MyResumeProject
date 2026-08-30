// import React, { useEffect, useState } from 'react'
// import { allUsers, postDetail, commentDetail } from '../services/jsonPlaceholderapi'
// import { Link } from 'react-router'

// const AdminPage = () => {
//   const [posts, setPosts] = useState([])
//   const [post, setPost] = useState([])
//   const [comments, setComments] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // all User
//     allUsers()
//       .then((res) => {
//         // console.log(res.data)
//         setPosts(res.data)
//       })
//       .catch((err) => {
//         console.log(`Something went wrong -> ${err.message}`)
//       })
//       .finally(() => {
//         setLoading(false)
//       })

//     // all posts
//     postDetail()
//       .then((res) => {
//         setPost(res.data)
//         // console.log(res.data)
//       })
//       .catch((err) => {
//         console.log(`Something went wrong -> ${err.message}`)
//       })
//     // all comments
//     commentDetail()
//       .then((res) => {
//         console.log(res.data)
//         setComments(res.data)
//       })
//       .catch((err) => {
//         console.log(`Something went wrong -> ${err.message}`)
//       })
//   }, [])

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">

//       {/* Header */}
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             Admin Dashboard
//           </h1>

//           <p className="mt-1 text-gray-500">
//             Manage your posts
//           </p>
//         </div>

//         <button className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer">
//           + Add Post
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

//         <div className="rounded-xl bg-white p-6 shadow-sm">
//           <p className="text-sm font-medium text-gray-500">
//             Total Users
//           </p>

//           <h2 className="mt-2 text-3xl font-bold text-gray-900">
//             {posts.length}
//           </h2>
//         </div>
//         <div className="rounded-xl bg-white p-6 shadow-sm">
//           <p className="text-sm font-medium text-gray-500">
//             Total Posts
//           </p>

//           <h2 className="mt-2 text-3xl font-bold text-gray-900">
//             {post.length}
//           </h2>
//         </div>
//         <div className="rounded-xl bg-white p-6 shadow-sm">
//           <p className="text-sm font-medium text-gray-500">
//             Total Comments
//           </p>

//           <h2 className="mt-2 text-3xl font-bold text-gray-900">
//             {comments.length}
//           </h2>
//         </div>

//         <div className="rounded-xl bg-white p-6 shadow-sm">
//           <p className="text-sm font-medium text-gray-500">
//             Status
//           </p>

//           <div className="mt-2 flex items-center gap-2">
//             <span className="h-3 w-3 rounded-full bg-green-500"></span>

//             <h2 className="text-xl font-semibold text-green-600">
//               Active
//             </h2>
//           </div>
//         </div>

//       </div>

//       {/* Posts */}
//       <div className="overflow-hidden rounded-xl bg-white shadow-sm">

//         {/* Table Header */}
//         <div className="border-b border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900">
//             All Posts
//           </h2>

//           <p className="mt-1 text-sm text-gray-500">
//             List of all available posts
//           </p>
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <p className="text-gray-500">
//               Loading posts...
//             </p>
//           </div>
//         ) : (
//           /* Table */
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">

//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
//                     ID
//                   </th>

//                   <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
//                     Name
//                   </th>

//                   <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
//                     Username
//                   </th>
//                   <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
//                     email
//                   </th>

//                   <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-200">
//                 {posts.map((post) => (
//                   <tr
//                     key={post.id}
//                     className="transition hover:bg-gray-50"
//                   >

//                     {/* ID */}
//                     <td className="whitespace-nowrap px-6 py-4">
//                       <span className="rounded-md bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
//                         {post.id}
//                       </span>
//                     </td>

//                     {/* Title */}
//                     <td className="max-w-xs px-6 py-4">
//                       <p className="font-medium capitalize text-gray-900">
//                         {post.name}
//                       </p>
//                     </td>

//                     {/* Body */}
//                     <td className="max-w-md px-6 py-4">
//                       <p className="line-clamp-2 text-sm text-gray-500">
//                         {post.username}
//                       </p>
//                     </td>
//                     <td className="max-w-md px-6 py-4">
//                       <p className="line-clamp-2 text-sm text-gray-500">
//                         {post.email}
//                       </p>
//                     </td>

//                     {/* Action */}
//                     <td className="whitespace-nowrap px-6 py-4">
//                       <Link
//                         to={`/posts/${post.id}`}
//                         className="inline-block cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-300"
//                       >
//                         View
//                       </Link>
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>

//             </table>
//           </div>
//         )}

//       </div>
//     </div>
//   )
// }

// export default AdminPage



import React, { useEffect, useMemo, useState } from 'react'
import { allPost } from '../services/jsonPlaceholderapi'
import SearchSort from '../components/SearchBar'
import SortSelect from '../components/SortSelect'
import PostTable from '../components/UserTable'


const AdminPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    allPost()
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        console.log(`Something went wrong -> ${err.message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const filteredPosts = useMemo(() => {
    const result = posts.filter((post) => {
      const searchText = search.toLowerCase()

      return (
        post.title.toLowerCase().includes(searchText) ||
        post.body.toLowerCase().includes(searchText)
      )
    })

    result.sort((a, b) => {
      let valueA
      let valueB

      if (sortBy === 'id') {
        valueA = a.id
        valueB = b.id
      } else {
        valueA = a.title.toLowerCase()
        valueB = b.title.toLowerCase()
      }

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1
      }

      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1
      }

      return 0
    })

    return result
  }, [posts, search, sortBy, sortOrder])

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your posts
          </p>
        </div>

        <button className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
          + Add Post
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 flex gap-5">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Posts
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {posts.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Showing
          </p>

          <h2 className="mt-2 text-3xl font-bold text-indigo-600">
            {filteredPosts.length}
          </h2>
        </div>
      </div>

      {/* Posts */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">

        <div className="border-b border-gray-200 p-6">

          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900">
              All Posts
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Search and manage your posts
            </p>
          </div>

          {/* Search + Sort Components */}
          <div className="flex flex-col gap-3 md:flex-row">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <SortSelect
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

        </div>

        {/* Content */}
        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading posts...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-medium text-gray-700">
              No posts found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try a different search term.
            </p>
          </div>
        ) : (
          <PostTable posts={filteredPosts} />
        )}

      </div>
    </div>
  )
}

export default AdminPage
