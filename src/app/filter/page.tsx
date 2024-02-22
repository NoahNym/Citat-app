import React from 'react'
import { getData } from '@/utils/handleDatabase'
import FilterComponent from '@/components/FilterComponent'

export default async function filter() {
    const data = await getData()
    const sortedData = data.sort((a, b) => a.id - b.id)
    //console.log(sortedData)
    const filteredData = data.filter((e) => e.quote == "a")
    console.log(filteredData)
    return (
        <div>
            <FilterComponent data={data} />
        </div>
    )
}
