import "./HomePageFooter.css";

function HomePageFooter() {
  return (
    <div className="home-page-footer">
      <div className="home-page-about">
        <a
          href="https://github.com/AZensky/RobinhoodClone"
          className="source-code"
        >
          <p>Source Code</p>
        </a>
        <a href="https://github.com/AZensky/RobinhoodClone">
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
      <div className="connect-with-us-container">
        <p className="connect-with-us">Connect with us!</p>
        <div className="linkedin-container">
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

export default HomePageFooter;
