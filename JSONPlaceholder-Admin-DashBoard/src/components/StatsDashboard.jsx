import React from 'react'
import AllPosts from './AllPosts'
import { NavLink } from 'react-router'

const StatsDashboard = ({users,posts, comments}) => {

    return (
        <>
        <NavLink to="/allpost">
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                    Total Users
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {users.length}
                </h2>
            </div>
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
                    Total Comments
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {comments.length}
                </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">
                    Status
                </p>

                <div className="mt-2 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500"></span>

                    <h2 className="text-xl font-semibold text-green-600">
                        Active
                    </h2>
                </div>
            </div>

        </div>
        </NavLink>
        </>
    )
}

export default StatsDashboard