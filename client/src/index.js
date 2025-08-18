import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the entire App component with the AuthProvider.
      Now, any component inside App can access the authentication context
      using the useAuth() hook.
    */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
