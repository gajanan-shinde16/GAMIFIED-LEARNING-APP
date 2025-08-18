import React from 'react';

/**
 * A simple functional component for the site footer.
 * It displays the copyright information.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} LearnSphere. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;