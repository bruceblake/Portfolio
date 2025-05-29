import React from 'react';
import './Summary.css';

const Summary = () => {
  return (
    <section className="summary-section">
      <div className="summary-content">
        <p className="summary-text">
          Full-stack engineer with experience at <strong>Google</strong> building scalable systems that serve <strong>2.5M+ users</strong>. 
          Proven track record of delivering revenue-generating solutions, including an AI phone system that generated <strong>$15k+ in 3 months</strong>. 
          Comfortable across the entire stack from low-level C++ game engines to cloud-native AI services. 
          Currently pursuing B.S. in Computer Engineering at Virginia Tech with <strong>3.85 GPA</strong>.
        </p>
        
        <div className="summary-highlights">
          <div className="highlight-item">
            <span className="highlight-number">2.5M+</span>
            <span className="highlight-label">Monthly Users</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">$15K+</span>
            <span className="highlight-label">Revenue Generated</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">3.85</span>
            <span className="highlight-label">GPA</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-number">2x</span>
            <span className="highlight-label">Google Intern</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;