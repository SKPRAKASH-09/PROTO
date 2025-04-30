import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddBlogs = () => {
    const backendLink = useSelector((state) => state.prod.Link)
    const [Title, setTitle] = React.useState('')
    const [Description, setDescription] = React.useState('')
    const [Image, setImage] = React.useState(null)
    const [Loading, setLoading] = useState(false)
    const[NewCategory, setNewCategory] = useState("")
    const [Actualcategories, setActualCategories] = useState()
    const [CategoryId , setCategoryId] = useState("")
    console.log(CategoryId)

    const handleAddBlog = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const form = new FormData();
            form.append('title', Title);
            form.append('description', Description);
            form.append('category', CategoryId);
            form.append('image', Image);
            const res = await axios.post(`${backendLink}/api/v1/addBlog`, form, {withCredentials:true})
            toast.success(res.data.message);
            setTitle('')
            setDescription('')
        } catch (error) {
            toast.error(error.response.data.error);
        }
        finally {
            setTitle('')
            setDescription('')
            setLoading(false)
            setCategoryId("")
        }
    }
    const addCategoryHandle = async (e) => {
        e.preventDefault();
        const title = NewCategory;
        const res = await axios.post(`${backendLink}/api/v1/addCategory`, title, {withCredentials:true})
        toast.success(res.data.message);
        setNewCategory('');
    }
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${backendLink}/api/v1/getCategory` ,{title: NewCategory}, {withCredentials:true})
            setActualCategories(res.data.categories);
        }
        fetch()
    }, [backendLink])
    
  return (
    <div className="m-4 h-screen">
        <div className="p-4 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold">Add Blogs</h1>
        <form action="" className="my-4 flex flex-col gap-4" onSubmit={(e)=>{handleAddBlog}}>
            <input 
              type="text" 
              placeholder="Title" 
              className="outline-none p-4 bg-transparent text-3xl border-b border-zinc-700 font-semibold w-full" value={Title} onChange={(e)=setTitle(e.target.value)} />
            <textarea
                type="text" 
                placeholder="Description" 
                className="outline-none p-4 bg-transparent text-xl border-b border-zinc-700 w-full " value={Description} onChange={(e)=setDescription(e.target.value)} />
            <div className="flex items-center justify-between">
                <input type="file" className="bg-zinc-900 rounded text-white" accept=".jpg,.jpeg,.png" onChange={(e)=setImage(e.target.files[0])} />
                <select name="title" id="" className="px-4 py-2 rounded shadow" onChange={(e) => setCategoryId(e.target.value)} >
                    {Actualcategories && Actualcategories.map((items,i) => ( 
                        <option value={items.title} key={i} >{items.title}</option>
                    ) )}
                </select>
            </div>
            {Loading ? <div className="bg-blue-400 w-fit text-white rounded px-4 py-2 shadow-xl transition-all duration-300 ">
                Adding Blog...
            </div> : <button className="bg-blue-600 text-white rounded px-4 py-2 shadow-xl hover:bg-blue-700 transition-all duration-300 ">
                AddBlog
            </button> }

            
        </form>
        </div>
        <div className="p-4 bg-white rounded shadow mt-8">
            <h1 className="text-2xl font-semibold">Add New Category</h1>
            <form action ="" className="mt-4" onSubmit={addCategoryHandle}>
                <input type ="text" placeholder= " Your new category" className="bg-none border outline-none px-4 py-2 rounded bg-gray-50" required value={NewCategory} onChange= {(e) => setNewCategory(e.target.value)}/>
                <button className="ms-4 bg-blue-600 px-4 py-2 rounded text-white">Add Category</button>
            </form>
        </div>

    </div>
  )
}

export default AddBlogs