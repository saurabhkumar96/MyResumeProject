import React, { useEffect, useState } from 'react'
import { showAllPost } from '../services/jsonPlaceholderapi'

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true)

                const res = await showAllPost()
                setPosts(res.data)
            } catch (err) {
                console.log(`Posts fetch nahi hue - ${err.message}`)
                setError('Unable to load posts')
            } finally {
                setLoading(false)
            }
        }

        getPosts()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-[#f5f6f8]">
                <p className="text-gray-500">Loading posts...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-[#f5f6f8]">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f5f6f8] p-6">

            {/* ================= TOP CARDS ================= */}
            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

                {/* Total Users */}
                <div className="rounded-2xl border border-gray-200 bg-white px-7 py-8 shadow-sm">
                    <p className="text-base font-medium text-slate-500">
                        Total Users
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-slate-950">
                        10
                    </h2>
                </div>

                {/* Total Posts */}
                <div className="rounded-2xl border border-gray-200 bg-white px-7 py-8 shadow-sm">
                    <p className="text-base font-medium text-slate-500">
                        Total Posts
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-slate-950">
                        {posts.length}
                    </h2>
                </div>

                {/* Total Comments */}
                <div className="rounded-2xl border border-gray-200 bg-white px-7 py-8 shadow-sm">
                    <p className="text-base font-medium text-slate-500">
                        Total Comments
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-slate-950">
                        500
                    </h2>
                </div>

                {/* Status */}
                <div className="rounded-2xl border border-gray-200 bg-white px-7 py-8 shadow-sm">
                    <p className="text-base font-medium text-slate-500">
                        Status
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="h-3.5 w-3.5 rounded-full bg-green-500"></span>

                        <span className="text-2xl font-medium text-green-600">
                            Active
                        </span>
                    </div>
                </div>
            </div>


            {/* ================= POSTS TABLE ================= */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                {/* Table Header */}
                <div className="border-b border-gray-200 px-7 py-8">
                    <h1 className="text-2xl font-semibold text-slate-950">
                        All Posts
                    </h1>

                    <p className="mt-2 text-base text-slate-500">
                        List of all available posts
                    </p>
                </div>


                {/* Responsive Table */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        {/* Table Head */}
                        <thead>
                            <tr className="bg-[#f8f9fa]">

                                <th className="px-7 py-5 text-left text-sm font-medium uppercase tracking-wide text-slate-500">
                                    ID
                                </th>

                                <th className="px-7 py-5 text-left text-sm font-medium uppercase tracking-wide text-slate-500">
                                    Title
                                </th>

                                <th className="px-7 py-5 text-left text-sm font-medium uppercase tracking-wide text-slate-500">
                                    User ID
                                </th>

                                <th className="px-7 py-5 text-left text-sm font-medium uppercase tracking-wide text-slate-500">
                                    Description
                                </th>

                                <th className="px-7 py-5 text-left text-sm font-medium uppercase tracking-wide text-slate-500">
                                    Action
                                </th>

                            </tr>
                        </thead>


                        {/* Table Body */}
                        <tbody>

                            {posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="border-t border-gray-200 transition-colors hover:bg-slate-50"
                                >

                                    {/* ID */}
                                    <td className="px-7 py-5">
                                        <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-indigo-50 px-2 text-sm font-semibold text-indigo-600">
                                            {post.id}
                                        </span>
                                    </td>


                                    {/* Title */}
                                    <td className="max-w-[280px] px-7 py-5">
                                        <p className="line-clamp-2 font-semibold capitalize text-slate-950">
                                            {post.title}
                                        </p>
                                    </td>


                                    {/* User ID */}
                                    <td className="px-7 py-5">
                                        <span className="text-slate-500">
                                            User {post.userId}
                                        </span>
                                    </td>


                                    {/* Description */}
                                    <td className="max-w-[400px] px-7 py-5">
                                        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                                            {post.body}
                                        </p>
                                    </td>


                                    {/* Action */}
                                    <td className="px-7 py-5">
                                        <button
                                            type="button"
                                            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
                                        >
                                            View
                                        </button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    )
}

export default AllPosts