import { Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import firetruck from '../assets/hero2.png';
import ambulance from '../assets/ambulance.png';
import police from '../assets/police.png';


const Public = () => {
    const content = (
        <>
            <Navbar />
            <div style={{marginTop:'20px'}}>
            {/* <div className='public'> */}
                {/* <h1>Disaster Management and Response System</h1>
                <nav className='dash-header__nav'>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                </nav> */}
                <div style={{display: 'flex'}}>
                    <div style={{
                        flex: '50%',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '40px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', /* Add shadow effect */
                        transition: '0.3s', /* Add smooth transition */
                        //backgroundColor: '#EFFFFD', /* Change background color */
                        padding: '20px', /* Add some padding */
                
                        
                    }}>
                        <h2 style={{
                            color:'#183E4B',
                            fontFamily: 'Arial, sans-serif', /* Change font family */
                            textAlign: 'center', /* Center align text */
                            fontSize: '30px',
                        }}>
                            No.1 Disaster Relief Solution
                        </h2>
                        
                        <p style={{
                            color:'#1B4552',
                            fontFamily: 'Monospace', /* Change font family */
                            textAlign: 'left', /* Center align text */
                            // backgroundImage: 'linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% )',
                            // WebkitBackgroundClip: 'text',
                            // background:'transparent',
                            fontSize: '30px',
                            margin: '20px',
                        }}>
                            Our mission is to provide immediate and effective disaster response solutions to safeguard the community
                        </p>

                        <button className='getStartedButton'>
                            <Link to="/login">Get Started</Link>
                        </button>
                    </div>

                    <div style={{flex: '50%', overflow: 'hidden'}}>
                        <div style={{
                            display: 'flex',
                            width: '300%',
                            animation: 'carousel 20s infinite linear'
                        }}>
                            <img src={firetruck} alt='firetruck' style={{width:'33.33%'}}/>
                            <img src={ambulance} alt='ambulance' style={{width:'33.33%'}}/>
                            <img src={police} alt='police car' style={{width:'33.33%'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    return content;
}

export default Public;
