import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Entry from '../models/entry';

/**
 * Properties for the MonthlyReportTable component.
 */
interface MonthlyReportTableProps {
    entries: Entry[];
    onEditStartTime: (startTime: string, date: string) => void;
    onEditEndTime: (endTime: string, date: string) => void;
}

/**
 * MonthlyReportTable component displays a table of monthly reports.
 * It shows the date, worked hours, start time, and end time for each entry.
 * The component also allows for editing of the start and end times.
 *
 * @param {MonthlyReportTableProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered table.
 */
const MonthlyReportTable: React.FC<MonthlyReportTableProps> = ({ entries, onEditStartTime, onEditEndTime }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Worked Hours</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entries.map((entry) => (
                        <TableRow key={entry.date}>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell>{entry.hours}</TableCell>
                            <TableCell>
                                <TextField
                                    value={entry.start}
                                    onChange={(e) => onEditStartTime(e.target.value, entry.date)}
                                />
                                </TableCell>
                            <TableCell>
                            <TextField
                                    value={entry.end}
                                    onChange={(e) => onEditEndTime(e.target.value, entry.date)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MonthlyReportTable;
