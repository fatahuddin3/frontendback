/*
import React, { useEffect, useState } from 'react';
import { getDoctors } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Filtered doctors
    const [specialization, setSpecialization] = useState(''); // Track selected specialization
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTM3MjExOWNkYmYyNWUxNTRmMzZhNiIsImlhdCI6MTcyOTMyNzYzNCwiZXhwIjoxNzMxOTE5NjM0fQ.0TY4fCj7ABB5wAJN5gupKpE3QK9gAQvmZbK4E-SPz4E'; // Manually set the token here
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getDoctors(token);
                if (response.data && Array.isArray(response.data)) {
                    setDoctors(response.data); // Store the doctors
                    setFilteredDoctors(response.data); // Initially, all doctors are displayed
                } else {
                    alert('Received unexpected data format.');
                }
            } catch (error) {
                alert(`Error fetching doctors: ${error.message}`);
            }
        };

        fetchDoctors();
    }, [token]);

    // Handle specialization filtering
    const handleSpecializationChange = (e) => {
        const selectedSpecialization = e.target.value;
        setSpecialization(selectedSpecialization);

        // Filter the doctors based on the selected specialization
        if (selectedSpecialization === '') {
            setFilteredDoctors(doctors); // Show all doctors if no filter selected
        } else {
            const filtered = doctors.filter((doctor) => doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase());
            setFilteredDoctors(filtered); // Set filtered list
        }
    };

    return (
        <div>
            <h2>Doctor List</h2>

           
            <div className="specialization-filter">
                <label htmlFor="specialization">Specialists:</label>
                <select id="specialization" value={specialization} onChange={handleSpecializationChange}>
                    <option value="">All</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="kjass">Psychiatry</option>
                </select>
            </div>
           
            <ul className="doctor-list">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <li key={doctor._id} className="doctor-item">
                            <p>{doctor.name} - {doctor.specialization} - {doctor.email}</p>
                            <button onClick={() => navigate('/docup')}>Update</button>
                            <button onClick={() => navigate('/intro', { state: doctor })}>Intro</button>
                        </li>
                    ))
                ) : (
                    <p>No doctors found or unable to fetch data.</p>
                )}
            </ul>
        </div>
    );
};

export default DoctorList;*/


//below code real
/*import React, { useEffect, useState } from 'react';
import { getDoctors } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Filtered doctors
    const [specialization, setSpecialization] = useState(''); // Track selected specialization
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTc4ZmQ3NjFlNmI1Y2I5YTFiOTlkYiIsImlhdCI6MTcyOTU5NzM5OSwiZXhwIjoxNzMyMTg5Mzk5fQ.b75_5zIQ0Mp2x49GBStjoyAC9A3ePvfObKGmNBY-Kk4'; // Manually set the token here
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getDoctors(token);
                if (response.data && Array.isArray(response.data)) {
                    setDoctors(response.data); // Store the doctors
                    setFilteredDoctors(response.data); // Initially, all doctors are displayed
                } else {
                    alert('Received unexpected data format.');
                }
            } catch (error) {
                alert(`Error fetching doctors: ${error.message}`);
            }
        };

        fetchDoctors();
    }, [token]);

    // Handle specialization filtering
    const handleSpecializationChange = (e) => {
        const selectedSpecialization = e.target.value;
        setSpecialization(selectedSpecialization);

        // Filter the doctors based on the selected specialization
        if (selectedSpecialization === '') {
            // If 'All' is selected, show all doctors
            setFilteredDoctors(doctors);
        } else {
            const filtered = doctors.filter((doctor) =>
                doctor.specialization && doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase()
            );
            setFilteredDoctors(filtered); // Set filtered list
        }
    };

    return (
        <div>
            <h2>Doctor List</h2>

           
            <div className="specialization-filter">
                <label htmlFor="specialization">Specialists:</label>
                <select id="specialization" value={specialization} onChange={handleSpecializationChange}>
                    <option value="">All</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Psychiatry">Psychiatry</option>
                </select>
            </div>

           
            <ul className="doctor-list">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <li key={doctor._id} className="doctor-item">
                            <p>{doctor.name} - {doctor.specialization} - {doctor.email}</p>
                            <button onClick={() => navigate('/docup')}>Update</button>
                            <button onClick={() => navigate('/docintro', { state: doctor })}>Intro</button>
                        </li>
                    ))
                ) : (
                    <p>No doctors found or unable to fetch data.</p>
                )}
            </ul>
        </div>
    );
};

export default DoctorList;
*/
//updated by not using given token
/*import React, { useEffect, useState } from 'react';
import { getDoctors } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Filtered doctors
    const [specialization, setSpecialization] = useState(''); // Track selected specialization
    const [isLoading, setIsLoading] = useState(true); // For loading state
    const [error, setError] = useState(''); // Error message
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const token = localStorage.getItem('token'); // Fetch token from localStorage
                if (!token) {
                    setError("No valid token found. Please login again.");
                    setIsLoading(false);  // Stop loading if no token
                    return;
                }

                const response = await getDoctors(token); // Call API with the token
                if (response.data && Array.isArray(response.data)) {
                    setDoctors(response.data); // Store the doctors
                    setFilteredDoctors(response.data); // Initially, all doctors are displayed
                    setError(''); // Clear any previous errors
                } else {
                    setError('Received unexpected data format.');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('Unauthorized access. Please login again.');
                    localStorage.removeItem('token'); // Remove invalid token
                    setTimeout(() => {
                        navigate('/login'); // Redirect to login after showing the message
                    }, 10000); // Redirect after 2 seconds
                } else {
                    setError(`Error fetching doctors: ${error.message}`);
                }
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchDoctors();
    }, [navigate]);

    *//*useEffect(() => {
        const fetchDoctors = async () => {
            const token = localStorage.getItem('token');  // Get token from localStorage

            if (!token) {
                setError('Unauthorized access. Please login again.');  // Show error if token is missing
                setIsLoading(false);  // Stop loading spinner
                setTimeout(() => navigate('/login'), 2000);  // Redirect to login page after 2 seconds
                return;
            }

            try {
                const response = await getDoctors(token);  // Fetch doctors from the API
                setDoctors(response.data);  // Store fetched doctors
                setFilteredDoctors(response.data);  // Initialize filtered list with all doctors
                setError('');  // Clear any errors
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('Session expired. Please login again.');
                    localStorage.removeItem('token');  // Clear token on invalid or expired token
                    setTimeout(() => navigate('/login'), 2000);  // Redirect to login
                } else {
                    setError(`Error fetching doctors: ${error.message}`);
                }
            } finally {
                setIsLoading(false);  // Stop loading spinner
            }
        };

        fetchDoctors();
    }, [navigate]);*//*


    // Handle specialization filtering
    const handleSpecializationChange = (e) => {
        const selectedSpecialization = e.target.value;
        setSpecialization(selectedSpecialization);

        // Filter the doctors based on the selected specialization
        if (selectedSpecialization === '') {
            // If 'All' is selected, show all doctors
            setFilteredDoctors(doctors);
        } else {
            const filtered = doctors.filter((doctor) =>
                doctor.specialization && doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase()
            );
            setFilteredDoctors(filtered); // Set filtered list
        }
    };

    // If there is an error, display it
   *//* if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        );
    }

    // If data is still loading, display a loading message
    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }*//*

    return (
        <div>
            <h2>Doctor List</h2>

            
            <div className="specialization-filter">
                <label htmlFor="specialization">Specialists:</label>
                <select id="specialization" value={specialization} onChange={handleSpecializationChange}>
                    <option value="">All</option> 
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Psychiatry">Psychiatry</option>
                </select>
            </div>

            
            <ul className="doctor-list">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <li key={doctor._id} className="doctor-item">
                            <p>{doctor.name} - {doctor.specialization} - {doctor.email}</p>
                            <button onClick={() => navigate('/docup')}>Update</button>
                            <button onClick={() => navigate('/docintro', { state: doctor })}>Intro</button>
                        </li>
                    ))
                ) : (
                    <p>No doctors found or unable to fetch data.</p>
                )}
            </ul>
        </div>
    );
};

export default DoctorList;*/

import React, { useEffect, useState } from 'react';
import { getDoctors } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Filtered doctors
    const [specialization, setSpecialization] = useState(''); // Track selected specialization
    const [searchName, setSearchName] = useState(''); // Track search term
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTc4ZmQ3NjFlNmI1Y2I5YTFiOTlkYiIsImlhdCI6MTcyOTU5NzM5OSwiZXhwIjoxNzMyMTg5Mzk5fQ.b75_5zIQ0Mp2x49GBStjoyAC9A3ePvfObKGmNBY-Kk4'; // Manually set the token here
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getDoctors(token);
                if (response.data && Array.isArray(response.data)) {
                    setDoctors(response.data); // Store the doctors
                    setFilteredDoctors(response.data); // Initially, all doctors are displayed
                } else {
                    alert('Received unexpected data format.');
                }
            } catch (error) {
                alert(`Error fetching doctors: ${error.message}`);
            }
        };

        fetchDoctors();
    }, [token]);

    // Handle specialization filtering
    const handleSpecializationChange = (e) => {
        const selectedSpecialization = e.target.value;
        setSpecialization(selectedSpecialization);

        // Apply both specialization and name filtering together
        const filtered = doctors.filter((doctor) => {
            const isSpecializationMatch = !selectedSpecialization || doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase();
            const isNameMatch = !searchName || doctor.name.toLowerCase().includes(searchName.toLowerCase());
            return isSpecializationMatch && isNameMatch;
        });

        setFilteredDoctors(filtered); // Set filtered list based on specialization and search name
    };

    // Handle the search by name
    const handleSearch = () => {
        const searchTerm = searchName.trim().toLowerCase();

        // Apply both name and specialization filtering
        const filtered = doctors.filter((doctor) => {
            const isSpecializationMatch = !specialization || doctor.specialization.toLowerCase() === specialization.toLowerCase();
            const isNameMatch = !searchTerm || doctor.name.toLowerCase().includes(searchTerm);
            return isSpecializationMatch && isNameMatch;
        });

        setFilteredDoctors(filtered); // Only show relevant doctors based on search and specialization
    };

    return (
        <div>
            <h2>Doctor List</h2>

            {/* Specialization Filter */}
            <div className="specialization-filter">
                <label htmlFor="specialization">Specialists:</label>
                <select id="specialization" value={specialization} onChange={handleSpecializationChange}>
                    <option value="">All</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Psychiatry">Psychiatry</option>
                </select>
            </div>

            {/* Search Name */}
            <div>
                <input
                    type="text"
                    placeholder="Search Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)} // Update search term state
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Doctor List */}
            <ul className="doctor-list">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <li key={doctor._id} className="doctor-item">
                            <p>{doctor.name} - {doctor.specialization} - {doctor.email}</p>
                            <button onClick={() => navigate('/docup')}>Update</button>
                            <button onClick={() => navigate('/docintro', { state: doctor })}>Intro</button>
                        </li>
                    ))
                ) : (
                    <p>No doctors found or unable to fetch data.</p>
                )}
            </ul>
        </div>
    );
};

export default DoctorList;

