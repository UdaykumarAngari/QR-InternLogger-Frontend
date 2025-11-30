    # QR Intern Logger - React + Spring Boot

    A modern, full-stack QR code-based intern attendance logging system built with React frontend and Java Spring Boot backend.

    ##  Features

    - **QR Code Generation**: Automatic QR code generation for each intern
    - **QR Code Scanning**: Camera-based and manual QR code scanning
    - **Real-time Notifications**: Email alerts to CSO and interns
    - **Visitor Management**: Separate system for visitor registration
    - **Modern UI**: Responsive React frontend with beautiful design
    - **Data Export**: CSV export functionality for logs and records
    - **Admin Dashboard**: Comprehensive admin panel with statistics

    ````markdown
    # QR Intern Logger - React + Spring Boot

    A modern, full-stack QR code-based intern attendance logging system built with React frontend and Java Spring Boot backend.

    ##  Features

    - **QR Code Generation**: Automatic QR code generation for each intern
    - **QR Code Scanning**: Camera-based and manual QR code scanning
    - **Real-time Notifications**: Email alerts to CSO and interns
    - **Visitor Management**: Separate system for visitor registration
    - **Modern UI**: Responsive React frontend with beautiful design
    - **Data Export**: CSV export functionality for logs and records
    - **Admin Dashboard**: Comprehensive admin panel with statistics

    ## Architecture

    ### Backend (Spring Boot)
    - **Framework**: Spring Boot 3.2.0
    - **Database**: MySQL with JPA/Hibernate
    - **Security**: Input validation and error handling
    - **Email**: SMTP integration for notifications
    - **QR Code**: ZXing library for QR code generation

    ### Frontend (React)
    - **Framework**: React 18 with React Router
    - **Styling**: Custom CSS with modern design
    - **HTTP Client**: Axios for API communication
    - **Notifications**: React Toastify for user feedback
    - **Icons**: React Icons for UI elements

    ## Prerequisites

    - Java 17 or higher
    - Node.js 16 or higher
    - PostgreSQL 8.0 or higher
    - Maven 3.6 or higher

    ## 🛠️ Installation & Setup

    ### 1. Database Setup

    ```sql
    CREATE DATABASE IF NOT EXISTS intern_db;
    USE intern_db;

    CREATE TABLE interns (
        intern_id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        aadhaar_number VARCHAR(12) UNIQUE,
        mobile_number VARCHAR(15),
        auth_code VARCHAR(64)
    );

    CREATE TABLE entry_logs (
        log_id INT AUTO_INCREMENT PRIMARY KEY,
        intern_id VARCHAR(20),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'entered',
        FOREIGN KEY (intern_id) REFERENCES interns(intern_id)
    );

    CREATE TABLE new_comers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        visitor_id VARCHAR(50) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(15),
        aadhaar VARCHAR(20),
        purpose TEXT,
        entry_time DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    ```

    ### 2. Backend Setup

    ```bash
    cd backend
    mvn clean install
    mvn spring-boot:run
    ```

    The backend will start on `http://localhost:8080`

    ### 3. Frontend Setup

    ```bash
    cd frontend
    npm install
    npm start
    ```

    The frontend will start on `http://localhost:3000`

    ## 🔧 Configuration

    ### Backend Configuration (`application.properties`)

    ```properties
    # Database Configuration
    spring.datasource.url=jdbc:postgresql://localhost:5432/intern_db
    spring.datasource.username=postgres
    spring.datasource.password=postgres
    spring.datasource.driver-class-name=org.postgresql.Driver

    # Email Configuration
    spring.mail.host=smtp.gmail.com
    spring.mail.port=587
    spring.mail.username=your_email@gmail.com
    spring.mail.password=your_app_password
    ```

    ### Frontend Configuration

    The frontend is configured to proxy API requests to `http://localhost:8080` (see `package.json`).

    ## 📱 Usage

    ### Admin Panel Features

    1. **Dashboard**: Overview of statistics and quick actions
    2. **Register Intern**: Add new interns with automatic QR code generation
    3. **View Interns**: List all interns with QR code download option
    4. **Entry Logs**: View and export attendance logs
    5. **QR Scanner**: Scan QR codes for attendance logging
    6. **Visitor Management**: Register and view visitor records

    ### API Endpoints

    #### Intern Management
    - `POST /api/interns/register` - Register new intern
    - `GET /api/interns` - Get all interns
    - `GET /api/interns/{internId}` - Get specific intern
    - `GET /api/interns/{internId}/qr-code` - Download QR code

    #### Entry Logging
    - `GET /api/log-entry?auth_code={code}` - Log entry using QR code
    - `GET /api/entry-logs` - Get all entry logs
    - `GET /api/entry-logs/{internId}` - Get logs for specific intern

    #### Visitor Management
    - `POST /api/new-comers` - Register new visitor
    - `GET /api/new-comers` - Get all visitors
    - `GET /api/new-comers/{id}` - Get specific visitor

    ## 🔒 Security Features

    - Input validation on all forms
    - SQL injection prevention through JPA
    - CORS configuration for API access
    - Email validation and format checking
    - Unique constraint validation

    ##  Email Notifications

    The system sends automatic email notifications for:

    - **Intern Registration**: QR code sent to intern's email
    - **Entry Logging**: Success/failure alerts sent to CSO
    - **Visitor Registration**: New visitor notifications sent to CSO

    ## UI/UX Features

    - **Responsive Design**: Works on desktop, tablet, and mobile
    - **Modern Styling**: Gradient backgrounds and smooth animations
    - **Toast Notifications**: Real-time feedback for user actions
    - **Loading States**: Visual feedback during API calls
    - **Form Validation**: Client-side validation with error messages
    - **Export Functionality**: CSV export for data analysis

    ## Deployment

    ### Backend Deployment
    ```bash
    mvn clean package
    java -jar target/qr-intern-logger-0.0.1-SNAPSHOT.jar
    ```

    ### Frontend Deployment
    ```bash
    npm run build
    # Deploy the 'build' folder to your web server
    ```

    ## 🔧 Development

    ### Running in Development Mode

    1. Start MySQL database
    2. Run backend: `mvn spring-boot:run`
    3. Run frontend: `npm start`
    4. Access application at `http://localhost:3000`

    ### Project Structure

    ```
    qr-intern-logger/
    ├── backend/
    │   ├── src/main/java/com/matwhiz/qrinternlogger/
    │   │   ├── controller/     # REST controllers
    │   │   ├── entity/         # JPA entities
    │   │   ├── repository/     # Data repositories
    │   │   ├── service/        # Business logic
    │   │   └── dto/           # Data transfer objects
    │   └── src/main/resources/
    │       └── application.properties
    ├── frontend/
    │   ├── src/
    │   │   ├── components/     # Reusable components
    │   │   ├── pages/         # Page components
    │   │   └── App.js         # Main app component
    │   └── public/
    └── README.md
    ```

    ##  Contributing

    1. Fork the repository
    2. Create a feature branch
    3. Make your changes
    4. Test thoroughly
    5. Submit a pull request

    ##  License

    This project is licensed under the MIT License.

    ##  Acknowledgments

    - Spring Boot framework
    - React library
    - ZXing QR code library
    - React Icons
    - React Toastify

    ## Demo & Backend

    - **Project demo (video):** https://drive.google.com/file/d/1H9WWz6Wkrz_bA-Wnezq2ffdu3e2pjgIa/view?usp=drive_link
    - **Backend repository:** https://github.com/UdaykumarAngari/QR-InternLogger-Backend.git
    ````
