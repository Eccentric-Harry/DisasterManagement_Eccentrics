// import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
//import transporter from '../../utils/email.js';

// const transporter = require('../../utils/email');

const DisasterReporting = () => {
    const date = new Date();
    const reportedat = new Intl.DateTimeFormat('en-US', { dateStyle: 'full',timeStyle:'long' }).format(date);

    const [disasterInfo, setDisasterInfo] = useState({
        location: {
            type: 'Point',
            coordinates: [0, 0]
        },
        reportedat,
        disasterType: '',
        description: '',
        severity: '',
        image: ''
    });


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const coordinates = await getLocation();
  
          const updatedDisasterInfo = {
              ...disasterInfo,
              location: {
                  type: 'Point',
                  coordinates: [coordinates[0], coordinates[1]]
              }
          };
  
          const formData = new FormData();
  
          formData.append('locationType', updatedDisasterInfo.location.type);
          formData.append('locationCoordinates', JSON.stringify(updatedDisasterInfo.location.coordinates));
  
          Object.keys(updatedDisasterInfo).forEach(key => {
              if (key !== 'image') {
                  formData.append(key, updatedDisasterInfo[key]);
              }
          });
          formData.append('image', updatedDisasterInfo.image);
  
          const token = localStorage.getItem('token');
          if (!token) {
              alert('You need to be logged in to report a disaster');
              return;
          }
  
          const res = await axios.post("http://localhost:5000/reportdisaster", formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`
              }
          });
        //   const res = await axios({
        //     method: "post",
        //     baseURL: "http://localhost:5000", // Base URL
        //     url: "/reportdisaster", // Specific endpoint
        //     data: formData, // Data to be sent in the request body
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': `Bearer ${token}`
        //     }
        // });
        
<<<<<<< HEAD
=======
            Object.keys(updatedDisasterInfo).forEach(key => {
                if (key !== 'image') {
                    formData.append(key, updatedDisasterInfo[key]);
                }
            });
            formData.append('image', updatedDisasterInfo.image);
            
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You need to be logged in to report a disaster');
                return;
            };
            console.log(formData);
            
            const res = await axios.post("http://localhost:5000/reportdisaster", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                }
            });
            console.log(res);
            console.log(coordinates);
>>>>>>> 00ec0ccd89888902407fe1b256dd7ca76de5d733

          console.log(res);
          alert("Disaster reported successfully");
      } catch (err) {
          if (err.response) {
              // The request was made and the server responded with a status code
              console.log('Response error:', err.response.data);
              alert(`Error: ${err.response.data.message || err.message}`);
          } else if (err.request) {
              // The request was made but no response was received
              console.log('Request error:', err.request);
              alert('No response from server. Please try again.');
          } else {
              // Something happened in setting up the request that triggered an error
              console.log('General error:', err.message);
              alert(`Error: ${err.message}`);
          }
      }
  };
  
    
    

    const getLocation = () => {
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const coordinates = [position.coords.latitude, position.coords.longitude];
              resolve(coordinates); // return the coordinates as a promise
            }, (error) => {
              reject(error);
            });
          } else {
            reject("Geolocation is not supported by this browser.");
          }
        });
      };
     

      const content = (
        <>
<<<<<<< HEAD
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-semibold text-center text-gray-600 mb-6">Report a Disaster</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="disasterType" className="form-label text-sm font-medium text-gray-700">
                    <strong>Disaster Type</strong>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Disaster Type"
                    autoComplete="off"
                    name="disasterType"
                    className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    onChange={(e) => setDisasterInfo({ ...disasterInfo, disasterType: e.target.value })}
                  />
                </div>
      
                <div className="form-group">
                  <label htmlFor="disaster-severity" className="form-label text-sm font-medium text-gray-700">
                    <strong>Disaster Severity:</strong>
                  </label>
                  <select
                    id="disaster-severity"
                    className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    onChange={(e) => setDisasterInfo({ ...disasterInfo, severity: e.target.value })}
                  >
                    <option value="">--Please choose an option--</option>
                    <option value="minor">Minor</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                    <option value="extreme">Extreme</option>
                  </select>
                </div>
      
                <div className="form-group">
                  <label htmlFor="description" className="form-label text-sm font-medium text-gray-700">
                    <strong>Description</strong>
                  </label>
                  <textarea
                    id="description"
                    placeholder="Describe the disaster..."
                    className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    onChange={(e) => setDisasterInfo({ ...disasterInfo, description: e.target.value })}
                  ></textarea>
                </div>
      
                <div className="form-group">
                  <label htmlFor="image" className="form-label text-sm font-medium text-gray-700">
                    <strong>Upload Image</strong>
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    multiple
                    className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    onChange={(e) => {
                      setDisasterInfo({
                        ...disasterInfo,
                        image: e.target.files[0],
                      });
                    }}
                  />
                </div>
      
                <div className="form-group flex items-center">
                  <input
                    type="checkbox"
                    id="confirmation"
                    required
                    className="form-checkbox h-4 w-4 text-blue-600 focus:ring focus:ring-blue-500"
                  />
                  <label htmlFor="confirmation" className="form-label ml-2 text-sm text-gray-700">
                    I confirm the accuracy of this report
                  </label>
                </div>
      
                <button
                  type="submit"
                  className="reportDisaster-button w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Report Disaster
                </button>
              </form>
            </div>
          </div>
=======
       <div className="flex justify-center items-center py-10 bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
    <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Report a Disaster</h2>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="disasterType" className="form-label text-sm font-medium text-gray-700">
          <strong>Disaster Type</strong>
        </label>
        <input
          type="text"
          required
          placeholder="Disaster Type"
          autoComplete="off"
          name="disasterType"
          className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          onChange={(e) => setDisasterInfo({ ...disasterInfo, disasterType: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="disaster-severity" className="form-label text-sm font-medium text-gray-700">
          <strong>Disaster Severity:</strong>
        </label>
        <select
          id="disaster-severity"
          className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          onChange={(e) => setDisasterInfo({ ...disasterInfo, severity: e.target.value })}
        >
          <option value="">--Please choose an option--</option>
          <option value="minor">Minor</option>
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
          <option value="extreme">Extreme</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label text-sm font-medium text-gray-700">
          <strong>Description</strong>
        </label>
        <textarea
          id="description"
          placeholder="Describe the disaster..."
          className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          onChange={(e) => setDisasterInfo({ ...disasterInfo, description: e.target.value })}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="image" className="form-label text-sm font-medium text-gray-700">
          <strong>Upload Image</strong>
        </label>
        <input
          type="file"
          id="image"
          name="image"
          multiple
          className="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          onChange={(e) => {
            setDisasterInfo({
              ...disasterInfo,
              image: e.target.files[0],
            });
          }}
        />
      </div>

      <div className="form-group flex items-center">
        <input
          type="checkbox"
          id="confirmation"
          required
          className="form-checkbox h-4 w-4 text-blue-600 focus:ring focus:ring-blue-500"
        />
        <label htmlFor="confirmation" className="form-label ml-2 text-sm text-gray-700">
          I confirm the accuracy of this report
        </label>
      </div>

      <button
        type="submit"
        className="reportDisaster-button w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
      >
        Report Disaster
      </button>
    </form>
  </div>
</div>

>>>>>>> 00ec0ccd89888902407fe1b256dd7ca76de5d733
        </>
      );
      
      return content;
    }

export default DisasterReporting;