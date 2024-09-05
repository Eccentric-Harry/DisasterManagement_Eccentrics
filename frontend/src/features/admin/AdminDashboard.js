import { Outlet } from 'react-router-dom';
import Navbar2 from '../../components/Navbar/Navbar2';

const AdminDashboard = () => {
  return (
    <>
    <Navbar2 />
    <div>
      {/* <h2 style={{color: "rgb(27, 40, 223",textAlign:"center"}}>Admin Dashboard</h2> */}
      <Outlet />
    </div>
    </>
  );
};

export default AdminDashboard;
