# Inspection App

## Overview

The Inspection App is a comprehensive tool designed to facilitate the recording, editing, deletion, and retrieval of inspection records. It offers functionalities for both desktop and web usage, providing flexibility in deployment. The app ensures efficient management of inspection data and enables users to download records in XLSx format for further analysis. Additionally, a search feature is implemented to streamline the retrieval process.

## Installation and Usage

### Desktop App

1. **Installation:**
    - Install Electron:
        ```
        npm install electron
        ```
    - Install Electron Builder:
        ```
        npm install electron-builder --save-dev
        ```

2. **Run and Compile:**
    - To run the desktop app, execute the following command in the terminal:
        ```
        electron main.js
        ```
    - To compile the app to .exe format:
        ```
        npm run build
        ```

### Web App

1. **Run Frontend:**
    - Navigate to the client directory:
        ```
        cd client
        ```
    - Install dependencies:
        ```
        npm install
        ```
    - Start the frontend server:
        ```
        npm run dev
        ```

2. **Run Backend:**
    - Navigate to the server directory:
        ```
        cd server
        ```
    - Start the backend server:
        ```
        python app.py
        ```

## Features

- **Record Management:**
    - Add, edit, and delete inspection records with ease.
- **Download Records:**
    - Export inspection records in XLSx format for offline access and analysis.
- **Search Functionality:**
    - Quickly search for specific records using the search feature.

## Current Bugs


- **Input Box Issues:**
    - Occasionally, input boxes may malfunction during runtime in the Electron.js desktop app.
- **Server Errors:**
    - Some server errors occur in the desktop app, impacting its functionality.
- ---> These following bugs persist in desktop app only.
