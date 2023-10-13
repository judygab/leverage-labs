import React from 'react'
import Link from 'next/link'

type Props = {}

const HeroSection = (props: Props) => {
  return (
    <div className='max-w-container w-full px-4 pt-4 sm:px-6 flex lg:px-8 lg:justify-start overflow-hidden'>
      <div className='text-white relative z-20 mx-auto max-w-[40rem] flex flex-col items-center lg:items-start justify-start pb-16 pt-16 lg:mx-0 lg:w-[40rem] lg:max-w-none lg:flex-none lg:pb-24 lg:pr-4 lg:pt-20'>
        <h1 className='mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl sm:leading-[3.5rem]'>
          Get alerts, not liquidations</h1>
        <p className="mt-4 text-base leading-7 ">NFT trader&apos;s toolbox for safe leverage management. Get Telegram alerts in case your loans get close to liquidation. More complex functionality coming soon™.</p>
        <Link href="https://t.me/leverage_labs_bot" className='bg-[#CAEFF9] rounded-md mt-24 text-black px-8 block w-fit py-4 hover:bg-[#A0EBFF]'>Get Telegram Alerts</Link>
      </div>
      <div className='z-10 mt-24 hidden select-none lg:flex flex-1'>
        <div className='hidden'>
          <div className='h-[calc(2/3*100vh)] mt-20 w-[40rem]' style={{ backgroundImage: "url('/mobile-mockup.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
        </div>
      </div>
    </div>
  )
}

export default HeroSection