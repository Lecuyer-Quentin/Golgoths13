import SearchBar from './searchBar/searchBar'


export default function Navbar() {
  return (
    <div className="flex justify-between items-center h-16 mt-8 primaryColor">
      <h2 className="text-3xl font-semibold text-white ml-6">Dashboard</h2>
      <SearchBar />
    </div >
    
  )
}
