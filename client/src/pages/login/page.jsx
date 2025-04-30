import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Fixed import for useNavigate
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'; // Fixed imports for useSelector and useDispatch
import { authActions } from '../../store/authReducer';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate(); // Fixed useNavigate
  const backendLink = useSelector((state) => state.prod.link); // Fixed useSelector
  const dispatch = useDispatch();

  const [Inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value }); // Fixed state update
  };

  // Handle form submission
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const res = await axios.post(`${backendLink}/api/v1/login`, Inputs, {
        withCredentials: true,
      });

      // Dispatch login action
      dispatch(authActions.login());

      // Show success message
      toast.success(res.data.message);

      // Navigate to the profile page
      navigate('/profile');
    } catch (error) {
      // Handle errors
      if (error.response) {
        toast.error(error.response.data.message || 'Something went wrong');
      } else if (error.request) {
        toast.error('No response from the server. Please try again later.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      // Reset form inputs
      setInputs({
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[80%] p-4 shadow-2xl">
        <div>
          <h1>Welcome Back!</h1>
          <span>Please Login</span>
        </div>
      </div>
      <form onSubmit={SubmitHandler} className="flex flex-col w-[80%]">
        {/* Email Input */}
        <div className="flex flex-col w-[100%] mb-4">
          <label>Email</label>
          <input
            type="email"
            value={Inputs.email}
            name="email"
            className="mt-2 outline-none border px-3 py-2 border-zinc-400"
            required
            onChange={change} // Fixed onChange
          />
        </div>
        {/* Password Input */}
        <div className="flex flex-col w-[100%] mb-4">
          <label>Password</label>
          <input
            type="password"
            value={Inputs.password}
            name="password"
            className="mt-2 outline-none border px-3 py-2 border-zinc-400"
            required
            onChange={change} // Fixed onChange
          />
        </div>
        {/* Submit Button */}
        <div className="flex mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-900 transition-all duration-300 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </form>
      {/* Link to Signup Page */}
      <h4 className="mt-8">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:text-blue-700">
          Sign Up
        </Link>
      </h4>
    </div>
  );
};

export default Login;