import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDisasters = () => {
    const userId = localStorage.getItem("userId");
    const [disaster, setDisaster] = useState(null);

    useEffect(() => {
        const fetchDisaster = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/disasters/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log("Fetched data:", response.data); // Debugging line
                setDisaster(response.data[0]);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDisaster();
    }, [userId]);

    return (
        <>
            <h1 className="text-blue-700 text-center mt-2 mb-4 text-2xl font-bold">My Disasters</h1>
            <div className="overflow-x-auto p-4">
                {disaster ? (
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="py-2 px-4 border-b">Type</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 border-b">Severity</th>
                                <th className="py-2 px-4 border-b">Update Disaster</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={disaster._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{disaster.disasterType}</td>
                                <td className="py-2 px-4 border-b">{disaster.description}</td>
                                <td className="py-2 px-4 border-b">{disaster.severity}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={{ pathname: `../disasters/${disaster._id}`, state: { id: disaster._id } }}>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            Update
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No disasters reported.</p>
                )}
            </div>
        </>
    );
    
}

export default UserDisasters;