import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/page";
import MainLayout from "./layout/MainLayout";
import OtherLayout from "./layout/OtherLayout";
import Login from "./pages/login/page";
import SignUP from "./pages/SignUP/page.jsx";
import AllBlogs from './pages/ALL blogs/pages';
import Profile from "./pages/Profile/page";
import DashboardProfile from './components/Profile/DashboardProfile';
import Favourites from './components/Profile/Favourites';
import Liked from './components/Profile/Liked';
import Description from './pages/Description /Description.jsx';
import Categories from './pages/Categories/Categories';
import AdminDashboard from './pages/AdminDashboard/page';
import Dashboard from './components/Admin Components/Dashboard/Dashboard';
import AddBlogs from './components/Admin Components/AddBlogs/AddBlogs';
import EditBlogs from './components/Admin Components/EditBlogs/EditBlogs';
import UpdateBlog from './components/Admin Components/EditBlogs/Compo/UpdateBlog';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { authActions  } from './store/authReducer'; 
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
import AdminProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';

const App = () => {
  const backendLink = useSelector((state) => state.prod.Link);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async() => {
      const res = await axios.get(`${backendLink}/api/v1/check-cookie`, {
        withCredentials:true
      });
      if(res.data.message === true) {
        dispatch(authActions.login());
      }
    }
    fetch();
  },[])
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/cat/:id" element={<Categories />} />
          <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
            <Route index element={<DashboardProfile />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="liked" element={<Liked />} />
          </Route>
        </Route>
        <Route element={<OtherLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/SignUP" element={<SignUP />} />
          <Route path="/admin-login" element={<SignUP />} />
          <Route path="/admin-dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="add-blogs" element={<AddBlogs />} />
            <Route path="edit-blogs" element={<EditBlogs />} />
            <Route path="update-blogs/:id" element={<UpdateBlog />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
