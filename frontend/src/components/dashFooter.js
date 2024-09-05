// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse } from '@fortawesome/free-solid-svg-icons';
// import { useLocation, useNavigate } from 'react-router-dom';


// const DashFooter = () => {
//     const navigate = useNavigate();
//     const { pathname } = useLocation;

//     const onGoHomeClicked = () => {
//         navigate('/dash');
//     };

//     let goHomeButton = null;

//     if(pathname !== '/dash') {
//         goHomeButton = (
//             <button className="dash-footer__home" onClick={onGoHomeClicked}>
//                 <FontAwesomeIcon icon={faHouse} title='Home' />
//             </button>
//         );
//     };

//     const content = (
//         <footer className="dash-footer">
//             {goHomeButton}
//             <div className="dash-footer__container">
//                 <p style={{color:'teal'}}>Current User:</p>
//                 <p style={{color:'teal'}}>Status:</p>
//                 <p style={{color:'teal'}}>&copy; 2024</p>
//             </div>
//         </footer>
//     );
//   return content;
// };

// export default DashFooter;