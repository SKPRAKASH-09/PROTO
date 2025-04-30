import React , {useEffect, useState}from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from "axios";

const EditBlogs = () => {
  const backendLink = useSelector((state) => state.prod.link);
    const [data, setData] = useState()
      useEffect(() => {
        const fetch = async() => {
          const res = await axios.get(`${backendLink}/api/v1/fetchAllBlogs`, {
            withCredentials:true
          });
          setData(res.data.blogs);
        }
        fetch();
      },[data])
      const deleteBlogHandler =async () => {
        try {
          const res = await axios.put(`${backendLink}/api/v1/deleteBlog/${id}`,{}, {
            withCredentials:true
          });
          toast.success(res.data.message);
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className="p-4 ">
        <h1 className="text-2xl font-semibold">Edit Blogs</h1>
        <div className="grid grid-cols-3 gap-8 lg:gap-4 my-4 " >
            {data && data.map((items,i) => (
                 <div className=" bg-white rounded-xl p-4 flex flex-col items-center justify-center">
                  <div className="w-full lg:w-4/6"><img src={items.image} alt="/" className="rounded object-cover" /></div>
                  <div className="mt-4">
                    <h1 className="text-2xl font-semibold">items.title</h1>
                    <p className="mb-4">{items.desc.splice(0, 300)}....</p>
                  </div>
                  <div>
                    <Link to={`/admin-dashboard/update-blogs/${items._id}`}className="bg-blue-900 w-[100%] text-white text-center rounded px-4 py-2">Edit</Link>
                    <button className="bg-red-600 w-[100%] text-white rounded px-4 py-2" onClick = {deleteBlogHandler}>Delete</button>
                  </div>
        
                  
                </div>
           
            ))}
        </div>
    </div>
  );
};

export default EditBlogs