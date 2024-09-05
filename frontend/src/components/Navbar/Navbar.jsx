import './Navbar.css'
import logo from '../../assets/srtlogo.png'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const navigate = useNavigate();
  
  return (
    <div className='navbar'>
      <Link to = '/'><img src={logo} alt="" className='logo'/> </Link>
      <div className='logo-text'>SRT <span>Emergency Response</span></div> 
      <ul>
        {/* <li><Link to = '/' className='link' >Home</Link></li> */}
        <li>
          <button onClick={() => navigate(`/`)} className='takeActionBtn'>Home</button>
        </li>
        {/* <li><Link to = '/login' className='link'>Login</Link></li> */}
        <li>
          <button onClick={() => navigate('/login')} className='takeActionBtn'>Login</button>
        </li>
        {/* <li><Link to = '/about' className='link'>About</Link></li> */}
        <li>
          <button onClick={() => navigate('/about')} className='takeActionBtn'>About</button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;