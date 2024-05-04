import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import MonthlyReports from '../components/MonthlyReports';
import { fetchMonthlyReports } from '../services/api';

//jest.mock('../services/api');

/*const mockReports = {
    "2024-01": [
        { date: '2024-01-01', start: '09:00', end: '17:00', hours: 8 },
        { date: '2024-01-02', start: '09:00', end: '17:00', hours: 8 }
    ],
    "2024-02": [
        { date: '2024-02-01', start: '09:00', end: '17:00', hours: 8 }
    ]
};

beforeAll(() => {
    (fetchMonthlyReports as jest.Mock).mockResolvedValue(mockReports);
});*/

describe('MonthlyReports', () => {
    const renderComponent = async () => {
        render(<MonthlyReports />);
        await waitFor(() => screen.getByText('2024-01-01'));
    };

    it('should render and display entries for the selected month', async () => {
        await renderComponent();
        expect(screen.getByText('2024-01-01')).toBeInTheDocument();
        expect(screen.getByText('2024-01-02')).toBeInTheDocument();
      });

    it('should show error for invalid time format', async () => {
        await renderComponent();
        fireEvent.change(screen.getAllByRole('textbox')[0], {
            target: { value: 'invalid' }
        });
        expect(screen.getByText(/invalid start time/i)).toBeInTheDocument();
    });
});
