import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
const data = [
    {
      img:"./sampleimg.jpg",
      title:"sampletitle",
      desc: "samplediscription",
    },
    {
      img:"./sampleimg.jpg",
      title:"sampletitle",
      desc: "samplediscription",
    },
    {
      img:"./sampleimg.jpg",
      title:"sampletitle",
      desc: "samplediscription",
    },
  ]

const Liked = () => {
  return (
    <div>
        <div classname="mb-4 py-4">
        <h1 classname="text-xl font-semibold mb-4">Liked</h1>
        <div classname = "flex flex-col gap-8 lg:gap-4">
            {data&&
              data.map((items,i)=>(
                <div key={i} classname="flex flex-col lg:flex-row gap-2 lg:gap-4">
                  <NewsCard items={items} />
                </div>
                ))}
        </div>
    </div>
    </div>
  )
}

export default Liked