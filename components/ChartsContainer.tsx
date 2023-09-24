// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react'
import BarChart from './BarChart';

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
  const [barLabels, setBarLabels] = useState<any>([]);
  const [barData, setBarData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/auctionhourly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();

      setBarLabels([...data.data.dateHour]);
      setBarData([...data.data.count]);
    }
    fetchData();
  }, [])

  return (
    <div className='flex w-full gap-4'>
      <div className='w-1/3 flex gap-2 z-50 flex-col'>
        {
          TabsList.map(tab => {
            return (
              <div
                key={tab.id}
                className={`bg-[#081F28] flex flex-1 items-center justify-center h-12 cursor-pointer text-white hover:text-[#CAEFF9] ${selectedTab === tab.id ? 'border-t border-b border-l rounded-l' : 'border rounded'}`}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.title}
              </div>
            )
          })
        }
      </div>
      <div className='content flex-grow border min-h-[500px] p-6 bg-[#081F28]'>
        {barData?.length > 0 && barLabels?.length > 0 ? <BarChart labels={barLabels} values={barData} /> : null}
      </div>
    </div>
  )
}

export default ChartsContainer