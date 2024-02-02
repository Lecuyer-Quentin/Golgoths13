'use client'

import SearchBar from './searchBar'

import { FaSearchPlus } from "react-icons/fa";
import { FaSearchMinus } from "react-icons/fa";

import { useState } from "react";
import { Button } from "@nextui-org/react";




export default function Navbar() {
  const [active, setActive] = useState(false);

 
  const renderSearchIconPlus = () => {
    return (
      <Button onClick={() => setActive(!active)} isIconOnly color="warning" variant="faded" aria-label="Open search bar" className="bg-transparent border-none" disableRipple>
        <FaSearchPlus className='text-yellow-400 text-xl' />
      </Button>

    )
  }

  const renderSearchIconMinus = () => {
    return (
      <Button onClick={() => setActive(!active)} isIconOnly color="warning" variant="faded" aria-label="Open search bar" className="bg-transparent border-none" disableRipple >
        <FaSearchMinus className='text-yellow-400 text-xl' />
      </Button>
    )
  }
  const renderNavbar = () => {
    return (
      <div className="flex justify-center items-center h-12 transition-all duration-300 ease-in-out transform md:justify-between">
      <SearchBar />
    </div >
    )
  }


  return (
    <div className="relative text-yellow-400 flex justify-end items-center">
      {active ? renderNavbar() : null}
      {active ? renderSearchIconMinus() : renderSearchIconPlus()}
  </div>
    
    
  )
}
