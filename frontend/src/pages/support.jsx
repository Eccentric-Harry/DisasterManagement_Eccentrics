import React, { useState } from 'react';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        supportType: 'seek',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Form submitted', formData);
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-2xl rounded-xl p-6 mt-32">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Disaster Support</h2>
            <p className="text-gray-600 mb-6">
                If you need any help , we are here to connect you with the right resources.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-4 border border-gray-300 rounded-md"
                        required
                        rows="3" // Adjust the number of rows to control height
                        placeholder="Please describe your situation or how you can help."
                    ></textarea>

                </div>

                <button
                    type="submit"
                    className="w-28 bg-blue-600 ml-44 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Support;











