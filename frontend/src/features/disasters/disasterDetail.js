import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { OPENCAGE_API_KEY } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import Navbar2 from '../../components/Navbar/Navbar2';


const DisasterDetail = () => {
    const { id } = useParams();
    const [disaster, setDisaster] = useState(null);
    const [resources, setResources] = useState([]);
    const [reports, setReports] = useState([]);
    
    
    useEffect(() => {
        const fetchDisaster = async () => {
            try {
                // Fetch disaster data
                const response = await axios.get(`http://localhost:5000/disasters/${id}`,{
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                  });
                setDisaster(response.data);
    
                // Check if location coordinates are available
                if (response.data.location && response.data.location.coordinates) {
                    const latitude = response.data.location.coordinates[0];
                    const longitude = response.data.location.coordinates[1];
    
                    // Make API request to OpenCage Data to get the address
                    const openCageResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`);
    
                    // Extract the formatted address from the response
                    const formattedAddress = openCageResponse.data.results[0].formatted;
    
                    // Update your state with the formatted address
                    setDisaster(prevDisaster => ({
                        ...prevDisaster,
                        formattedAddress: formattedAddress
                    }));
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        const fetchResources = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/disasters/${id}/resources`,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }

                });
                setResources(response.data);
            } catch (error) {
                console.error("Error fetching resources: ", error);
            }
        };

        const fetchReports = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/disasters/${id}/reports`,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports: ", error);
            }
        };
    
        fetchDisaster();
        fetchResources();
        fetchReports();
    }, [id]);

    const navigate = useNavigate();

    const handleResourceAllocation = () => {
        navigate(`/dash/disasters/${id}/resources`);
    };

    const handleMakeReport = () => {
        navigate(`/dash/disasters/${id}/report`);
    };


    const handleDownloadReport = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found, please log in.");
                return;
            }
    
            console.log("Token being sent:", token);
    
            const response = await axios.get(`http://localhost:5000/disasters/${id}/download`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'disaster_report.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading report: ", error);
        }
    };
    

    return (
        <>
            <Navbar2 />
            {disaster ? (
                <>
                    <h1 className="text-blue-700 text-center mt-4 mb-6 text-3xl font-bold">{disaster.disasterType}</h1>
                    <div className="flex flex-col md:flex-row p-4 space-y-6 md:space-y-0 md:space-x-6">
                        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-blue-800 text-center text-xl mb-4">Image</h2>
                            {disaster.image ? (
                                <img src={require(`../../uploads/${disaster.image}`)} alt="Disaster" className="w-full h-auto rounded-lg shadow-md" />
                            ) : (
                                <p className="text-center text-gray-500">N/A</p>
                            )}
                        </div>
                        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md mt-6 md:mt-0">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Severity</h2>
                                <p className="text-gray-700">{disaster.severity}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Description</h2>
                                <p className="text-gray-700">{disaster.description}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Location</h2>
                                <p className="text-gray-700">{disaster.formattedAddress || 'N/A'}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                                <button 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onClick={() => handleResourceAllocation()}
                                >
                                    Allocate Resources
                                </button>
                                <button 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onClick={() => handleMakeReport()}
                                >
                                    Make a Report
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 mt-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-center text-xl font-semibold mb-6 text-blue-700">Resources Allocated</h2>
                            {resources.length > 0 ? (
                                resources.map(resource => (
                                    <div key={resource._id} className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-300">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-blue-800">Vehicle</h3>
                                            <p className="text-gray-800">{resource.vehicle}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-blue-800">Personnel</h3>
                                            <p className="text-gray-800">{resource.personnel}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-blue-800">Equipment</h3>
                                            <p className="text-gray-800">{resource.equipment}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-blue-800">Supplies</h3>
                                            <p className="text-gray-800">{resource.supplies}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-blue-800">Facilities</h3>
                                            <p className="text-gray-800">{resource.facilities}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No resources allocated.</p>
                            )}
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-center text-xl font-semibold mb-6 text-blue-700">Reports</h2>
                            {reports.length > 0 ? (
                                reports.map(report => (
                                    <div key={report._id} className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-300">
                                        <h3 className="text-lg font-semibold text-blue-800">{report.title}</h3>
                                        <p className="text-gray-800">{report.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No reports available.</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button 
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => handleDownloadReport()}
                        >
                            Download Report
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </>
    );
    
    
};

export default DisasterDetail;
