import React from 'react'
import Sidebar from '../../components/Admin Components/Sidebar/Sidebar'

const AdminDashboard = () => {
  return (
    <div className="flex ">
      <div className="w-1/6"></div>
      <div className="w-1/6 fixed h-screen border-r">
        <Sidebar />
      </div>
      <div className="w-5/6 bg-zinc-200">
      
        <outlet />
      </div>
      <Sidebar />
      <outlet />
    </div>
  )
}

export default AdminDashboard