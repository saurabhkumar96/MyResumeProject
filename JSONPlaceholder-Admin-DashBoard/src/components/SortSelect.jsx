import React from 'react'

const SortSelect = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  const handleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <div className="flex gap-3">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
      >
        <option value="id">Sort by ID</option>
        <option value="title">Sort by Title</option>
      </select>

      <button
        onClick={handleSortOrder}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
      </button>
    </div>
  )
}

export default SortSelect
