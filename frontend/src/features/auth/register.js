import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('user');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/auth/register", {
                username,
                email,
                password,
                role,
            });
            res.data && navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Register</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                <strong>Username</strong>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Username"
                                autoComplete="off"
                                name="username"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="Enter Password"
                                name="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    id="adminRadio"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    checked={role === "admin"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <label htmlFor="adminRadio" className="ml-2 block text-sm font-medium text-gray-700">
                                    Admin
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    id="userRadio"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    checked={role === "user"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <label htmlFor="userRadio" className="ml-2 block text-sm font-medium text-gray-700">
                                    User
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">Already have an account?</p>
                    <div className="text-center mt-2">
                        <Link to="/login" className="text-blue-600 hover:text-blue-800">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
