import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import {toast } from 'react-toastify';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const Description = () => {
  const [Data, setData] = useState()
  const [Favorites, setFavorites] = useState(false)
  const {id} = useParams()
  const backendLink = useSelector((state) => state.prod.link);
      useEffect(() => {
        const fetch = async() => {
          const res = await axios.put(`${backendLink}/api/v1/getDescById/${id}`,{}, {
            withCredentials:true
          });
          setFavorites(res.data.favourite)
          setData(res.data.blog);
        }
        fetch();
      },[id])
      const FavouriteHandler =async () => {
        if(!Favorites){
          const res = await axios.put(`${backendLink}/api/v1/addBlogsToFavourite/${id}`, {
            withCredentials:true
          });
          toast.success(res.data.message);
          setFavorites(!Favorites)
        }else{
          const res = await axios.put(`${backendLink}/api/v1/removeBlogsFromFavourite/${id}`, {
            withCredentials:true
          })
        }
        
      }
      

  return (
    <div>

       {Data && (
          <>
            <div className="w-full flex items-center justify-center">
              <h1 className="text-2xl font-bold">{ Data.title}</h1>
              <div className="w-1/6 text-2xl lg:text-3xl flex justify-end ">
                <button onClick={FavouriteHandler}>
                 {Favorites ?  (<FaHeart className="hover:cursor-pointer text-yellow-400 border" />):(<FaRegHeart className="hover:cursor-pointer"/>)}
                </button>
              </div>
            </div>
         
            <img className="mt-4 w-full h-[400px] rounded object-cover" src={`${Data.image}`} alt="news-image" />
            <p className="mt-4">{Data.description}</p>
          </>
        )}
        
    </div>
  )
} 

export default Description