# QR Intern Logger - React + Spring Boot

A modern, full-stack QR code-based intern attendance logging system built with React frontend and Java Spring Boot backend.

## Features

- **QR Code Generation**: Automatic QR code generation for each intern
- **QR Code Scanning**: Camera-based and manual QR code scanning
- **Real-time Notifications**: Email alerts to CSO and interns
- **Visitor Management**: Separate system for visitor registration
- **Modern UI**: Responsive React frontend with beautiful design
- **Data Export**: CSV export functionality for logs and records
- **Admin Dashboard**: Comprehensive admin panel with statistics

## Architecture

### Frontend (React)
- **Framework**: React 18 with React Router
- **Styling**: Custom CSS with modern design
- **HTTP Client**: Axios for API communication
- **Notifications**: React Toastify for user feedback
- **Icons**: React Icons for UI elements

## Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

## Installation & Setup

### Frontend Setup

`bash
cd frontend
npm install
npm start
`

The frontend will start on http://localhost:3000

## Configuration

### Frontend Configuration

The frontend is configured to proxy API requests to http://localhost:8080 (see package.json).

## Usage

### Admin Panel Features

1. **Dashboard**: Overview of statistics and quick actions
2. **Register Intern**: Add new interns with automatic QR code generation
3. **View Interns**: List all interns with QR code download option
4. **Entry Logs**: View and export attendance logs
5. **QR Scanner**: Scan QR codes for attendance logging
6. **Visitor Management**: Register and view visitor records

## UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Gradient backgrounds and smooth animations
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Visual feedback during API calls
- **Form Validation**: Client-side validation with error messages
- **Export Functionality**: CSV export for data analysis

## Deployment

### Frontend Deployment
`bash
npm run build
# Deploy the 'build' folder to your web server
`

## Development

### Running in Development Mode

1. Run frontend: 
npm start
2. Access application at http://localhost:3000

### Project Structure

`
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   └── App.js          # Main app component
├── public/
└── package.json
`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- React library
- React Icons
- React Toastify
- Axios

## Demo & Backend

- **Project demo (video):** https://drive.google.com/file/d/1H9WWz6Wkrz_bA-Wnezq2ffdu3e2pjgIa/view?usp=drive_link
- **Backend repository:** https://github.com/UdaykumarAngari/QR-InternLogger-Backend.git
