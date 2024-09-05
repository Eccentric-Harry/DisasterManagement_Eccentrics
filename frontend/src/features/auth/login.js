import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false); // New state for login error
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/auth/login", {
                email,
                password,
            });

            if (res.data?.accessToken) {
                localStorage.setItem("token", res.data.accessToken);

                const getUserIdFromToken = (token) => {
                    const payload = token.split('.')[1];
                    const decodedPayload = atob(payload);
                    const userId = JSON.parse(decodedPayload).UserInfo.userId;
                    return userId;
                };

                const userId = getUserIdFromToken(res.data.accessToken);
                localStorage.setItem('userId', userId);
                
                if (res.data) {
                    if (role === 'admin') {
                        navigate("/dash/admin");
                    } else {
                        navigate("/dash/user");
                    }
                }
            }
        } catch (err) {
            console.log(err);
            setLoginError(true); // Show error message
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Login</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="Enter Password"
                                name="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                            <label htmlFor="admin" className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    className="form-radio text-blue-600"
                                    checked={role === "admin"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <span className="ml-2 text-gray-700">Admin</span>
                            </label>
                            <label htmlFor="user" className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    className="form-radio text-blue-600"
                                    checked={role === "user"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <span className="ml-2 text-gray-700">User</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-gray-700 text-center mt-4">Don't have an account?</p>
                    <div className="text-center mt-2">
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </div>

                    {loginError && <p className="text-red-500 text-center mt-4">Incorrect email or password</p>}
                </div>
            </div>
        </>
    );
};

export default Login;
