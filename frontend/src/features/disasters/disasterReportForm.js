// ReportForm.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from '../../components/Navbar/Navbar2';


const ReportForm = () => {
    const { id: disasterId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/disasters/${disasterId}/report`, {
                title,
                description
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status === 200) {
                navigate(`/dash/disasters/${disasterId}`);
            } else {
                console.log("Error making report");
            }
        } catch (error) {
            console.error("Error making report: ", error);
        }
    };

    return (
        <>
        <Navbar2 />
        <h2 style={{color:"#1B4552",textAlign:"center",marginTop:'5px'}}>Make a Report</h2>
        <div className="disasterReporting-form">
            <form onSubmit={handleSubmit} className="dsr-form">
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="form-control" placeholder="Give a description about this disaster"/>
                </div>
                
                <div className="form-group" style={{display:"block"}}>
                    <button type="submit" className="takeActionBtn" style={{marginRight:"10px"}}>Submit Report</button>
                    <button type="button" className="takeActionBtn" style={{marginLeft:"10px"}} onClick={() => navigate(`/dash/disasters/${disasterId}`)}>Cancel</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default ReportForm;
