

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetail() {
    const { id } = useParams();
    const [patientImage, setPatientImage] = useState(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmUwZjc0Y2VjZDBhZGI5MDgzMzQzMSIsImlhdCI6MTcyNzkyNjEzNCwiZXhwIjoxNzMwNTE4MTM0fQ.N7-wecKWJEDlTRG1ICOggn16zHLJjlbvOZFoYrSd2n4';

    useEffect(() => {
        // Fetch the patient's image from the backend
        axios.get(`http://localhost:4000/pati/patientimage/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob' // Ensure blob response is configured
        })

            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                setPatientImage(imageUrl);
            })
            .catch(error => {
                console.error("Error fetching patient details:", error);
            });
    }, [id]);

    return (
        <div>
            <h1>Patient Detail</h1>
            
               
            {patientImage ? (
                <img src={patientImage} alt="Patient Information" />
            ) : (
                <p>Loading patient details...</p>
            )}
                
           
        </div>
    );
}

export default PatientDetail;*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetail() {
    const { id } = useParams();
    const [patientImage, setPatientImage] = useState(null);
    const [color, setColor] = useState('#FFFF00'); // Default color is yellow
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmUwZjc0Y2VjZDBhZGI5MDgzMzQzMSIsImlhdCI6MTcyNzkyNjEzNCwiZXhwIjoxNzMwNTE4MTM0fQ.N7-wecKWJEDlTRG1ICOggn16zHLJjlbvOZFoYrSd2n4';

    useEffect(() => {
        
        axios.get(`http://localhost:4000/pati/patientimage/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { color }, 
            responseType: 'blob'
        })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                setPatientImage(imageUrl);
            })
            .catch(error => {
                console.error("Error fetching patient details:", error);
            });
    }, [id, color]);

    return (
        <div>
            <h1>Patient Detail</h1>

            {*//* Color picker to allow the user to select a background color *//*}
            <label>Select Background Color: </label>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />

            {patientImage ? (
                <img src={patientImage} alt="Patient Information" />
            ) : (
                <p>Loading patient details...</p>
            )}
        </div>
    );
}

export default PatientDetail;*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetail() {
    const { id } = useParams();
    const [patientImage, setPatientImage] = useState(null);   // For the image fetched from canvas
    const [patientDetails, setPatientDetails] = useState({}); // For JSON details (name, age, gender)
    const [color, setColor] = useState('#FFFF00');            // Default color is yellow
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmUwZjc0Y2VjZDBhZGI5MDgzMzQzMSIsImlhdCI6MTcyNzkyNjEzNCwiZXhwIjoxNzMwNTE4MTM0fQ.N7-wecKWJEDlTRG1ICOggn16zHLJjlbvOZFoYrSd2n4';

    // Fetch canvas image
    useEffect(() => {
        axios.get(`http://localhost:4000/pati/patientimage/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { color },
            responseType: 'blob'
        })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                setPatientImage(imageUrl);
            })
            .catch(error => {
                console.error("Error fetching patient image:", error);
            });
    }, [id, color]);

    // Fetch JSON patient details (name, age, gender)
    useEffect(() => {
        axios.get(`http://localhost:4000/pati/patientdetails/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setPatientDetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching patient details:", error);
            });
    }, [id]);

    return (
        <div>
            <h1>Doctor Introduction</h1>

         
            <div style={{ background: '#f1f1f1', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
                <p><strong>Name:</strong> {patientDetails.name}</p>
                <p><strong>Age:</strong> {patientDetails.age}</p>
                <p><strong>Gender:</strong> {patientDetails.gender}</p>

                
                <button onClick={() => window.history.back()} style={{ padding: '10px', background: '#007bff', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
                    Back to Patient List
                </button>
            </div>
            <br />

            
            <label>Select Background Color: </label>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            {patientImage ? (
                <img src={patientImage} alt="Patient Information" />
            ) : (
                <p>Loading patient details...</p>
            )}
           
           
        </div>
    );
}

export default PatientDetail;*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetail() {
    const { id } = useParams();
    const [patientImage, setPatientImage] = useState(null);
    const [color, setColor] = useState('#FFFF00'); // Default color is yellow
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmUwZjc0Y2VjZDBhZGI5MDgzMzQzMSIsImlhdCI6MTcyNzkyNjEzNCwiZXhwIjoxNzMwNTE4MTM0fQ.N7-wecKWJEDlTRG1ICOggn16zHLJjlbvOZFoYrSd2n4'; // Replace with a valid token

    useEffect(() => {
        axios.get(`http://localhost:4000/patientimage/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { color },
            responseType: 'blob'
        })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                setPatientImage(imageUrl);
            })
            .catch(error => {
                console.error("Error fetching patient details:", error);
            });
    }, [id, color]);

    return (
        <div>
            <h1>Patient Detail</h1>

            {*//* Color picker to allow the user to select a background color *//*}
            <label>Select Background Color: </label>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />

            {patientImage ? (
                <img src={patientImage} alt="Patient Information" />
            ) : (
                <p>Loading patient details...</p>
            )}
        </div>
    );
}

export default PatientDetail;
*/
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetail() {
    const { id } = useParams();
    const [patientImage, setPatientImage] = useState(null);   // For the image fetched from canvas
    const [color, setColor] = useState('#FFFF00');            // Default color is yellow
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmUwZjc0Y2VjZDBhZGI5MDgzMzQzMSIsImlhdCI6MTcyNzkyNjEzNCwiZXhwIjoxNzMwNTE4MTM0fQ.N7-wecKWJEDlTRG1ICOggn16zHLJjlbvOZFoYrSd2n4';

    // Fetch canvas image with selected background color
    useEffect(() => {
        axios.get(`http://localhost:4000/pati/patientimage/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { color },
            responseType: 'blob'
        })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                setPatientImage(imageUrl);
            })
            .catch(error => {
                console.error("Error fetching patient image:", error);
            });
    }, [id, color]); // Refetch image when color changes

    return (
        <div>
            <h1>Doctor Introduction</h1>

            {*//* Color picker to allow the user to select a background color *//*}
            <label>Select Background Color: </label>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ marginBottom: '20px' }}
            />

            {*//* Display the patient image *//*}
            {patientImage ? (
                <img src={patientImage} alt="Patient Information" style={{ display: 'block', margin: '20px auto', borderRadius: '10px' }} />
            ) : (
                <p>Loading patient image...</p>
            )}
        </div>
    );
}

export default PatientDetail;*/
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetail() {
    const { id } = useParams();
    const [patientImage, setPatientImage] = useState(null);
    const [color, setColor] = useState('#FFFF00'); // Default color: yellow
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmU2ZTc1ZmE3NjVjMjkyNjYzNjNmZiIsImlhdCI6MTcyNzk1MDQ1NCwiZXhwIjoxNzMwNTQyNDU0fQ.uCmATCgFDSdv-ZO67WPz5qrOjh-HwNaEoVGkGM6AFCg'; // Replace with your JWT token

    // Fetch patient image with the selected background color
    useEffect(() => {
        fetchPatientImage();
    }, [id, color]); // Refetch when color changes

    // Function to fetch the patient image
    const fetchPatientImage = () => {
        axios.get(`http://localhost:4000/pati/patientimage/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { color }, // Send selected background color to backend
            responseType: 'blob' // Important: Expecting binary image data
        })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                setPatientImage(imageUrl);
            })
            .catch(error => {
                console.error("Error fetching patient image:", error);
            });
    };

    // Function to handle download
    const handleDownload = () => {
        axios.get(`http://localhost:4000/pati/patientimage/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { color }, // Send selected background color
            responseType: 'blob'
        })
            .then(response => {
                // Create a link to download the image
                const link = document.createElement('a');
                const imageUrl = URL.createObjectURL(response.data);
                link.href = imageUrl;
                link.download = `Patient_${id}_image.png`; // Filename for download
                link.click();  // Simulate the click event for download
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    };

    return (
        <div>
            <h1>Patient Information</h1>

            
            <label>Select Background Color: </label>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ marginBottom: '20px' }}
            />

           
            {patientImage ? (
                <>
                    <img
                        src={patientImage}
                        alt="Patient Information"
                        style={{ display: 'block', margin: '20px auto', borderRadius: '10px' }}
                    />

                 
                    <button onClick={handleDownload} style={{ display: 'block', margin: '20px auto' }}>
                       Download Patient Image
                    </button>
                </>
            ) : (
                <p>Loading patient image...</p>
            )}
        </div>
    );
}

export default PatientDetail;*/




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetail() {
    const { id } = useParams();
    const [patientImage, setPatientImage] = useState(null);
    const [color, setColor] = useState('#FFFF00'); // Default color: yellow (backend default)
    const [isBookmarked, setIsBookmarked] = useState(false); // For checking if the page is bookmarked
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTM3MjExOWNkYmYyNWUxNTRmMzZhNiIsImlhdCI6MTcyOTMyNzYzNCwiZXhwIjoxNzMxOTE5NjM0fQ.0TY4fCj7ABB5wAJN5gupKpE3QK9gAQvmZbK4E-SPz4E'; // Replace with your JWT token

    // Fetch patient image with the selected background color
    useEffect(() => {
        const bookmarkedState = checkIfBookmarked();

        if (bookmarkedState) {
            // If bookmarked, restore the state (color) and THEN fetch the image
            setColor(bookmarkedState.color);
        } else {
            // If not bookmarked, just fetch the default state from the backend
            fetchPatientImage();
        }
    }, [id]); // Only run this effect on page load (id change)

    // Fetch image when the color changes (regardless of bookmarked state)
    useEffect(() => {
        fetchPatientImage();  // Always fetch the patient image when color is set or changed
    }, [color]); // Refetch image when color changes

    // Function to fetch the patient image
    const fetchPatientImage = () => {
        axios.get(`http://localhost:4000/pati/patientimage/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { color }, // Send selected background color to backend
            responseType: 'blob' // Important: Expecting binary image data
        })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                setPatientImage(imageUrl);
            })
            .catch(error => {
                console.error("Error fetching patient image:", error);
            });
    };

    // Check if the current patient page is bookmarked
    const checkIfBookmarked = () => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        const bookmark = bookmarks.find((bookmark) => bookmark.id === id);
        setIsBookmarked(!!bookmark);  // Check if a bookmark exists
        return bookmark;  // Return the bookmarked state if exists
    };

    // Function to handle bookmarking the page with full state
    const handleBookmark = () => {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

        if (isBookmarked) {
            // If already bookmarked, remove it from the list
            bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
            setIsBookmarked(false);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            fetchPatientImage();  // Reset to the backend's default state
        } else {
            // If not bookmarked, save the current state (color, etc.)
            const newBookmark = { id, color };
            bookmarks.push(newBookmark);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            setIsBookmarked(true);
        }
    };

    // Function to handle download
    const handleDownload = () => {
        axios.get(`http://localhost:4000/pati/patientimage/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { color }, // Send selected background color
            responseType: 'blob'
        })
            .then(response => {
                // Create a link to download the image
                const link = document.createElement('a');
                const imageUrl = URL.createObjectURL(response.data);
                link.href = imageUrl;
                link.download = `Patient_${id}_image.png`; // Filename for download
                link.click();  // Simulate the click event for download
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    };

    return (
        <div>
            <h1>Patient Information</h1>

            
            <label>Select Background Color: </label>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ marginBottom: '20px' }}
            />

           
            {patientImage ? (
                <>
                    <img
                        src={patientImage}
                        alt="Patient Information"
                        style={{ display: 'block', margin: '20px auto', borderRadius: '10px' }}
                    />

                    
                    <button onClick={handleDownload} style={{ display: 'block', margin: '20px auto' }}>
                        Download Patient Image
                    </button>

                   
                    <button onClick={handleBookmark} style={{ display: 'block', margin: '20px auto' }}>
                        {isBookmarked ? 'Remove Bookmark' : 'Bookmark this Page'}
                    </button>
                </>
            ) : (
                <p>Loading patient image...</p>
            )}
        </div>
    );
}

export default PatientDetail;



