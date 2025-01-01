import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AllRooms from './Rooms';
import { IoMenu } from "react-icons/io5";
import FAQ from './FAQ';

function Rooms() {
    const [view, setView] = useState('rooms'); // Default view is 'rooms'
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to handle drawer visibility
    const [isSidebarDropdownOpen, setIsSidebarDropdownOpen] = useState(false); // State to handle sidebar "all rooms" dropdown visibility
    const [isNavbarDropdownOpen, setIsNavbarDropdownOpen] = useState(false); // State to handle navbar "all rooms" dropdown visibility
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false); // State to handle "Go to About" dropdown visibility

    const navigate = useNavigate(); // Initialize useNavigate
  /*  const snavbar = (path) => {
        navigate(path); // Navigate to the specified path
    };

    const navigateTo = (screen) => {
        setView(screen);
        setIsDrawerOpen(false); // Close drawer when navigating
    };
    //above highlighted code is also right like navigateTo
*/
    const navigateTo = (screen) => {
        if (screen === 'rooms') {
            setView(screen); // Switch view for internal content
        } else {
            navigate(screen); // Navigate to a different route
        }
        setIsDrawerOpen(false); // Close drawer when navigating
    };
    const toggleSidebarDropdown = () => {
        setIsSidebarDropdownOpen(!isSidebarDropdownOpen); // Toggle sidebar "all rooms" dropdown visibility
        setIsNavbarDropdownOpen(false); // Close navbar dropdown if open
    };

    const toggleNavbarDropdown = () => {
        setIsNavbarDropdownOpen(!isNavbarDropdownOpen); // Toggle navbar "all rooms" dropdown visibility
        setIsSidebarDropdownOpen(false); // Close sidebar dropdown if open
    };

    const toggleAboutDropdown = () => {
        setIsAboutDropdownOpen(!isAboutDropdownOpen); // Toggle "Go to About" dropdown visibility
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
                    <li onClick={() => navigateTo('/doclist')}>Rooms & Suites</li>{/*snavbar('/doclist') not valid just valid in sub-sidebar */}
                    <li onClick={toggleSidebarDropdown}>All Rooms</li>
                    {isSidebarDropdownOpen && (
                        <ul className="dropdown">
                            <li onClick={toggleAboutDropdown}>Go to About</li>
                            {isAboutDropdownOpen && (
                                <ul className="dropdown">
                                    <li onClick={() => navigateTo('/docup')}>Doctor Update</li> {/*snavbar('/docup') also valid*/}
                                    <li onClick={() => navigateTo('/docdel')}>Sub-Item 2</li>{/*snavbar('/docdel')*/}
                                </ul>
                            )}
                            <li onClick={() => navigateTo('/docreport')}>Another Option</li>{/*snavbar('/docreport')*/}
                            <li onClick={() => navigateTo('/docdash')}>Another Option</li>{/*snavbar('/docdash')*/}
                        </ul>
                    )}
                    <li onClick={scrollTofaq}>Faq</li>
                </ul>
            </aside>
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li onClick={() => navigateTo('rooms')}>Rooms & Suites</li>
                    <li onClick={toggleNavbarDropdown}>All Rooms</li>
                    {isNavbarDropdownOpen && (
                        <ul className="dropdownn">
                            <li onClick={() => navigateTo('/doclist')}>Doctor List</li>
                            <li onClick={toggleAboutDropdown}>Edit Doctors</li>
                            {isAboutDropdownOpen && (
                                <ul className="dropdownn">
                                    <li onClick={() => navigateTo('/docup')}>Sub-Item 1</li>
                                    <li onClick={() => navigateTo('/docdel')}>Sub-Item 2</li>
                                </ul>
                            )}
                            <li onClick={() => navigateTo('/docreport')}>Doctor Reports</li>
                            <li onClick={() => navigateTo('/docdash')}>Go to About</li>
                            
                        </ul>
                    )}
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

export default Rooms;