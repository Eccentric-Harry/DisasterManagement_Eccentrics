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
            <h1 style={{color:"rgb(27, 40, 223)",textAlign:"center",marginTop:'5px'}}>My Disasters</h1>
            <div className="disastersDiv">
                {disaster ? (
                    <table className="disasterTable">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Severity</th>
                                <th>Update Disaster</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={disaster._id}>
                                <td>{disaster.disasterType}</td>
                                <td>{disaster.description}</td>
                                <td>{disaster.severity}</td>
                                <td>
                                    <Link to={{ pathname: `../disasters/${disaster._id}`, state: { id: disaster._id } }}>
                                        <button className="takeActionBtn">Update</button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No disasters reported.</p>
                )}
            </div>

        </>
    );
}

export default UserDisasters;