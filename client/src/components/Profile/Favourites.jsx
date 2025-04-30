import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import NewsCard from '../NewsCard/NewsCard'
import axios from 'axios'


const Favourites = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [data, setData] = useState()
    useEffect(() => {
      const fetch = async() => {
        const res = await axios.get(`${backendLink}/api/v1/getFavouriteBlogsOfAUser`, {
          withCredentials:true
        });
        setData(res.data.favouriteBlogs);
      }
      fetch();
    },[])

  return (
    <div>
      
      <h1 className="text-xl font-semibold mb-4">Favourites</h1>
      <div className="flex flex-col gap-8 lg:gap-4">
        {data && data.map((items, i) => (
          <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <NewsCard items ={items} />
          </div>
        ))}

      </div>
    </div>
  )
}

export default Favourites