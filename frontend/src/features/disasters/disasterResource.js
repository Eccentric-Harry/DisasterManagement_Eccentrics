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
            const response = await axios.post(`http://localhost:5000/disasters/${disasterId}/resources`, {
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
            <h2 style={{color:"#1B4552",textAlign:"center",marginTop:'5px'}}>Allocate Resources</h2>
            <div className="disasterReporting-form">
            <form onSubmit={handleSubmit} className="dsr-form">
                <div className="form-group">
                    <label htmlFor="vehicle" className="form-label">Vehicle</label>
                    <textarea id="vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="form-control" placeholder="Vehicle e.g Ambulance"/>
                </div>

                <div className="form-group">
                    <label htmlFor="personnel" className="form-label">Personnel</label>
                    <textarea id="personnel" value={personnel} onChange={(e) => setPersonnel(e.target.value)} className="form-control" placeholder="Personnel e.g Firefighters"/>
                </div>

                <div className="form-group">
                    <label htmlFor="equipment" className="form-label">Equipment</label>
                    <textarea id="equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)} className="form-control" placeholder="Equipment e.g Safety gear"/>
                </div>

                <div className="form-group">
                    <label htmlFor="supplies" className="form-label">Supplies</label>
                    <textarea id="supplies" value={supplies} onChange={(e) => setSupplies(e.target.value)} className="form-control" placeholder="Supplies e.g First Aid Kits"/>
                </div>

                <div className="form-group">
                    <label htmlFor="facilities" className="form-label">Facilities</label>
                    <textarea id="facilities" value={facilities} onChange={(e) => setFacilities(e.target.value)} className="form-control" placeholder="Facilities e.g Evacuation Centers"/>
                </div>

                <div className="form-group" style={{display:"block"}}>
                    <button type="submit" className="takeActionBtn" style={{marginRight:"10px"}}>Save</button>
                    <button type="button" className="takeActionBtn" style={{marginLeft:"10px"}} onClick={() => navigate(`/dash/disasters/${disasterId}`)}>Cancel</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default ResourceForm;
