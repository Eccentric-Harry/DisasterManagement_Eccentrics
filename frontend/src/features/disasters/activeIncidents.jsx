import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActiveIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token'); 

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('https://disaster-backend-nine.vercel.app/api/activeIncidents', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        });

        setIncidents(response.data);
      } catch (err) {
        console.error('Error fetching incidents:', err);
        setError('Failed to fetch incidents data');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Incidents</h2>
      {incidents.length === 0 ? (
        <p>No active incidents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {incidents.map((incident, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              {incident.Image && (
                <img
                  src={incident.Image}
                  alt={`Post by ${incident.Username}`}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{incident.Username}</h3>
                <p className="text-sm text-gray-700 mb-2">{incident.Text}</p>
                <p className="text-xs text-gray-500">Posted on: {new Date(incident["Created At"]).toLocaleString()}</p>
                <div className="flex justify-between mt-4">
                  <span className="text-sm text-gray-600">Retweets: {incident.Retweets}</span>
                  <span className="text-sm text-gray-600">Likes: {incident.Likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveIncidents;