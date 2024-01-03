// Definition: Search bar component for the dashboard navbar

export default function SearchBar() {
  return (
        <div className="relative mr-8 text-gray-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path
                d="M21 10.5H5M21 18.5H5M21 14.5H5M21 6.5H5M21 22.5H5M21 2.5H5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            </span>
            <input
            type="text"
            className="w-18 py-2 pl-10 pr-4 bg-gray-100 border-2 rounded-md dark:bg-gray-700 focus:bg-white focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:text-gray-900"
            placeholder="Search"
            />
        </div>
  )
}
