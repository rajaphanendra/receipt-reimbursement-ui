# Receipt Reimbursement - Angular Frontend

## Overview
This is the Angular 19 frontend for the Receipt Reimbursement System. It provides a user-friendly interface for submitting and viewing reimbursement requests. The application communicates with a .NET Web API backend and is containerized using Docker for easy orchestration.

---

## Tech Stack
- **Framework:** Angular 19
- **Package Manager:** npm
- **Styling:** Bootstrap 5
- **Containerization:** Docker

---

## Folder Structure
```
receipt-reimbursement-ui/
├── src/                   # Main source code folder
│   ├── app/               # Angular components and services
│   ├── assets/            # Static files
│   ├── environments/      # Environment configs
│   ├── index.html         # Main HTML file
│   └── main.ts            # App entry point
├── Dockerfile             # Docker build file
├── angular.json           # Angular CLI config
├── package.json           # NPM dependencies
└── README.md              # Project documentation
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server

To start a local development server, run:

```bash
ng serve
```
or 

```bash
npm start
```
The npm start will run ng serve which will defined the scripts. 
Runs the app in development mode. Navigate to `http://localhost:4200`.

### 3. Production Build
```bash
npm run build -- --configuration production
```
This will output the production files into:
```
dist/receipt-reimbursement-ui
```

### 4. Run via Docker
Ensure you have a production build before running:
```bash
npm run build -- --configuration production
```

Then build and run the Docker container:
```bash
docker build -t receipt-frontend .
docker run -p 4200:80 receipt-frontend
```
The application will be available at `http://localhost:4200`

---

## Environment
No `.env` file is needed specifically for Angular.
All environment configurations are defined in:
```
src/environments/environment.ts
```
Make sure the API base URL matches your backend:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5267/api'
};
```

---

## API Integration
This frontend connects to the backend endpoints:
- **Submit Receipt:** `POST /api/Receipt`
- **Get All Receipts:** `GET /api/Receipt`
- **View Receipt File:** Triggered on clicking "View" in the table (opens/downloads file)

---

## Notes
- Ensure the backend API is running on the expected port (`http://localhost:5267`) before using the frontend.
- The production build should be re-run if you make any frontend changes before Dockerizing.

- This frontend is part of a full-stack application and is intended to be deployed alongside the backend and SQL Server using Docker Compose.