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
        <Navbar/>
        <div className="mainLogin">
            <div className="loginMajor">
                <h2 style={{color:"#1B4552",textAlign:"center",marginTop:'5px'}}>Register</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Username"
                            autoComplete="off"
                            name="username"
                            className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="Enter Password"
                            name="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="admin-user">
                        <label htmlFor="adminRadio" className="form-label">
                            Admin
                        </label>
                        <input
                            type="radio"
                            name="adminRadio"
                            value="admin"
                            className="form-control"
                            checked={role === "admin"}
                            onChange={(e) => setRole(e.target.value)}
                            />
                        <label htmlFor="userRadio" className="form-label">
                            User
                        </label>
                        <input
                            type="radio"
                            name="userRadio"
                            value="user"
                            className="form-control"
                            checked={role === "user"}
                            onChange={(e) => setRole(e.target.value)}/>
                            
                    </div>
                    <button type="submit" className="login-button">
                        Register
                    </button>
                </form>

                 <p style={{color:"#1B4552",textAlign:"center",margin:"10px"}}>Already have an account?</p>
                 <div style={{textAlign:"center",margin:"10px"}}>
                    <Link to="/login" style={{color:"#1B4552"}}>
                        Login    
                    </Link>
                 </div>
            </div>
        </div>
        </>
    );
}

export default Register;