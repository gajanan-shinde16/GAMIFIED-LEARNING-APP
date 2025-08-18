import React from 'react';
import './Spinner.css';

/**
 * A simple loading spinner component.
 * It is used to indicate that a process is running in the background,
 * such as fetching data from an API.
 */
const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;