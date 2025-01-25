/*// src/App.js
import React from 'react';
import DoctorRegister from './components/DoctorRegister';
import DoctorLogin from './components/DoctorLogin';
import DoctorDashboard from './components/DoctorDashboard';
import { DoctorProvider } from './context/DoctorContext';

function App() {
    return (
        <DoctorProvider>
            <div className="App">
                <h1>Hospital Management System</h1>
                <DoctorRegister />
                <DoctorLogin />
                <DoctorDashboard />
            </div>
        </DoctorProvider>
    );
}

export default App;*/
// src/App.js main code
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorRegister from './components/DoctorRegister';
import DoctorLogin from './components/DoctorLogin';
import DoctorDashboard from './components/DoctorDashboard';
import Home from './components/Home';
import DoctorList from './components/DoctorList';  // Import the new components
import DoctorDelete from './components/DoctorDelete';
import DoctorUpdate from './components/DoctorUpdate';
import { DoctorProvider } from './context/DoctorContext';
import PatientIntro from './components/PatientIntro';
import DoctorReport from './components/DoctorReport';
import BillManagement from './components/BillManagement';
import Appointments from './components/Appointments';
import Appointments2 from './components/Appointments2';
import Booking from './components/Booking';
import Booking2 from './components/Booking2';
import Bookin from './components/Bookin';
import DigitalMedicalRecordForm from './components/DigitalMedicalRecordForm';
import Digimedireco from './components/Digimedireco';
import Digimediupda from './components/Digimediupda';
import Prescrip from './components/Prescription';
import Presc from './components/Prescrip';
import Prescupd from './components/Prescripupda';
import Pharmac from './components/Pharmacy';
import Pharmaupd from './components/Pharmaupda';
import Tele from './components/Telemedi';
import Teleup from './components/Telemediupdate';
import Teledlt from './components/Telemedidlt';
import Vieww from './front';
import Admindash from './Admin/Admindash';

import Rooms from './Admin/Rooms';
import FAQ from './Admin/FAQ';
import './App.css';
import Faqitem from './Admin/FAQItem';
import Faqlist from './Admin/FAQList';
import Patireg from './components/PatientRegister';
import Patilist from './components/PatientList';
import Patidlt from './components/PatientDelete';
import Patiupd from './components/PatientUpdate';
import Patidet from './components/PatientDetails';
import Patidash from './Patient/Patientdash';
import DoctorIntro from './components/DoctorIntro';
import Appointdetailsma from './components/Appointdetailsma';
import Appointdetails from './components/Appointdetails';
import Appointup from './components/Appointmentup';
import Appointdel from './components/Appointdelete';
import Patlis from './components/Patilist';
import Patde from './components/Patidetail';
import BillList from './components/BillList';
import Billpost from './components/Billpost';
import Userreg from './components/UserDoctorreg';
import Userlog from './components/Userlog';
import Userupd from './components/Userupdate';
import Userdel from './components/Userdel';
import Nurseactivity from './components/Nurseactivity';
import Patientactivity from './components/Patientactivity';
import Nurseshift from './components/Nurseshift';
import Patishift from './components/Patientshift';
import Nurseassign from './components/Nurseassign';
import Nurspatupd from './components/Nurspatupd';
import Nurseactivilog from './components/Nurseactivilog';
import Nursetopati from './components/Nursetopati';
import Nurseactivilogpost from './components/Nurseactivilogpost';
import Nurseshiftpost from './components/Nurseshiftpost';
import Nursereport from './components/Nursereport';
import Patientreport from './components/Patientreport';
import Docttonursdisch from './components/Docttonursdisch';
import NursetoPatidisc from './components/NursetoPatitdisc';
import Docttopatidiscinfo from './components/Docttopatidiscinfo';
import Nursetopatidiscupd from './components/Nursetopatidiscupd';
import Penddisc from './components/Penddisc';
import Ipdpatireg from './components/Ipdpatireg';
import Ipdpatadmiss from './components/Ipdpatadmiss';
import Ipdroomallo from './components/Ipdroomallo';
import Ipdconsallo from './components/Ipdconsallo';
import Ipdassess from './components/Ipdassess';
import AdmissionList from './components/AdmissionList';
import Ipdroomdeta from './components/Ipdroomdeta';
import Ipdassessdetail from './components/Ipdassessdetail';
/*import AdmissionDetails from './components/AdmissionDetails';*/
import Ipdpatiupda from './components/Ipdpatiupda';
import Ipdroomupda from './components/Ipdroomupda';
import Ipdassessupd from './components/Ipdassessupd';
import Ipdconsentupda from './components/Ipdconsentupda';
function App() {
    return (
      
            <Router>
                <div className="App">
          
                    <Routes>
                        <Route path="/s" element={<Userlog />} />
                        <Route path="/register" element={<DoctorRegister />} />
                        <Route path="/j" element={<DoctorLogin />} />
                        <Route path="/docdash" element={<DoctorDashboard />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/doclist" element={<DoctorList />} />          
                        <Route path="/docdel" element={<DoctorDelete />} />  
                        <Route path="/docup" element={<DoctorUpdate />} />                        
                        <Route path="/patintro" element={<PatientIntro />} />
                        <Route path="/docreport" element={<DoctorReport />} />
                        <Route path="/a" element={<BillManagement />} />
                        <Route path="/b" element={<Appointments />} />
                        <Route path="/c" element={<Appointments2 />} />
                        <Route path="/d" element={<Booking />} />
                        <Route path="/e" element={<Booking2 />} />
                        <Route path="/f" element={<Bookin />} />
                        <Route path="/g" element={<DigitalMedicalRecordForm />} />
                        <Route path="/h" element={<Digimedireco />} />
                        <Route path="/i" element={<Digimediupda />} />
                        <Route path="/j" element={<Prescrip />} />
                        <Route path="/k" element={<Presc />} />
                        <Route path="/l" element={<Prescupd />} />
                        <Route path="/s" element={< Pharmac />} />
                        <Route path="/j" element={< Pharmaupd />} />
                        <Route path="/n" element={< Tele />} />
                        <Route path="/o" element={< Teleup />} />
                        <Route path="/p" element={< Teledlt />} />                       
                        <Route path="/q" element={< Vieww />} />
                        <Route path="/admdash" element={< Admindash />} />
                        <Route path="/faq" element={< FAQ />} />                       
                        <Route path="/rooms" element={< Rooms />} />
                        <Route path="/faqlist" element={< Faqlist />} />
                        <Route path="/faqitem" element={< Faqitem />} />
                        <Route path="/" element={< Patireg />} />
                        <Route path="/r" element={< Patilist />} />
                        <Route path="/patidlt" element={< Patidlt />} />
                        <Route path="/s" element={< Patiupd />} />
                        <Route path="/t" element={< Patidet />} />
                        <Route path="/patidash" element={< Patidash />} />
                        <Route path="/docintro" element={< DoctorIntro />} />
                        <Route path="/u" element={< Appointdetailsma />} />
                        <Route path="/v" element={< Appointdetails />} />
                        <Route path="/w" element={< Appointup />} />
                        <Route path="/w" element={< Appointdel />} />
                        <Route path="/x" element={< Patlis />} />
                        <Route path="/patient/:id" element={< Patde />} />
                        <Route path="/h" element={<BillList/>} />
                        <Route path="/z" element={<Userreg />} />
                        <Route path="/" element={<Billpost />} />
                        <Route path="/useupd" element={<Userupd />} />
                        <Route path="/usedel" element={<Userdel />} />
                        <Route path="/h" element={<Nurseactivity />} />
                        <Route path="/n" element={<Patientactivity />} />
                        <Route path="/a" element={<Nurseshift />} />
                        <Route path="/s" element={<Patishift />} />
                        <Route path="/n" element={<Nurseassign />} />
                        <Route path="/n" element={<Nurspatupd />} />
                        <Route path="/m" element={<Nurseactivilog />} />
                        <Route path="/f" element={<Nursetopati />} />
                        <Route path="/s" element={<Nurseactivilogpost />} />
                        <Route path="/g" element={<Nurseshiftpost />} />
                        <Route path="/a" element={<Nursereport />} />
                        <Route path="/r" element={<Patientreport />} />
                        <Route path="/d" element={<Docttonursdisch />} />
                        <Route path="/d" element={<NursetoPatidisc />} />
                        <Route path="/k" element={<Docttopatidiscinfo />} />
                        <Route path="/j" element={<Nursetopatidiscupd />} />
                        <Route path="/g" element={<Penddisc />} />
                        <Route path="/s" element={<Ipdpatireg />} />
                        <Route path="/r" element={<Ipdpatadmiss />} />
                        <Route path="/e" element={<Ipdroomallo />} />
                        <Route path="/f" element={<Ipdconsallo />} />
                        <Route path="/h" element={<Ipdassess />} />
                        <Route path="/s" element={<AdmissionList />} />
                        {/*<Route path="/admissions/:id" element={<AdmissionDetails />} />*/}
                        <Route path="/s" element={<Ipdroomdeta />} />
                        <Route path="/h" element={<Ipdassessdetail />} />
                        <Route path="/h" element={<Ipdpatiupda />} />
                        <Route path="/f" element={<Ipdroomupda />} />
                        <Route path="/" element={<Ipdassessupd />} />
                        <Route path="/" element={<Ipdconsentupda />} />
                    </Routes>
                </div>
            </Router>
       
    );
}
export default App;






//<Route path="/patient/:id" element={< Patde />} />
/*
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    *//*const handleUpload = async () => {
        if (!selectedFile) return alert('Please select a file');

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:4000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadedImage(response.data.filePath);
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };*//*
    const handleUpload = async () => {
        if (!selectedFile) return alert('Please select a file');

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:4000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // Make sure the full URL is set
            setUploadedImage(`http://localhost:4000${response.data.filePath}`);
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    return (
        <div>
            <h1>Upload and Display Image</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>

            {uploadedImage && (
                <div>
                    <h2>Uploaded Image:</h2>
                    {*//* Ensure the correct full URL is used *//*}
                    <img src={uploadedImage} alt="Uploaded" style={{ width: '300px' }} />
                </div>
            )}
        </div>
    );
};

export default App;*/

/*import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

import DoctorRegister from './components/DoctorRegister';
import DoctorLogin from './components/DoctorLogin';
import DoctorDashboard from './components/DoctorDashboard';
import Home from './components/Home';
import DoctorList from './components/DoctorList';
import DoctorDelete from './components/DoctorDelete';
import DoctorUpdate from './components/DoctorUpdate';
import { DoctorProvider } from './context/DoctorContext';
import PatientIntro from './components/PatientIntro';
import DoctorReport from './components/DoctorReport';
import BillManagement from './components/BillManagement';
import Appointments from './components/Appointments';
import Appointments2 from './components/Appointments2';
import Booking from './components/Booking';
import Booking2 from './components/Booking2';
import Bookin from './components/Bookin';
import DigitalMedicalRecordForm from './components/DigitalMedicalRecordForm';
import Digimedireco from './components/Digimedireco';
import Digimediupda from './components/Digimediupda';
import Prescrip from './components/Prescription';
import Presc from './components/Prescrip';
import Pharmac from './components/Pharmacy';
import Tele from './components/Telemedi';
import Teleup from './components/Telemediupdate';
import Teledlt from './components/Telemedidlt';
import Vieww from './front';
import Admindash from './Admin/Admindash';
import Rooms from './Admin/Rooms';
import FAQ from './Admin/FAQ';
import Faqitem from './Admin/FAQItem';
import Faqlist from './Admin/FAQList';
import Patireg from './components/PatientRegister';
import Patilist from './components/PatientList';
import Patidlt from './components/PatientDelete';
import Patiupd from './components/PatientUpdate';
import Patidet from './components/PatientDetails';
import Patidash from './Patient/Patientdash';
import DoctorIntro from './components/DoctorIntro';
import Appointdetailsma from './components/Appointdetailsma';
import Appointdetails from './components/Appointdetails';
import Appointup from './components/Appointmentup';
import Appointdel from './components/Appointdelete';
import Patlis from './components/Patilist';
import Patde from './components/Patidetail';
import BillList from './components/BillList';

import './App.css'; // Try commenting out this line temporarily
import ErrorBoundary from './components/ErrorBoundary'; // Add ErrorBoundary component

function App() {
    const navigate = useNavigate();

    // Temporarily comment out the token logic
    // useEffect(() => {
    //   setupAxiosInterceptors(navigate);
    //   const token = localStorage.getItem('token');
    //   const refreshToken = localStorage.getItem('refreshToken');
    //   if (!token || !refreshToken) {
    //     navigate('/login');
    //   }
    // }, [navigate]);

    return (
        <DoctorProvider>
            <Router>
                <div className="App">
                    <ErrorBoundary>
                        <Routes>
                            <Route path="/" element={<DoctorRegister />} />
                            <Route path="/login" element={<DoctorLogin />} />
                            <Route path="/docdash" element={<DoctorDashboard />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/doclist" element={<DoctorList />} />
                            <Route path="/docdel" element={<DoctorDelete />} />
                            <Route path="/docup" element={<DoctorUpdate />} />
                            <Route path="/patintro" element={<PatientIntro />} />
                            <Route path="/docreport" element={<DoctorReport />} />
                            <Route path="/j" element={<BillManagement />} />
                            <Route path="/ev" element={<Appointments />} />
                            <Route path="/nb" element={<Appointments2 />} />
                            <Route path="/b" element={<Booking />} />
                            <Route path="/t" element={<Booking2 />} />
                            <Route path="/bbn" element={<Bookin />} />
                            <Route path="/a" element={<DigitalMedicalRecordForm />} />
                            <Route path="/m" element={<Digimedireco />} />
                            <Route path="/mn" element={<Digimediupda />} />
                            <Route path="/naa" element={<Prescrip />} />
                            <Route path="/aq" element={<Presc />} />
                            <Route path="/mf" element={<Pharmac />} />
                            <Route path="/n" element={<Tele />} />
                            <Route path="/ko" element={<Teleup />} />
                            <Route path="/h" element={<Teledlt />} />
                            <Route path="/vie" element={<Vieww />} />
                            <Route path="/admdash" element={<Admindash />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/rooms" element={<Rooms />} />
                            <Route path="/faqlist" element={<Faqlist />} />
                            <Route path="/faqitem" element={<Faqitem />} />
                            <Route path="/nb" element={<Patireg />} />
                            <Route path="/h" element={<Patilist />} />
                            <Route path="/patidlt" element={<Patidlt />} />
                            <Route path="/aa" element={<Patiupd />} />
                            <Route path="/g" element={<Patidet />} />
                            <Route path="/paa" element={<Patidash />} />
                            <Route path="/gfd" element={<DoctorIntro />} />
                            <Route path="/ak" element={<Appointdetailsma />} />
                            <Route path="/appdetails" element={<Appointdetails />} />
                            <Route path="/appup" element={<Appointup />} />
                            <Route path="/apdlt" element={<Appointdel />} />
                            <Route path="/pn" element={<Patlis />} />
                            <Route path="/ahh" element={<Patde />} />
                            <Route path="/billlist" element={<BillList />} /> {*//* Adjusted the path *//*}
                        </Routes>
                    </ErrorBoundary>
                </div>
            </Router>
        </DoctorProvider>
    );
}

export default App;
*/

