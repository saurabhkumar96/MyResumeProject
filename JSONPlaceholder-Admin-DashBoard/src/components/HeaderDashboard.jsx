import React from 'react'

const HeaderDashboard = () => {
  return (
    <>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your posts
          </p>
        </div>

        <button className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer">
          + Add Post
        </button>
      </div>
    </>
  )
}

export default HeaderDashboard