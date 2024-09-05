import { Outlet } from "react-router-dom";
// import DashHeader from "./dashHeader";
// import DashFooter from "./dashFooter";

const DashLayout = ({ children }) => {
    return (
        <>
            {/* <DashHeader /> */}
            <div className="dash-container">
                <Outlet />
            </div>
            {/* <DashFooter /> */}
        </>
    );
};

export default DashLayout;