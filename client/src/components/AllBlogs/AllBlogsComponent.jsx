import React from 'react'
import NewsCard from '../NewsCard/NewsCard'

const AllBlogsComponent = ({data}) => {
  return (
    <div className="flex flex-col gap-8 lg:gap-12">
        {data && data.map((items,i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                <NewsCard items ={items} />
            </div>
        ) )}
    </div>
  )
}

export default AllBlogsComponent