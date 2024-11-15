// ResourceForm.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from '../../components/Navbar/Navbar2';


const ResourceForm = () => {
    const { id: disasterId } = useParams();
    const [vehicle, setVehicle] = useState("");
    const [personnel, setPersonnel] = useState("");
    const [equipment, setEquipment] = useState("");
    const [supplies, setSupplies] = useState("");
    const [facilities, setFacilities] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://disaster-backend-nine.vercel.app/disasters/${disasterId}/resources`, {
                disasterId,
                vehicle,
                personnel,
                equipment,
                supplies,
                facilities
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status === 200) {
                console.log(`Resources allocated for disaster ${disasterId}`);
                navigate(`/dash/disasters/${disasterId}`);
            } else {
                console.log("Error allocating resources");
            }
        } catch (error) {
            console.error("Error allocating resources: ", error);
        }
    };

    return (
        <>
            <Navbar2 />
            <h2 className="text-center text-blue-800 mt-6 text-2xl font-semibold">Allocate Resources</h2>
            <div className="max-w-4xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                    <div className="form-group">
                        <label htmlFor="vehicle" className="block text-lg font-medium text-gray-700 mb-2">Vehicle</label>
                        <textarea
                            id="vehicle"
                            value={vehicle}
                            onChange={(e) => setVehicle(e.target.value)}
                            className="form-control w-full h-32 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Vehicle e.g Ambulance"
                        />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="personnel" className="block text-lg font-medium text-gray-700 mb-2">Personnel</label>
                        <textarea
                            id="personnel"
                            value={personnel}
                            onChange={(e) => setPersonnel(e.target.value)}
                            className="form-control w-full h-32 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Personnel e.g Firefighters"
                        />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="equipment" className="block text-lg font-medium text-gray-700 mb-2">Equipment</label>
                        <textarea
                            id="equipment"
                            value={equipment}
                            onChange={(e) => setEquipment(e.target.value)}
                            className="form-control w-full h-32 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Equipment e.g Safety gear"
                        />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="supplies" className="block text-lg font-medium text-gray-700 mb-2">Supplies</label>
                        <textarea
                            id="supplies"
                            value={supplies}
                            onChange={(e) => setSupplies(e.target.value)}
                            className="form-control w-full h-32 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Supplies e.g First Aid Kits"
                        />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="facilities" className="block text-lg font-medium text-gray-700 mb-2">Facilities</label>
                        <textarea
                            id="facilities"
                            value={facilities}
                            onChange={(e) => setFacilities(e.target.value)}
                            className="form-control w-full h-32 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Facilities e.g Evacuation Centers"
                        />
                    </div>
    
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onClick={() => navigate(`/dash/disasters/${disasterId}`)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
    
};

export default ResourceForm;
