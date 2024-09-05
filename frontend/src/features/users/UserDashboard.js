import { Outlet } from 'react-router-dom';
import Navbar3 from '../../components/Navbar/Navbar3';
const UserDashboard = () => {
  return (
    <>
      <Navbar3 />
      <div style={{marginBottom:"20px"}}>
        {/* <h2 style={{textAlign:"center",color:"blueviolet"}}>User Dashboard</h2> */}
        <Outlet />
      </div>
    </>
  );
};

export default UserDashboard;
