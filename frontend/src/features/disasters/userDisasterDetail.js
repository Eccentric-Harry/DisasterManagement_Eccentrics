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
            const response = await axios.put(`https://disaster-backend-nine.vercel.app/disasters/${id}`, form, {
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
              <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Disaster Type
                    </label>
                    <input
                      type="text"
                      name="disasterType"
                      value={formData.disasterType}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Severity
                    </label>
                    <input
                      type="text"
                      name="severity"
                      value={formData.severity}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Location Type
                    </label>
                    <input
                      type="text"
                      name="locationType"
                      value={formData.locationType}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Location Coordinates
                    </label>
                    <input
                      type="text"
                      name="locationCoordinates"
                      value={formData.locationCoordinates}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors focus:outline-none"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <h1 className="text-blue-600 text-center text-xl font-semibold mt-2">
                  {disaster.disasterType}
                </h1>
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h2 className="text-center text-lg font-semibold text-gray-700">
                      Image
                    </h2>
                    {disaster.image ? (
                      <img
                        src={require(`../../uploads/${disaster.image}`)}
                        alt="Disaster"
                        className="w-full h-64 object-cover rounded"
                      />
                    ) : (
                      <p className="text-center text-gray-500">N/A</p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h2 className="font-semibold text-gray-800">Severity</h2>
                      <p className="text-gray-600">{disaster.severity}</p>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-800">Description</h2>
                      <p className="text-gray-600">{disaster.description}</p>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-800">Location</h2>
                      <p className="text-gray-600">
                        {disaster.formattedAddress || 'N/A'}
                      </p>
                    </div>
                    <button
                      onClick={() => setEditing(true)}
                      className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors focus:outline-none"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </>
            )
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}
        </>
      );
      
    }
export default UserDisasterDetail
