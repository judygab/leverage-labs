"use client";
import React, { useState } from 'react'

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
    <div className='flex border w-full'>
      <div>
        {
          TabsList.map(tab => {
            return (
              <div
                key={tab.id}
                className={`flex items-center justify-center w-32 h-12 cursor-pointer ${selectedTab === tab.id ? 'bg-gray-100' : ''}`}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.title}
              </div>
            )
          })
        }
      </div>
      <div className='content min-h-[500px]'>
        <p>Content</p>
      </div>
    </div>
  )
}

export default ChartsContainer