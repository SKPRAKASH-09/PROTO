import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import {toast } from 'react-toastify';

const UpdateBlog = () => {
    const [Data, setData] = useState({title:"",description:""})
    const {id} = useParams()
    const backendLink = useSelector((state) => state.prod.link);
      useEffect(() => {
            const fetch = async() => {
              const res = await axios.put(`${backendLink}/api/v1/getDescById/${id}`,{}, {
                withCredentials:true
              });
              setData(res.data.blog);
            };
            fetch();
          },[id])
          const changeHandler = (e) => {
            const {name, value} = e.target
            setData({...Data, [name]: value});
          }
          const updateHandler = async (e) => {
            e.preventDefault()
            try {
                const res = await axios.put(
                    `${backendLink}/api/v1/editBlog/${id}`,
                    Data,
                    {
                        withCredentials:true
                    }
                )
                toast.success(res.data.message);
            } catch (error) {
                console.log(error)
            }
          }
  return (
    <div className="p-4 h-screen">
        <h1 className="text-2xl font-semibold">Update Blogs</h1>
        {Data && (
            <form action="" className="my-4 flex flex-col gap-4">
              <input type="text" 
              placeholder="Title" 
              className="border-none outline-none p-4 bg-transparent text-3xl border-b border-zinc-700 font-semibold w-full" 
              name="title"
              value={Data.title}
              onChange={changeHandler}
              />
              <textarea
                  type="text" 
                  placeholder="Description" 
                  className="border-none outline-none p-4 bg-transparent text-xl border-b border-zinc-700 w-full " 
                  name="description"
                  value={Data.description}
                  onChange={changeHandler}
                  />
              <div>
                  <input type="file" className="bg-zinc-900 rounded text-white" accept=".jpg,.jpeg,.png" />
              </div>
              <button className="bg-blue-600 text-white rounded px-4 py-2 shadow-xl hover:bg-blue-700 transition-all duration-300 " onClick={updateHandler}>
                  Update Blog
              </button>
           </form>
        )}
        

    </div>
  )
}

export default UpdateBlog