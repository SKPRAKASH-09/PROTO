import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Fixed imports
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'; // Fixed import

const SignUP = () => {
  const navigate = useNavigate(); // Fixed useNavigate
  const backendLink = useSelector((state) => state.prod.link); // Fixed useSelector
  const [Inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle input changes
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value }); // Update state dynamically
  };

  // Handle form submission
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Send data to the backend
      const res = await axios.post(`${backendLink}/api/v1/sign-up`, Inputs, {
        withCredentials: true, // Include credentials (e.g., cookies)
      });

      // Show success message
      toast.success(res.data.message);

      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data.message || 'Something went wrong');
      } else if (error.request) {
        // Request was made but no response received
        console.log(error)
        toast.error('No response from the server. Please try again later.');
      } else {
        // Something else happened
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      // Reset form inputs
      setInputs({
        username: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[80%] p-4 shadow-2xl">
        <div>
          <h1>Welcome!</h1>
          <span>SignUp As a New User</span>
        </div>
      </div>
      <form onSubmit={SubmitHandler} className="flex flex-col w-[80%]">
        {/* Username Input */}
        <div className="flex flex-col w-[100%] mb-4">
          <label>Username</label>
          <input
            type="text"
            value={Inputs.username}
            name="username"
            className="mt-2 outline-none border px-3 py-2 border-zinc-400"
            required
            onChange={change} // Handle input change
          />
        </div>
        {/* Email Input */}
        <div className="flex flex-col w-[100%] mb-4">
          <label>Email</label>
          <input
            type="email"
            value={Inputs.email}
            name="email"
            className="mt-2 outline-none border px-3 py-2 border-zinc-400"
            required
            onChange={change} // Handle input change
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
            onChange={change} // Handle input change
          />
        </div>
        {/* Submit Button */}
        <div className="flex mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-900 transition-all duration-300 text-white px-4 py-2 rounded"
          >
            SignUp
          </button>
        </div>
      </form>
      {/* Link to Login Page */}
      <h4 className="mt-8">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </h4>
    </div>
  );
};

export default SignUP;