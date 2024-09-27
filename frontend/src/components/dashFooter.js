import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const DashFooter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const onGoHomeClicked = () => {
        navigate('/dash');
    };

    let goHomeButton = null;

    if (pathname !== '/dash') {
        goHomeButton = (
            <button className="text-white hover:text-red-400 transition duration-300" onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={faHouse} title='Home' />
            </button>
        );
    }

    const content = (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                <div className="flex items-center">
                    {goHomeButton}
                    <h1 className="text-2xl font-bold ml-4">Sanrakshak</h1>
                </div>
                <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
                    <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
                    <p className="flex items-center mb-1"><FontAwesomeIcon icon={faPhone} className="mr-2" /> +91 9305107868</p>
                    <p className="flex items-center mb-1"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> support@sanrakshak.com</p>
                    <p className="flex items-center mb-1"><FontAwesomeIcon icon={faGlobe} className="mr-2" /> www.sanrakshak.org</p>
                </div>
                <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/boldaidofficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition duration-300">Facebook</a>
                        <a href="https://twitter.com/boldaidofficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition duration-300">Twitter</a>
                        <a href="https://www.instagram.com/boldaidofficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition duration-300">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-6 pt-4 text-center">
                <p className="text-sm text-gray-400">&copy; 2024 Sanrakshak. All Rights Reserved.</p>
                <p className="text-sm text-gray-400">Current User: [User Name] | Status: [User Status]</p>
            </div>
        </footer>
    );

    return content;
};

export default DashFooter;
