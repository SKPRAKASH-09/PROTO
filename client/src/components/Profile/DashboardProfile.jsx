import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch , useSelector } from 'react-redux'
import {FaUser} from "react-icons/fa";
import { toast } from 'react-toastify';

const DashboardProfile = () => {
  const [ChangeAvatar, setChangeAvatar] = React.useState(null);
  const changeImage = (e) => {
    setChangeAvatar(e.target.files[0]);
  };
  const backendLink = useSelector((state) => state.prod.link);
  const [UserData, setUserData] =useState(second)
  useEffect(() => {
      const fetch = async() => {
        const res = await axios.get(`${backendLink}/api/v1/getProfileData`, {
          withCredentials:true
        });
        setUserData(res.data.data)
      }
      fetch();
  },[])
//console.log(UserData)

  const [Passwords, setPasswords]=useState({password:"",newPass:"",confirmNewPass:""})
  const changePass = (e) => {
    const {name, value} = e.target
    setPasswords({...Passwords, [name]: value})
  }

  const handlePass = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${backendLink}/api/v1/changeUserPassword`, Passwords, {withCredentials:true});
      toast.success(res.data.message);
      setPasswords({password:"",newPass:"",confirmNewPass:""})
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const updateAvatar = async() => {
    try {
      const formData = new FormData();
      formData.append("image", ChangeAvatar);
      const res = await axios.patch(`${backendLink}/api/v1/changeAvatar`,formData ,  {withCredentials:true});
      toast.success(res.data.message);
      setChangeAvatar(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>{UserData && <div className="flex flex-col">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div >
          {" "}
          <div className="size-[20vh] border rounded-full">
            <label className="w-[100%] h-[100]% flex items-center justify-center" htmlFor="imgFile">
              {UserData && UserData.avatar ? (<img src={ChangeAvatar ? URL.createObjectURL(ChangeAvatar) : `${UserData.avatar}` } alt="" className="size-[100%] rounded-full object-cover" />) : (<FaUser className="size-[12vh] text-zinc-600"/>)}
            </label>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <input type="file" accept=".jprg,.jpg,.png" />
          <button className="bg-indigo-500 text-white text-center rounded" onClick= {updateAvatar}>change avatar</button>
          </div>
        </div>
        <div>
          <p className="text-zinc-700">{UserData}</p>
          <h1 className="text-2xl md:text-3xl lg:text-5xl mt-2 font-semibold">
            {UserData.username}
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div>
        <h1 className="text-2xl font-semibold">Change Account's Password</h1>
        <form action="" className="my-4" onSubmit={handlePass}>
          <div className="flex flex-col">
            <label htmlFor="">Current Password</label>
            <input type="password" placeholder="Current Password" value={Passwords.password} name="Password" className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400" required onChange={changePass} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">New Password</label>
            <input type="password" placeholder="New Password" value={Passwords.newPass} name="NewPass" className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400" required onChange={changePass}/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Confirm New Password</label>
            <input type="password" placeholder="Confirm New Password" name="ConfirmNewPass" className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400" required value={Passwords.confirmNewPass} onChange={changePass} />
          </div>
          <div className = " mt-8">
            {" "}
            <button className="bg-blue-700 hover:bg-blue-600 transition-all duration-300 text-white text-center rounded px-4 py-2">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>}</>
    
  )
}

export default DashboardProfile;
