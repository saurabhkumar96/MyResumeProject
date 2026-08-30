import React from 'react'
import { Link } from 'react-router'

const PostTable = ({ posts }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">

        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              ID
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Title
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Body
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr
              key={post.id}
              className="transition hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4">
                <span className="rounded-md bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
                  {post.id}
                </span>
              </td>

              <td className="max-w-xs px-6 py-4">
                <p className="font-medium capitalize text-gray-900">
                  {post.title}
                </p>
              </td>

              <td className="max-w-md px-6 py-4">
                <p className="line-clamp-2 text-sm text-gray-500">
                  {post.body}
                </p>
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                <Link
                  to={`/posts/${post.id}`}
                  className="inline-block rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-300"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default PostTable