import './Navbar.css'
import logo from '../../assets/srtlogo.png'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar3 = () => {
    const navigate = useNavigate();
    // const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

  return (
    <div className='navbar'>
      <Link to = '/'><img src={logo} alt="" className='logo'/> </Link>
      <div className='logo-text'>SRT <span>Emergency Response</span></div> 
      <ul>
        <li>
            <button onClick={() => navigate('/dash/user')} className='takeActionBtn'>Report Disaster</button>
        </li>
        <li>
            <button onClick={() => navigate(`/dash/user/disasters`)} className='takeActionBtn'>My Disasters</button>
        </li>
        <li>
            <button onClick={handleLogout} className='takeActionBtn'>Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar3;