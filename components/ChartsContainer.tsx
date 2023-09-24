"use client";
import React, { useState } from 'react'
import BarStacked from './BarStacked';

type Props = {}

type Tab = {
  id: number;
  title: string;
  component: React.FC;
}

const TabsList = [
  {
    id: 0,
    title: 'Outstanding leverage',
    component: () => <div>Tab 1</div>
  },
  {
    id: 1,
    title: 'Loans liquidated vs refinanced',
    component: () => <div>Tab 2</div>
  },
  {
    id: 2,
    title: 'Average loan duration',
    component: () => <div>Tab 3</div>
  }
]

const ChartsContainer = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className='flex w-full z-50 gap-4'>
      <div className='w-1/3 flex gap-2 flex-col'>
        {
          TabsList.map(tab => {
            return (
              <div
                key={tab.id}
                className={`flex flex-1 items-center justify-center h-12 cursor-pointer border rounded text-white hover:text-[#CAEFF9] ${selectedTab === tab.id ? 'border-r-none' : ''}`}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.title}
              </div>
            )
          })
        }
      </div>
      <div className='content flex-grow border min-h-[500px]'>
        <BarStacked />
      </div>
    </div>
  )
}

export default ChartsContainer