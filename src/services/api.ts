import axios from 'axios';
import Entry from '../models/entry'; 

const API_URL = 'http://localhost:3001/employee';

export const fetchMonthlyReports = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data[0].monthlyReports;
        localStorage.setItem('monthlyReports', JSON.stringify(data[0].monthlyReports)); // Cache the data
    }
    catch (error) {
        console.error('Error fetching data: ', error);
    }
};

/*export const updateEntry = async (entry: Entry) => {
    const url = `${API_URL}/${entry.date}`; 
    try {
        await axios.put(url, entry);
    }
    catch (error) {
        console.error('Error updating entry: ', error);
    }
}; */

export const updateEntry = (entry: Entry) => {
    // Retrieve the data from localStorage
    const data = localStorage.getItem('monthlyReports');
    if (data) {
        const reports = JSON.parse(data);
        const month = entry.date.slice(0, 7); // Extract YYYY-MM from date

        if (!reports[month]) {
            reports[month] = [];
        }

        // Find existing entry
        const index = reports[month].findIndex((e: Entry) => e.date === entry.date);

        if (index > -1) {
            // Update existing entry
            reports[month][index] = entry;
        } else {
            // Add new entry
            reports[month].push(entry);
        }

        // Save updated data back to localStorage
        localStorage.setItem('monthlyReports', JSON.stringify(reports));
        console.log('Entry updated successfully in localStorage.');
    } else {
        console.error('No monthly reports found in localStorage.');
    }
};


export {};