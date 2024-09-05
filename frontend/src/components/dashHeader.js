//  import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";


const DashHeader = () => {
    const content = (
        <>
            <Navbar />
            {/* <header className="dash-header">
            <div className="dash-header__container">
                <div className="dash-header__logo">
                    <Link to="/">Disaster Management and Response System</Link>
                </div>
                <nav className="dash-header__nav">
                    <Link to="/public">Public</Link>
                    <Link to="/private">Private</Link>
                </nav>
            </div>
            // </header> */}
        </>
        
    );
    return content;
};

export default DashHeader;