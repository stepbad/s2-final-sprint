import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <footer>
    <div className="social-links">
      <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </a>
      <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
    </div>
    <p>&copy; 2024 FitFab. All rights reserved.</p>
  </footer>
);

export default Footer;
