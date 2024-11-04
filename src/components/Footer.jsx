import React from 'react';
import '../css/footer.css'; // Link to your CSS file for styling
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer_head">
        {/* left logo */}
        <div className="footer_title">
            AMCB
        </div>
        {/* right navbar */}
        <div className="mr-52">
            <ul className='footer_navbar'>
                <li> HOME </li>
                <li> SHOP </li>
                <li> ABOUT </li>
                <li> CART </li> 
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Name" required="" />
                    <label for="name" className="form__label">EMAIL</label>
                </div>
            </ul>
        </div>
      </div>
      <div className="seconddiv_footer">
        {/* nav-list row */}
        <div className="">
        <ul className="row-navlist">
            <li> SHIPPING </li>
            <li> REFUND POLICY </li>
            <li> RETURNS </li>
            <li> LOGIN </li>
            <li> TERMS OF SERVICES </li>
            <li> PRIVACY POLICY </li>
        </ul>
        </div>
        {/* Social Media Icons */}
      <div className="footer-social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaTwitter />
        </a>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
