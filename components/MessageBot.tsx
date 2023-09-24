import React from 'react'
import { Button, Image, Divider } from "@chakra-ui/react";

type Props = {
  close: () => void
}

const MessageBot = ({ close }: Props) => {
  return (
    <div className='bg-[#D9D9D9] p-8 rounded-[45px] rounded-br-none absolute  bottom-40 right-6 z-50 border-black'>
      <div className='flex content-between items-start'>
        <p className='font-bold min-w-[160px] max-w-lg text-black'>All notifications</p>
        <Button onClick={close} bgColor="transparent" w="26px" justifySelf="start" justifyContent="end" alignItems="start" padding={0}>
          <Image aria-label="close" src={"./x-rounded.svg"} />
        </Button></div>
      <Divider />
    </div>
  )
}

export default MessageBot