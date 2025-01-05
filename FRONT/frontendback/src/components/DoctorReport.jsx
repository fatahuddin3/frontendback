import React, { useState, useEffect } from 'react';
import { getReport } from '../services/doctorService';

import '../css/DoctorReport.css';  // Assuming we have a CSS file for styling

const DoctorReport = () => {
    const [report, setReport] = useState(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjUzMzJhMTA5ZmI5ZGNjOTY0YTM5NiIsImlhdCI6MTcyNzM0NTQ1MSwiZXhwIjoxNzI5OTM3NDUxfQ.roWiHSTElm4ZxZQPr4Od1iaCgcZ5M6KU2oJ9PsZ0IPc';  // Use the correct token
 

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getReport(token);
                setReport(response.data);
            } catch (error) {
                console.error('Error fetching report:', error);
                alert('Error fetching report data');
            }
        };

        fetchReport();
    }, [token]);

    if (!report) {
        return <p>Loading report...</p>;
    }

    return (
        <div className="doctor-report">
            <h2>Doctor Report Dashboard</h2>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Total Doctors Registered</th>
                        <th>Doctors Added</th>
                        <th>Doctors Updated</th>
                        <th>Doctors Deleted</th>
                        <th>Percentage Added</th>
                        <th>Percentage Updated</th>
                        <th>Percentage Deleted</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{report.totalDoctorsRegistered}</td>
                        <td>{report.totalDoctorsAdded}</td>
                        <td>{report.totalDoctorsUpdated}</td>
                        <td>{report.totalDoctorsDeleted}</td>
                        <td>{report.percentageAdded}</td>
                        <td>{report.percentageUpdated}</td>
                        <td>{report.percentageDeleted}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DoctorReport;
