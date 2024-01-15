import React from 'react'
import { FaPlus } from "react-icons/fa";
import { Button } from "@nextui-org/react";

export default function InfoBtn() {

    const renderButton = () => {
        return (
          <Button size="md" variant="shadow" startContent={<FaPlus />}
                   className={`bg-yellow-400 font-bold absolute bottom-7 right-10`}>
            d&apos;infos
          </Button>
        )
      }
    
  return (
    <>
      {renderButton()}
    </>
  )
}
