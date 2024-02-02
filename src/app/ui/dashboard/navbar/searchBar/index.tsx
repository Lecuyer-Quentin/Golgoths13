'use client'

export default function SearchBar() {

  const renderSearchBar = () => {
    return (
      <div className="flex justify-center items-center relative">
        <span className="absolute inset-y-0 left-0 flex items-center justify-center pl-2">
        <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none">
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
          className="w-18 py-2 pl-10 pr-4 border-2 border-yellow-400 rounded-md focus:bg-white focus:text-black focus:border-yellow-400 primaryColor"
          placeholder="Search"
        />
      </div>
    )
  }

  return (
    <div className="relative md:mr-8 text-yellow-400 flex justify-center items-center">
      {renderSearchBar()}
  </div>
  )
}
