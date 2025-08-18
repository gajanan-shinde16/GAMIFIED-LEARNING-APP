import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';


// Create the root of the React application, targeting the 'root' div in index.html.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application.
root.render(
  <React.StrictMode>
    {/*
      Wrap the entire App component with the AuthProvider.
      This makes the authentication context (user, login, logout, etc.)
      available to any component inside the App tree via the useAuth() hook.
    */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();