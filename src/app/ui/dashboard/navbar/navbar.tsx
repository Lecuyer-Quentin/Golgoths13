import SearchBar from './searchBar/searchBar'


export default function Navbar() {
  return (
    <div className="flex justify-between items-center h-16 mt-8 bg-gray-700" 
          style={{ 
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            //backgroundColor: '#130E0A',
             }}>
      <h2 className="text-3xl font-semibold text-white ml-6">Dashboard</h2>
      <SearchBar />
    </div >
    
  )
}
