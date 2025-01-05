/*import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AllRooms from '../Admin/Rooms';
import { IoMenu } from "react-icons/io5";
import FAQ from '../Admin/FAQ';

function Rooms() {
    const [view, setView] = useState('rooms'); // Default view is 'rooms'
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to handle drawer visibility
   
    const navigate = useNavigate(); // Initialize useNavigate
   

    const navigateTo = (screen) => {
        setView(screen);
        setIsDrawerOpen(false); // Close drawer when navigating
    };

    

    const scrollTofaq = () => {
        document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
        setIsDrawerOpen(false); // Close drawer when scrolling
    };

    return (
        <div className="rooms-page">

            <button className="drawer-toggle" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                <IoMenu />
            </button>
            <aside className={`sidebar ${isDrawerOpen ? 'open' : ''}`}>
                <ul>
                    <li onClick={() => navigateTo('rooms')}>Rooms & Suites</li>
                    <li onClick={() => navigateTo('/doclist')}>list</li>
                    
                    <li onClick={scrollTofaq}>Faq</li>
                </ul>
            </aside>
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li onClick={() => navigateTo('rooms')}>Rooms & Suites</li>
                    <li onClick={() => navigateTo('/doclist')}>list</li>
                   
                    <li onClick={scrollTofaq}>Faq</li>
                </ul>
            </nav>


            {view === 'rooms' && (
                <>
                    <h1>Rooms & Suites</h1>
                    <p>Experience luxurious comfort in our elegantly appointed rooms and suites...</p>
                    <div className="room-categories">
                        <img src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/231805683.jpg?k=cb442488fce6749b0998ef90428691813dd47b471d1d825f2f2a5ed744d4845a&o=&hp=1' alt="Rooms" />
                    </div>
                    <div className='op'>
                        <h1>Welcome to Sheraton Dhaka</h1>
                        <p>Maximize your experience in our five-star Dhaka lodgings</p>
                    </div>
                    <div className="feature-container">
                        <div className="feature-item">
                            <p>Relax in sophisticated Dhaka accommodations with Sheraton amenities and four-fixture bathrooms</p>
                        </div>
                        <div className="feature-item">
                            <p>Upgrade to a Club-level room in our Dhaka lodging and access our exclusive Sheraton Club Lounge</p>
                        </div>
                        <div className="feature-item">
                            <p>Take advantage of free, high-speed WiFi and other internet options in our Banani hotel rooms</p>
                        </div>
                    </div>
                </>
            )}


            {view === 'fitness' ? <FitnessCenter /> : null}


            <div id="allroom" className="allroom">
                <AllRooms />
            </div>

            <div id="faq" className="allroom">
                <FAQ />
            </div>
        </div>
    );
}

export default Rooms;*/

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AllRooms from '../Admin/Rooms';
import { IoMenu } from "react-icons/io5";
import FAQ from '../Admin/FAQ';

function Rooms() {
    const [view, setView] = useState('rooms'); // Default view is 'rooms'
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to handle drawer visibility

    const navigate = useNavigate(); // Initialize useNavigate

    // Navigate to internal views or routes
    const navigateTo = (screen) => {
        if (screen === 'rooms') {
            setView(screen); // Switch view for internal content
        } else {
            navigate(screen); // Navigate to a different route
        }
        setIsDrawerOpen(false); // Close drawer when navigating
    };

    const scrollTofaq = () => {
        document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
        setIsDrawerOpen(false); // Close drawer when scrolling
    };

    return (
        <div className="rooms-page">
            {/* Drawer toggle */}
            <button className="drawer-toggle" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                <IoMenu />
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isDrawerOpen ? 'open' : ''}`}>
                <ul>
                    <li onClick={() => navigateTo('rooms')}>Rooms & Suites</li>
                    <li onClick={() => navigateTo('/patilist')}>List</li> {/* Fixed the navigation */}
                    <li onClick={scrollTofaq}>FAQ</li>
                </ul>
            </aside>

            {/* Navbar */}
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li onClick={() => navigateTo('rooms')}>Rooms & Suites</li>
                    <li onClick={() => navigateTo('/patilist')}>List</li> {/* Fixed the navigation */}
                    <li onClick={scrollTofaq}>FAQ</li>
                </ul>
            </nav>

            {/* Render the internal view based on the current view */}
            {view === 'rooms' && (
                <>
                    <h1>Rooms & Suites</h1>
                    <p>Experience luxurious comfort in our elegantly appointed rooms and suites...</p>
                    <div className="room-categories">
                        <img src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/231805683.jpg?k=cb442488fce6749b0998ef90428691813dd47b471d1d825f2f2a5ed744d4845a&o=&hp=1' alt="Rooms" />
                    </div>
                    <div className='op'>
                        <h1>Welcome to Sheraton Dhaka</h1>
                        <p>Maximize your experience in our five-star Dhaka lodgings</p>
                    </div>
                    <div className="feature-container">
                        <div className="feature-item">
                            <p>Relax in sophisticated Dhaka accommodations with Sheraton amenities and four-fixture bathrooms</p>
                        </div>
                        <div className="feature-item">
                            <p>Upgrade to a Club-level room in our Dhaka lodging and access our exclusive Sheraton Club Lounge</p>
                        </div>
                        <div className="feature-item">
                            <p>Take advantage of free, high-speed WiFi and other internet options in our Banani hotel rooms</p>
                        </div>
                    </div>
                </>
            )}

            {/* All Rooms component */}
            <div id="allroom" className="allroom">
                <AllRooms />
            </div>

            {/* FAQ component */}
            <div id="faq" className="allroom">
                <FAQ />
            </div>
        </div>
    );
}

export default Rooms;
