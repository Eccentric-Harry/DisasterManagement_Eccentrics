import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Public from './components/Public';
import Login from './features/auth/login';
import Register from './features/auth/register';
import DashLayout from './components/dashLayout';
import AdminDashboard from './features/admin/AdminDashboard';
import UserDashboard from './features/users/UserDashboard';
import DisasterReporting from './features/disasters/disastereporting';
import DisasterList from './features/disasters/disasterList';
import DisasterDetail from './features/disasters/disasterDetail';
import UserDisasters from './features/users/UserDisasters';
import UserDisasterDetail from './features/disasters/userDisasterDetail';
import ResourceForm from './features/disasters/disasterResource';
import ReportForm from './features/disasters/disasterReportForm';
import ActiveIncidents from './features/disasters/activeIncidents'; // Import the new component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="dash" element={<DashLayout />}>
          <Route path="admin" element={<AdminDashboard />}>
            <Route index element={<DisasterList />} />
          </Route>

          <Route path="disasters">
            <Route path=":id" element={<DisasterDetail />} />
            <Route path=":id/resources" element={<ResourceForm />} />
            <Route path=":id/report" element={<ReportForm />} />
          </Route>

          <Route path="user" element={<UserDashboard />}>
            <Route index element={<DisasterReporting />} />
            <Route path="disasters" element={<UserDisasters />} />
            <Route path="disasters/:id" element={<UserDisasterDetail />} />
          </Route>
        </Route>

        {/* New Route for Active Incidents */}
        <Route path="/activeIncidents" element={<ActiveIncidents />} />
      </Route>
    </Routes>
  );
}

export default App;
