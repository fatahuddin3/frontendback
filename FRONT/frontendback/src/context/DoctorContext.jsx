/*// src/context/DoctorContext.js
import { createContext, useState } from 'react';

const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
    const [doctor, setDoctor] = useState(null);
    const [token, setToken] = useState(null);

    return (
        <DoctorContext.Provider value={{ doctor, setDoctor, token, setToken }}>
            {children}
        </DoctorContext.Provider>
    );
};

export { DoctorContext, DoctorProvider };
*/
import { createContext, useState } from 'react';

const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
    const [doctor, setDoctor] = useState(null);
    const [token, setToken] = useState(null);

    return (
        <DoctorContext.Provider value={{ doctor, setDoctor, token, setToken }}>
            {children}
        </DoctorContext.Provider>
    );
};

export { DoctorContext, DoctorProvider };
