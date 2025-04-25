# ThreatShield - Advanced Threat Analysis Dashboard

A modern threat analysis dashboard with a comprehensive sidebar navigation system and multiple detection capabilities including text, audio, image, deepfake, and URL analysis.

## Features

- Analyze text for threats, misinformation, or harmful content
- Scan images for manipulated content or inappropriate material
- Check audio files for synthetic voice generation or manipulation
- Detect deepfakes in videos and images
- Analyze URLs for phishing attempts or malware
- Modern UI with loading animations and responsive design

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Flask (Python)
- **UI Libraries**: Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+ (for backend)

### Installation

1. Clone the repository
2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

### Running the Application

1. Start the frontend development server:

```bash
npm run dev
```

2. Start the Flask backend:

```bash
cd backend
python app.py
```

The application will be available at http://localhost:5173

## Project Structure

- `/src` - React frontend code
  - `/components` - UI components
  - `/components/analyzers` - Analysis type components
  - `/components/ui` - Reusable UI components
  - `/services` - API service and mock data
  - `/utils` - Utility functions
- `/backend` - Flask backend code

## Integration Information

This application is designed to integrate with an external "grock" service for actual threat analysis processing. The current implementation includes mock services that simulate the behavior of the actual analysis engine.