// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Select Your Role</h1>
            <div className="button-container">
                <button onClick={() => navigate('/admdash')}>Admin</button>
                <button onClick={() => navigate('/login')}>Doctor</button>
                <button onClick={() => navigate('/patidash')}>Patient</button>
            </div>
        </div>
    );
};




export default Home;
