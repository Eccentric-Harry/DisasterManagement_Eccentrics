import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DisasterList = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/disasters',{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDisasters(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchDisasters();
  }, []);

  return (
    <>
    {/* <div className="dsReportingDiv"> */}
      <h1 style={{color:"rgb(27, 40, 223)",textAlign:"center",marginTop:'5px'}}>Reported Disasters</h1>
      <div className="disastersDiv">
        {disasters.length > 0 ? (
          <table className="disasterTable">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Severity</th>
                {/* <th>Coordinates</th>
                <th>Image</th> */}
                <th>Take Action</th>
              </tr>
            </thead>
            <tbody>
              {disasters.map((disaster) => (
                <tr key={disaster._id}>
                  <td>{disaster.disasterType}</td>
                  <td>{disaster.description}</td>
                  <td>{disaster.severity}</td>
                  {/* <td>{disaster.location && disaster.location.coordinates ? `Lat: ${disaster.location.coordinates[0]}  Long: ${disaster.location.coordinates[1]}` : 'N/A'}</td>
                  <td>{disaster.image ? <img src={require(`../../uploads/${disaster.image}`)} alt="Disaster" height={100} width={100} /> : 'N/A'}</td> */}
                  <td>
                    
                    <Link to={{ pathname: `../disasters/${disaster._id}`, state: { id: disaster._id } }}>
                      <button className="takeActionBtn">Take Action</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No disasters reported.</p>
        )}
      </div>
    {/* </div> */}
  </>);
};

export default DisasterList;
