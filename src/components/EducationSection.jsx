import React from 'react';
import './EducationSection.css';

const EducationSection = () => {
  return (
    <section className="resume-section">
      <h2 className="section-title">Education</h2>
      
      <div className="education-content">
        <div className="education-item">
          <h3 className="education-degree">Bachelor of Science in Computer Engineering</h3>
          <div className="education-school">Virginia Tech</div>
          <div className="education-details">
            <div className="education-period">Expected: May 2027</div>
            <div className="education-gpa">GPA: 3.85/4.0</div>
          </div>
          
          <div className="education-highlights">
            <h4 className="highlights-title">Relevant Coursework:</h4>
            <ul className="coursework-list">
              <li>Data Structures & Algorithms</li>
              <li>Computer Architecture</li>
              <li>Operating Systems</li>
              <li>Software Engineering</li>
              <li>Machine Learning</li>
              <li>Database Systems</li>
            </ul>
          </div>
          
          <div className="education-highlights">
            <h4 className="highlights-title">Academic Achievements:</h4>
            <ul className="achievements-list">
              <li>Dean's List (All Semesters)</li>
              <li>Member of ACM Student Chapter</li>
              <li>Hackathon Winner - VTHacks 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;