// src/pages/Login.tsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({name:"", email: "", password: "" });
  const navigate = useNavigate();
  const {signUp } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        await signUp(formData);
        navigate('/login')
    } catch (error) {
        console.log(error)
    }
  }

    
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">Create new Account</h2>
          <p className="text-gray-500 mb-6">Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
             <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div className="flex justify-end text-sm">
              <a href="#" className="text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Sign up
            </button>

            <div className="text-center text-gray-500">or continue with</div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 border rounded-md py-2 flex items-center justify-center hover:bg-gray-100"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>
              <button
                type="button"
                className="flex-1 border rounded-md py-2 flex items-center justify-center hover:bg-gray-100"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                  alt="Facebook"
                  className="w-5 h-5 mr-2"
                />
                Facebook
              </button>
            </div>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 hover:underline">
                Login 
              </a>
            </p>
          </form>
        </div>

        {/* Right Image Side */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.pexels.com/photos/3768913/pexels-photo-3768913.jpeg"
            alt="Fitness login"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
