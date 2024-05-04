import React, { useEffect, useState } from 'react';
import { Grid, TextField, MenuItem, Typography } from '@mui/material';
import Entry from '../models/entry';
import  { fetchMonthlyReports } from '../services/api';
import MonthlyReportTable from './MonthlyReportTable';
  
/**
 * Interface representing a monthly report.
 */

interface MonthlyReport {
    [key: string]: Entry[];
  }

  /**
 * The MonthlyReports component displays a monthly report of entries.
 * It provides functionality to edit the start and end times of entries,
 * and calculates the hours worked. The component also provides filtering
 * and validation for the input times.
 *
 * @returns {JSX.Element} The rendered MonthlyReports component.
 */

  const MonthlyReports: React.FC = () => {
    const [entries, setEntries] = useState<MonthlyReport>({});
    const [filteredEntries, setFilteredEntries] = useState<MonthlyReport>({});
    const [selectedMonth, setSelectedMonth] = useState<string>('2024-01');
    const [filterValue, setFilterValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchMonthlyReports();
            setEntries(data);
            localStorage.setItem('monthlyReports', JSON.stringify(data)); // Cache the data
            setIsLoading(false);
        };        

        const cachedData = localStorage.getItem('monthlyReports');
        if (cachedData !== null && cachedData !== "undefined") {
            const parsedData = JSON.parse(cachedData);
            setEntries(JSON.parse(cachedData));
            setSelectedMonth(Object.keys(parsedData)[0] || '');
            setIsLoading(false);
        } else {
            fetchData(); // Fetch data if no cache is available
        }
      }, []);

      useEffect(() => {
        if (selectedMonth && entries[selectedMonth]) {
          setFilteredEntries({ [selectedMonth]: entries[selectedMonth] });
        } else {
            setFilteredEntries({});
        }
      }, [selectedMonth, entries]);

      useEffect(() => {
        if (!filterValue) {
          setFilteredEntries(entries);
        } else {
          const filtered: MonthlyReport = {};
          Object.entries(entries).forEach(([month, monthlyEntries]) => {
            const filteredMonthEntries = monthlyEntries.filter((entry) =>
              entry.date.includes(filterValue)
            );
            if (filteredMonthEntries.length > 0) {
              filtered[month] = filteredMonthEntries;
            }
          });
          setFilteredEntries(filtered);
        }
      }, [filterValue, entries]);

      const handleMonthSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(event.target.value);
      };

    /**
     * Handles the editing of the start time of an entry.
     * 
     * @param {string} startTime The new start time.
     * @param {string} date The date of the entry being edited.
     */

      const handleEditStartTime = (startTime: string, date: string) => {
        if (!validateTime(startTime)) {
            setError("Invalid start time format. Expected format: HH:MM");
            return;
        }
        const updatedEntries = { ...entries };
        if (updatedEntries[selectedMonth]) {
            updatedEntries[selectedMonth] = updatedEntries[selectedMonth].map((entry) => {
                if (entry.date === date) {
                    entry.start = startTime;
                    entry.hours = calculateHoursWorked(entry.start, entry.end);
                    //updateEntry(entry); // Update entry on the server
                }
                return entry;
            });
            setEntries(updatedEntries);
            localStorage.setItem('monthlyReports', JSON.stringify(updatedEntries));
        }
        setError(null);
    };
    
     /**
     * Handles the editing of the end time of an entry.
     * 
     * @param {string} endTime The new end time.
     * @param {string} date The date of the entry being edited.
     */
    const handleEditEndTime = (endTime: string, date: string) => {
        if (!validateTime(endTime)) {
            setError("Invalid start time format. Expected format: HH:MM");
            return;
        }
        
        const updatedEntries = { ...entries };
        if (updatedEntries[selectedMonth]) {
            updatedEntries[selectedMonth] = updatedEntries[selectedMonth].map((entry) => {
                if (entry.date === date) {
                    entry.end = endTime;
                    entry.hours = calculateHoursWorked(entry.start, entry.end);
                    //updateEntry(entry);
                }
                return entry;
            });
            setEntries(updatedEntries);
            localStorage.setItem('monthlyReports', JSON.stringify(updatedEntries));
        }
        setError(null);
    };

    /**
     * Calculates the hours worked between two times.
     * 
     * @param {string} start The start time.
     * @param {string} end The end time.
     * @returns {number} The hours worked.
     */
      const calculateHoursWorked = (start: string, end: string) => {
        const startTime = new Date(`2022-01-01T${start}`);
        const endTime = new Date(`2022-01-01T${end}`);
        const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        return Math.round(hours * 10) / 10;
      };

    /**
     * Validates the format of a time string.
     * 
     * @param {string} time The time string to validate.
     * @returns {boolean} True if the time is valid, otherwise false.
     */
      const validateTime = (time: string) => {
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timePattern.test(time);
    };
  
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              select
              label="Select Month"
              value={selectedMonth}
              onChange={handleMonthSelectChange}
              variant="outlined"
              fullWidth
            >
              {Object.keys(entries).map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {error && (
                <Grid item xs={12}>
                    <Typography color="error">{error}</Typography>
                </Grid>
            )}
          {Object.entries(filteredEntries).map(([month, monthlyEntries]) => (
            <Grid item xs={12} key={month}>
              <h3>{month}</h3>
                <MonthlyReportTable entries={monthlyEntries} onEditStartTime={handleEditStartTime} onEditEndTime={handleEditEndTime} />
            </Grid>
          ))}
        </Grid>
      );
    };


export default MonthlyReports;
