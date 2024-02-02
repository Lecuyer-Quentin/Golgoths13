import React from 'react'
import { FaPlus } from "react-icons/fa";
import { Button } from "@nextui-org/react";

export default function InfoBtn() {

   //const renderButton = () => {
   //    return (
   //      <Button size="md" variant="shadow" startContent={<FaPlus />} disabled
   //               className={`bg-yellow-400 font-bold absolute bottom-7 right-10
   //                          text-black
   //               `}>
   //        d&apos;infos
   //      </Button>
   //    )
   //  }

   const renderInfoBtn = () => {
    return(
      <div className='bg-yellow-400 font-bold absolute bottom-7 right-10 rounded-lg px-4 py-2
                    text-black'>
                      <span>+</span>
                      d&apos;infos
      </div>
    )
   }
    
  return renderInfoBtn()
}
