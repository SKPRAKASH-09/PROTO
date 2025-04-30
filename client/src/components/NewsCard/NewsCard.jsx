import React from 'react'

const NewsCard = ({ items }) => {
  
  return (
    <>
        <div className="w-full lg:w-4/6"><img src={items.image} alt="/" className="rounded object-cover w-full h-[300px]" /></div>
        <div className="w-full lg:w-4/6">
            <h1 className={`text-2xl font-semibold ${!windows.location.href.includes("/profile") && "mb-4"}`}>items.title</h1>
            {!windows.location.href.includes("/profile") && <p className="mb-4">{items.desc.splice(0, 150)}....</p>}
            <link to={`/description/${items._id}`} className="bg-blue-950 px-4 py-2 rounded text-white hover:bg-blue-500 transition-all duration-300">Read</link>
        </div>
    </>
  )
}

export default NewsCard