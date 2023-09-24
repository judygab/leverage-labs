import React, { useState, useEffect } from 'react'
import { Button, Image, Divider } from "@chakra-ui/react";
import { useMessages, useW3iAccount } from "@web3inbox/widget-react";

type Props = {
  close: () => void
}

const MessageBot = ({ close }: Props) => {
  const { account } = useW3iAccount();
  const { messages, deleteMessage } = useMessages(account);

  return (
    <div className='bg-[#D9D9D9] p-9 rounded-[45px] rounded-br-none absolute  bottom-44 right-6 z-50'>
      <div className='flex content-between items-start border-b-2 border-black'>
        <p className='font-bold min-w-[160px] max-w-lg text-black'>All notifications</p>
        <Button onClick={close} bgColor="transparent" w="26px" justifySelf="start" justifyContent="end" alignItems="start" padding={0}>
          <Image aria-label="close" src={"./x-rounded.svg"} />
        </Button></div>
      <ul>
        {
          messages
            .sort((a, b) => b.id - a.id)
            .slice(-5)
            .map(({ id, message }: any) => {
              return (
                <li key={id} className='border-b border-black'>
                  <p className='text-black'>{message.title}: {message.body}</p>
                </li>
              )
            }
            )
        }
      </ul>
      <Divider />
    </div>
  )
}

export default MessageBot