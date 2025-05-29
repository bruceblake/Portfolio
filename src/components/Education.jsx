import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import './Education.css';

const Education = ({ portfolioData }) => {
  const education = portfolioData?.education || [];

  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        
        <div className="education-grid">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-icon">
                <GraduationCap size={32} />
              </div>
              
              <div className="education-content">
                <h3 className="education-degree">{edu.degree}</h3>
                <h4 className="education-school">{edu.school}</h4>
                
                <div className="education-meta">
                  <span className="meta-item">
                    <Calendar size={16} />
                    {edu.startDate} - {edu.endDate}
                  </span>
                  <span className="meta-item">
                    <MapPin size={16} />
                    {edu.location}
                  </span>
                </div>
                
                {edu.gpa && (
                  <div className="education-gpa">
                    <strong>GPA:</strong> {edu.gpa}
                  </div>
                )}
                
                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <div className="education-courses">
                    <h5>
                      <BookOpen size={16} />
                      Relevant Coursework
                    </h5>
                    <div className="courses-grid">
                      {edu.relevantCourses.map((course, idx) => (
                        <span key={idx} className="course-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {edu.activities && edu.activities.length > 0 && (
                  <div className="education-activities">
                    <h5>Activities & Organizations</h5>
                    <ul>
                      {edu.activities.map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;