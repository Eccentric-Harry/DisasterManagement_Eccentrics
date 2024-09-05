import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import { OPENCAGE_API_KEY } from "../../utils/config";

const UserDisasterDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [disaster, setDisaster] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        disasterType: '',
        severity: '',
        description: '',
        locationType: 'Point',
        locationCoordinates: '',
        image: null
    });

    useEffect(() => {
        const fetchDisaster = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/disasters/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setDisaster(response.data);
                setFormData({
                    disasterType: response.data.disasterType,
                    severity: response.data.severity,
                    description: response.data.description,
                    locationType: response.data.location.type,
                    locationCoordinates: JSON.stringify(response.data.location.coordinates),
                    image: response.data.image
                });
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDisaster();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }
    
        // Log form data for debugging
        for (let pair of form.entries()) {
            console.log(pair[0] + ', ' + pair[1]); 
        }
    
        try {
            const response = await axios.put(`http://localhost:5000/disasters/${id}`, form, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            setEditing(false);
            navigate(`../disasters/${id}`);
        } catch (error) 
            {
                // if (error.response) {
                    
                //     console.error('Error response data:', error.response.data);
                //     console.error('Error response status:', error.response.status);
                //     console.error('Error response headers:', error.response.headers);
                // } else if (error.request) {
                    
                //     console.error('Error request:', error.request);
                // } else {
                    
                //     console.error('Error message:', error.message);
                // }
                // console.error('Error config:', error.config);
                console.error('Error:', error);
            }
    };

    return (
        <>
            {disaster ? (
                editing ? (
                    
                    <div className="disasterDetailMainDiv">
                        <div className="disasterReporting-form">
                            <form onSubmit={handleSubmit} className="dsr-form" >
                                <div className="form-group">
                                    <label className="form-label">Disaster Type:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="disasterType"
                                        value={formData.disasterType}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Severity:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="severity"
                                        value={formData.severity}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description:</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location Type:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="locationType"
                                        value={formData.locationType}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location Coordinates:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="locationCoordinates"
                                        value={formData.locationCoordinates}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Image:</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="image"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="form-group" style={{display:"block"}}>
                                    <button type="submit" style={{marginRight:"10px"}} className="takeActionBtn">Save</button>
                                    <button type="button" onClick={() => setEditing(false)} style={{marginLeft:"10px"}} className="takeActionBtn">Cancel</button>
                                </div>
                            </form>
                            </div>
                        </div>
                ) : (
                    <>
                        <h1 style={{ color: "rgb(27, 40, 223)", textAlign: "center", marginTop: '5px' }}>{disaster.disasterType}</h1>
                        <div className="disasterDetailMainDiv">
                            <div className="disasterImageDiv">
                                <h2 style={{ color: "#1B4552", textAlign: "center", marginTop: '0px', padding: "10px" }}>Image</h2>
                                {disaster.image ? (
                                    <img src={require(`../../uploads/${disaster.image}`)} alt="Disaster" className="disasterImage" />
                                ) : (
                                    'N/A'
                                )}
                            </div>
                            <div className="disasterInfoDiv">
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
                                <div className="disasterDetailMainDiv">
                                    <button onClick={() => setEditing(true)} className="takeActionBtn" style={{height:"50px",width:"200px",marginTop:"10px"}}>Edit</button>
                                </div>
                            </div>

                        </div>
                    </>
                )
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default UserDisasterDetail;
