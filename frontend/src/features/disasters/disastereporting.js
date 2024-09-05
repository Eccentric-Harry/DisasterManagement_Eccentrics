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
    
            // Update the disasterInfo state with the new location
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
            };
    
            const res = await axios.post("http://localhost:5000/reportdisaster", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                }
            });
            console.log(res);
            console.log(coordinates);

            //    await transporter.sendMail({
            //     from: 'ridgemuturi@gmail.com',
            //     to: 'bbitclass25@gmail.com',
            //     subject: 'New Disaster Reported',
            //     text: `A new disaster was reported at ${reportedat}. Type: ${disasterInfo.disasterType}`,
            //  });

            alert("Disaster reported successfully");
        } catch (err) {
            alert(err);
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
        <div className="dsReportingDiv">
            <div className="disasterReporting-form">
                <h2 style={{color:"#1B4552",textAlign:"center",marginTop:'5px'}}>Report a Disaster</h2>
                <form className="dsr-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="disasterType" className="form-label">
                            <strong>Disaster Type</strong>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Disaster Type"
                            autoComplete="off"
                            name="disasterType"
                            className="form-control"
                            onChange={(e) => setDisasterInfo({...disasterInfo, disasterType: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="disaster-severity" className='form-label'>
                            <strong>
                                Disaster Severity:
                            </strong> 
                        </label>
                        <select id="disaster-severity" className='form-control' onChange={(e) => setDisasterInfo({...disasterInfo, severity: e.target.value})}>
                            <option value="">--Please choose an option--</option>
                            <option value="minor">Minor</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                            <option value="extreme">Extreme</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            <strong>Description</strong>
                        </label>
                        <textarea id="description" placeholder="Describe the disaster..." className='form-control' onChange={(e) => setDisasterInfo({...disasterInfo, description: e.target.value})}></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image" className="form-label">
                            <strong>Upload Image</strong>
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            multiple
                            className="form-control"
                            onChange={(e) => {
                                setDisasterInfo({
                                    ...disasterInfo,
                                    image: e.target.files[0]
                                });
                            }}
                            
                        />
                    </div>

                    <div className="form-group">
                        <input type="checkbox" id="confirmation" required/>
                        <label htmlFor="confirmation" className='form-label' required>I confirm the accuracy of this report</label>
                    </div>
                    
                    <button type="submit" className="reportDisaster-button">Report Disaster</button>
                </form>
            </div>
        </div>
        </>
    );
    

  return content;
};

export default DisasterReporting;
