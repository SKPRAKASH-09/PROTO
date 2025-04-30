import React,{useState} from 'react'
import {axios} from 'axios';
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom'
import { authActions } from '../../store/authReducer';
import { useSelector, useDispatch} from "react-redux"

const Adminlogin = () => {
  const dispatch = useDispatch()
  const backendLink= useSelector((state) => state.prod.link)
  const history = useNavigate()
    const [Inputs, setInputs] = useState({
        email:"",
        password:""
      });
    
      const change =(e) => {
        const {name,value} =e.target;
        setInputs({...inputs,[name]:value})
      }
      const handleAdminLogin =async (e) => {
        e.preventDefault ()
        try {
          const res = await axios.post(`${backendLink}/api/v1/adminLogin` ,Inputs, {withCredentials:true})
          dispatchEvent(authActions.login())
          toast.sucess(res.data.message)

          history("/admin-dashboard")
          console.log(res.data.message);
        } catch (error) {
          toast.error(error.respone.data.error)
        }
      };

    return (
        <div className="h-screen flex items-center justify-center" >
          <div className="w-[80%] p-4 shadow-2xl">
            <div><h1>Admin login </h1><span>Please Login</span></div>
          </div>
          <form action="" className="flex flex-col w-[100%]" onSubmit= {handleAdminLogin}>
            <div className="flex flex-col mb-4"><label>email</label><input type="email" value={inputs.email} name="email" className="mt-2 outline-none border px-3 py-12 border-zinc-400" required onchange={change}/></div>
            <div className="flex flex-col mb-4"><label>password</label><input type="password" value={inputs.password} name="password" className="mt-2 outline-none border px-3 py-12 border-zinc-400" required onchange={change}/></div>
            <div className="flex mt-4"><button className="bg-blue-600 hover:bg-blue-900 transition-all duration-300 text-white px-4 py-2 rounded" >Login</button></div>
          </form>
    
        </div>
      
      )
}

export default Adminlogin