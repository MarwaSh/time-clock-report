# Monthly Reports Application

This project is a simple React application that displays and manages monthly reports for employees. It allows users to view, filter, and edit the working hours, start time, and end time for each entry. The application demonstrates how to handle state management, user input, and data validation using React and Material-UI components.

## Components

### 1. MonthlyReports

#### Description

The `MonthlyReports` component displays a list of monthly reports for an employee. It provides functionality to:

1. **Select a Month**: Allows the user to select a specific month to view the reports.
2. **Filter by Date**: Filters the reports based on the selected date.
3. **Edit Start and End Time**: Allows the user to edit the start and end times of each entry, and calculates the hours worked accordingly.
4. **Validate Input**: Validates the time input to ensure it is in the correct format.

#### Props

This component does not receive any props.

#### Functions

1. **`fetchData`**: Fetches the monthly reports from the server or cache.
2. **`handleMonthSelectChange`**: Handles changes to the selected month.
3. **`handleEditStartTime`**: Handles editing the start time for an entry.
4. **`handleEditEndTime`**: Handles editing the end time for an entry.
5. **`calculateHoursWorked`**: Calculates the hours worked between a start and end time.
6. **`validateTime`**: Validates the format of a time string.

### 2. MonthlyReportTable

#### Description

The `MonthlyReportTable` component displays a table of entries for a specific month. It shows the:

1. **Date**: The date of the entry.
2. **Worked Hours**: The hours worked for that entry.
3. **Start Time**: The start time for that entry.
4. **End Time**: The end time for that entry.

#### Props

1. **`entries`**: An array of entry objects representing the data for the table.
2. **`onEditStartTime`**: A function to handle changes to the start time of an entry.
3. **`onEditEndTime`**: A function to handle changes to the end time of an entry.

#### Functions

1. **`MonthlyReportTable`**: The functional component that renders the table.

## Installation

To run this application locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/MarwaSh/time-clock-report.git

2. **Navigate to the Project Directory:
   ```bash
   cd time-clock-report
3. **Install Dependencies:
   ````bash
   npm install
4. **Start the Application:
   ````bash
   npm start


Usage
   Select Month: Use the dropdown to select the month for which you want to view the reports.
   Edit Times: Use the time inputs to edit the start and end times for each entry.
   Filter by Date: Use the text input to filter the entries by date.
   Validation
   Time Format: The application validates the time input to ensure it is in the format HH:MM.
   Hours Calculation: The application automatically calculates the hours worked based on the start and end times.
   Technologies Used
   React: The UI library used to build the application.
   Material-UI: The component library used for styling and UI components.
   JavaScript: The programming language used for the application logic.

   Acknowledgements
React
Material-UI

### Summary

This README provides an overview of the project, describes the key components, offers installation and usage instructions, details the validation logic, and lists the technologies used.






