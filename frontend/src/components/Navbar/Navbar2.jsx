import './Navbar.css'
import logo from '../../assets/srtlogo.png'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar2 = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

  return (
    <div className='navbar'>
      <Link to = '/'><img src={logo} alt="" className='logo'/> </Link>
      <div className='logo-text'>SRT <span>Emergency Response</span></div> 
      <ul>
        {/* <li><Link to = '/' className='link' >Home</Link></li> */}
        {/* <li><Link to = '/login' className='link'>Login</Link></li> */}
        <li style={{paddingLeft:"500px"}}>
            <button onClick={handleLogout} className='takeActionBtn'>Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar2;