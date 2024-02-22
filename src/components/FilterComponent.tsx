'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FilterComponent({ data }: { data: any[] }) {
  const router = useRouter()
  const [quotes, setQuotes] = useState(data)

  function handleSort() {
    const sortedData = quotes.sort((a: any, b: any) => a.quote - b.quote)
    setQuotes(sortedData)
    //console.log(sortedData)
    router.refresh()
  }
  return (
    <div className="bg-slate-900 h-full w-screen text-slate-50 p-2">
      <h1 className="text-xl text-slate-50">Filter</h1>
      <div className='w-sceen h-full flex row-auto flex-wrap gap-2'>
        {quotes.map((d) => (
          <div key={d.id} >
            <div className='bg-amber-100 rounded p-2 min-w-24'>
              <p className='text-black'>id: {d.id}</p>
              <h3 className='text-black'>Author: {d.author}</h3>
              <h2 className='text-black'>Quote: {d.quote}</h2>
              <div>

              </div></div></div>
        ))}</div>
      {/*<button onClick={handleSort}>Sort</button>*/}
    </div>
  )
}
