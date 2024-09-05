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
        <h1 className="text-gray-800 text-center mt-4 mb-6 text-2xl font-bold">Reported Disasters</h1>
        <div className="overflow-x-auto p-4">
            {disasters.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4 border-b text-center">Type</th>
                            <th className="py-2 px-4 border-b text-center">Description</th>
                            <th className="py-2 px-4 border-b text-center">Severity</th>
                            {/* <th className="py-2 px-4 border-b text-center">Coordinates</th>
                            <th className="py-2 px-4 border-b text-center">Image</th> */}
                            <th className="py-2 px-4 border-b text-center">Take Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disasters.map((disaster) => (
                            <tr key={disaster._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b text-center">{disaster.disasterType}</td>
                                <td className="py-2 px-4 border-b text-center">{disaster.description}</td>
                                <td className="py-2 px-4 border-b text-center">{disaster.severity}</td>
                                {/* <td className="py-2 px-4 border-b text-center">
                                    {disaster.location && disaster.location.coordinates ? 
                                        `Lat: ${disaster.location.coordinates[0]}  Long: ${disaster.location.coordinates[1]}` 
                                        : 'N/A'}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    {disaster.image ? 
                                        <img src={require(`../../uploads/${disaster.image}`)} alt="Disaster" height={100} width={100} /> 
                                        : 'N/A'}
                                </td> */}
                                <td className="py-2 px-4 border-b text-center">
                                    <Link to={{ pathname: `../disasters/${disaster._id}`, state: { id: disaster._id } }}>
                                        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            Take Action
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500">No disasters reported.</p>
            )}
        </div>
    </>
);


};

export default DisasterList;
