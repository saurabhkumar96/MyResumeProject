import React from 'react'
import { Link } from 'react-router'

const UserTable = ({loading,users}) => {
    return(
    <div>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            All Posts
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            List of all available posts
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-gray-500">
              Loading posts...
            </p>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    ID
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Name
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Username
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    email
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-gray-50"
                    >

                    {/* ID */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-md bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
                        {user.id}
                      </span>
                    </td>

                    {/* Title */}
                    <td className="max-w-xs px-6 py-4">
                      <p className="font-medium capitalize text-gray-900">
                        {user.name}
                      </p>
                    </td>

                    {/* Body */}
                    <td className="max-w-md px-6 py-4">
                      <p className="line-clamp-2 text-sm text-gray-500">
                        {user.username}
                      </p>
                    </td>
                    <td className="max-w-md px-6 py-4">
                      <p className="line-clamp-2 text-sm text-gray-500">
                        {user.email}
                      </p>
                    </td>

                    {/* Action */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        to={`/posts/${user.id}`}
                        className="inline-block cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-300"
                        >
                        View
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  )
}

export default UserTable