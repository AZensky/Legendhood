import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content-container">
        <p className="footer-disclaimer">
          This website is a clone of Robinhood. It is meant for demo purposes
          only. Please do not use this information for financial decisions.
          There is no real money used in this application.
        </p>
        <p className="dashboard-footer-connect">Connect With Us!</p>
        <div className="footer-linkedin-icons-container">
          <div className="individual-linkedin">
            <a
              href="https://www.linkedin.com/in/fangru-zhou-6937934a/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <p className="developer-name">Fangru Zhou</p>
          </div>
          <div className="individual-linkedin">
            <a
              href="https://www.linkedin.com/in/alex-zelinsky/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <p className="developer-name">Alex Zelinsky</p>
          </div>
          <div className="individual-linkedin">
            <a
              href="https://www.linkedin.com/in/zeus-ronzan-b26313104/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <p className="developer-name">Zeus Ronzan</p>
          </div>
          <div className="individual-linkedin">
            <a
              href="https://www.linkedin.com/in/yuehuang22/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <p className="developer-name">Yue Huang</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
