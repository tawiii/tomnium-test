import React from 'react';

const Footer = (props) =>(
  <footer className="footer">
    <div className="ui container">
      <p className="text-center">&copy;
        {' '} {new Date().getFullYear()} {' '}
        <a href="https://tomnium.com/">Tomnium</a></p>
      </div>
    </footer>
  )

  export default Footer;
