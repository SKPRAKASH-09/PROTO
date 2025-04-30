import React from 'react'
import { useSelector } from  "react-redux"
import { Navigate } from "react-router-dom"

const AdminProtectedRoute = ({children}) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    if(!isLoggedIn){
        return <Navigate to="/login" />
    }
  return children;
}

export default AdminProtectedRoute