import React from 'react'
import { Button, Image, Divider } from "@chakra-ui/react";

type Props = {
  close: () => void
}

const MessageBot = ({ close }: Props) => {
  return (
    <div className='bg-[#D9D9D9] p-9 rounded-[45px] rounded-br-none absolute  bottom-44 right-6 z-50'>
      <div className='flex content-between items-start border-b-2 border-black'>
        <p className='font-bold min-w-[160px] max-w-lg text-black'>All notifications</p>
        <Button onClick={close} bgColor="transparent" w="26px" justifySelf="start" justifyContent="end" alignItems="start" padding={0}>
          <Image aria-label="close" src={"./x-rounded.svg"} />
        </Button></div>
      <ul>
        <li className='border-b border-black'>18th June 2022: Action Started</li>
        <li className='border-b border-black'>17th July 2022: Action Started</li>
        <li className='border-b border-black'>16th August 2022: Action Started</li>
        <li className='border-b border-black'>15th September 2022: Action Started</li>
      </ul>
      <Divider />
    </div>
  )
}

export default MessageBot