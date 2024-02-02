'use client'

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import {MdLightMode, MdDarkMode } from "react-icons/md";



export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isLightActive, setIsLightActive] = useState(false)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsLightActive(theme === 'light')
  }, [ theme ])

  if(!mounted) return null

  const handleLightClick = () => {
    setTheme('light')
    setIsLightActive(true)
  }

  const handleDarkClick = () => {
    setTheme('dark')
    setIsLightActive(false)
  }
  
  const renderThemeSwitcher = () => {
    return (
      <div className="flex flex-col h-10 absolute left-0 z-90">
        <Button size="sm" className={`bg-transparent ${isLightActive ? 'text-yellow-400' : 'text-red-400 opacity-50'}`}
                isIconOnly onClick={handleLightClick}>
            <MdLightMode/>
        </Button>
        <Button size="sm" className={`bg-transparent ${!isLightActive ? 'text-blue-400' : 'text-red-400 opacity-50'}`}
                isIconOnly onClick={handleDarkClick}>
            <MdDarkMode />
        </Button>
      </div>
    )
  }


  return renderThemeSwitcher()
};