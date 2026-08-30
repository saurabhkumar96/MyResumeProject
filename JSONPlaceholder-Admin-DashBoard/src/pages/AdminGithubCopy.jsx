import React, { useEffect, useMemo, useState } from 'react'
import { allUsers } from '../services/jsonPlaceholderapi'
import SearchBar from '../components/SearchBar'
import SortSelect from '../components/SortSelect'
import PostTable from '../components/UserTable'


const AdminPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    allUsers()
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
        post.name.toLowerCase().includes(searchText) ||
        post.email.toLowerCase().includes(searchText)
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