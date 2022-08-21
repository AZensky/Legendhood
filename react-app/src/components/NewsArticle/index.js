import React from "react";
import "./NewsArticle.css";

function NewsArticle({ headline, image, summary, url, source }) {
  return (
    <div className="news-article-container">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-article-link"
      >
        <span className="news-article-source">{source}</span>

        {/* News Article Title and Content */}
        <div className="news-article-title-summary-img-container">
          <div className="news-article-title-summary">
            <p>{headline}</p>
            <p className="news-article-summary">{summary}</p>
          </div>
          <img src={image} alt="News Cover" className="news-article-img" style={{visibility: `${image.length > 0? "visible": "hidden"}`}}/>
        </div>
      </a>
    </div>
  );
}

export default NewsArticle;
