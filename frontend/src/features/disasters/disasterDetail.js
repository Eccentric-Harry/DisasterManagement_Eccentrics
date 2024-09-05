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
                <h1 style={{color:"rgb(27, 40, 223)",textAlign:"center",marginTop:'5px'}}>{disaster.disasterType}</h1>
                <div className="disasterDetailMainDiv">
                    <div className="disasterImageDiv">
                        <h2 style={{color:"#1B4552",textAlign:"center",marginTop:'0px',padding:"10px"}}>Image</h2>
                        {disaster.image ? (
                            <img src={require(`../../uploads/${disaster.image}`)} alt="Disaster" className="disasterImage" />
                        ) : (
                            'N/A'
                        )}
                    </div>
                    <div className="disasterInfoDiv" style={{marginTop:"50px"}}>
                        <div>
                            <h2>Severity</h2>
                            <p>{disaster.severity}</p>
                        </div>
                        <div>
                            <h2>Description</h2>
                            <p>{disaster.description}</p>
                        </div>
                        <div>
                            <h2>Location</h2>
                            {disaster.formattedAddress ? (
                                <p>{disaster.formattedAddress}</p>
                            ) : (
                                'N/A'
                            )}
                        </div>
                        <div className="disasterDetailMainDiv" style={{display:"block"}}>
                        <button className="takeActionBtn" style={{height:"50px",width:"200px",marginTop:"10px",marginRight:"10px"}}
                            onClick={() => handleResourceAllocation()}
                        >
                            Allocate Resources
                        </button>

                        <button className="takeActionBtn" style={{height:"50px",width:"200px",marginTop:"10px",marginLeft:"10px"}}
                            onClick={() => handleMakeReport()}
                        >
                            Make a Report
                        </button>

                    </div>
                    
                    </div>
                    
                    {/* Reources and Reports Div */}

                    

                </div> 
                <div className="disasterDetailMainDiv" style={{marginTop:"50px"}}> 
                <div className="disasterInfoDiv">
                    <h2 style={{textAlign:"center"}}>Resources Allocated</h2>
                    {resources.length > 0 ? (
                        resources.map(resource => (
                            <div key={resource._id}>
                                <div>
                                    <h2>Vehicle</h2>
                                    <p>{resource.vehicle}</p>
                                </div>
                                <div>
                                    <h2>Personnel</h2>
                                    <p>{resource.personnel}</p>
                                </div>
                                <div>
                                    <h2>Equipment</h2>
                                    <p>{resource.equipment}</p>
                                </div>
                                <div>
                                    <h2>Supplies</h2>
                                    <p>{resource.supplies}</p>
                                </div>
                                <div>
                                    <h2>Facilities</h2>
                                    <p>{resource.facilities}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No resources allocated.</p>
                    )}
                </div>
                <div className="disasterInfoDiv">
                    <h2 style={{textAlign:"center"}}>Reports</h2>
                    {reports.length > 0 ? (
                        reports.map(report => (
                            <div key={report._id}>
                                <h3>{report.title}</h3>
                                <p>{report.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reports available.</p>
                    )}
                </div>
                
                </div>
                
                <button className="takeActionBtn" style={{height:"50px",width:"200px",marginLeft:"40%",marginTop:"0px"}}
                    onClick={() => handleDownloadReport()}
                    >
                    Download Report
                </button>

                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default DisasterDetail;
