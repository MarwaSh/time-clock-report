import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MonthlyReportTable from '../components/MonthlyReportTable';
import Entry from '../models/entry';

describe('MonthlyReportTable', () => {
    const mockEntries: Entry[] = [
        { date: '2024-01-01', start: '09:00', end: '17:00', hours: 8 },
        { date: '2024-01-02', start: '09:00', end: '17:00', hours: 8 },
    ];

    const mockEditStartTime = jest.fn();
    const mockEditEndTime = jest.fn();

    it('should render table correctly', () => {
        const { getByText } = render(
            <MonthlyReportTable 
                entries={mockEntries} 
                onEditStartTime={mockEditStartTime} 
                onEditEndTime={mockEditEndTime} 
            />
        );

        expect(getByText('2024-01-01')).toBeInTheDocument();
        expect(getByText('2024-01-02')).toBeInTheDocument();
    });

    it('should call onEditStartTime when start time is changed', () => {
        const { getAllByRole } = render(
            <MonthlyReportTable 
                entries={mockEntries} 
                onEditStartTime={mockEditStartTime} 
                onEditEndTime={mockEditEndTime} 
            />
        );

        const startTimeInputs = getAllByRole('textbox');
        fireEvent.change(startTimeInputs[0], { target: { value: '08:00' } });

        expect(mockEditStartTime).toHaveBeenCalledWith('08:00', '2024-01-01');
    });

    it('should call onEditEndTime when end time is changed', () => {
        const { getAllByRole } = render(
            <MonthlyReportTable 
                entries={mockEntries} 
                onEditStartTime={mockEditStartTime} 
                onEditEndTime={mockEditEndTime} 
            />
        );

        const endTimeInputs = getAllByRole('textbox');
        fireEvent.change(endTimeInputs[1], { target: { value: '16:00' } });

        expect(mockEditEndTime).toHaveBeenCalledWith('16:00', '2024-01-01');
    });
});

