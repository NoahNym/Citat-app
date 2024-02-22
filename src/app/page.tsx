import { getData, saveData, deleteData } from '@/utils/handleDatabase'
import Link from "next/link";
import { use } from 'react';
import { revalidateTag } from 'next/cache';



export default async function Home() {
  const data = await getData()
  //create
  const create = async (formData: FormData) => {
    'use server'
    const quote = formData.get("quote") as string
    const author = formData.get("author") as string
    const data = await saveData(quote, author)
    console.log(data)
    revalidateTag("quote")
  }
  
  //delete

  const deleteForm = async (formData: FormData) => {
    'use server'
    const id = formData.get("id") as string
    const data = await deleteData(id)
    console.log(id)
    console.log(data)
    revalidateTag("quote")
  }

  return (
    <div className="bg-slate-900 h-full w-screen text-slate-50 p-2 overflow-x-hidden overflow-y-auto ">
      <h1 className="text-xl text-slate-50">Welcome</h1>
      {/* loopa ut från databas */}

      <form action={create} className='flex flex-col gap-4 max-w-56'>

        <input className='text-slate-950' type="text" name='author' placeholder='Author' />
        <input className='text-slate-950' type="text" name='quote' placeholder="Quote" />
        <button className='bg-amber-400 p-2 rounded'>Save Quote</button>
      </form>
  
      <div className='overflow-x-hidden overflow-y-auto'>
        <div className='w-sceen h-full flex row-auto flex-wrap gap-2 '>
          {data.map(q => (
            <div key={q.id} >
              <div className='bg-amber-100 rounded p-2 max-w-2xl min-w-24 flex flex-col break-words'>
                <p className='text-black'>id: {q.id}</p>
                <h3 className='text-black'>Author: {q.author}</h3>
                <h2 className='text-black'>Quote: {q.quote}</h2>
                <div>
                  <form action={deleteForm}>

                    <button className='float-right' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg></button>
                    <input type="hidden" name='id' value={q.id} />
                  </form>
                  <Link href={"/quotes/" + q.id} className='text-pink-600 hover:underline'>Update</Link>
                  {/*<UpdateForm id={q.id} />*/}
                </div></div></div>
          ))}
        </div>
      </div>
    </div>
  );
}