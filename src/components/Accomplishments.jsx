import React from 'react';
import { Trophy, Award, Star, Calendar } from 'lucide-react';
import './Accomplishments.css';

const Accomplishments = ({ portfolioData }) => {
  const accomplishments = portfolioData?.accomplishments || [];

  const getIcon = (type) => {
    switch (type) {
      case 'award':
        return <Award />;
      case 'achievement':
        return <Star />;
      default:
        return <Trophy />;
    }
  };

  return (
    <section id="accomplishments" className="accomplishments">
      <div className="container">
        <h2 className="section-title">Awards & Accomplishments</h2>
        
        <div className="accomplishments-grid">
          {accomplishments.map((item, index) => (
            <div key={index} className="accomplishment-card">
              <div className="accomplishment-icon">
                {getIcon(item.type)}
              </div>
              
              <div className="accomplishment-content">
                <h3 className="accomplishment-title">{item.title}</h3>
                <p className="accomplishment-issuer">{item.issuer}</p>
                
                {item.date && (
                  <div className="accomplishment-date">
                    <Calendar size={14} />
                    {item.date}
                  </div>
                )}
                
                {item.description && (
                  <p className="accomplishment-description">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {accomplishments.length === 0 && (
          <div className="no-data">
            <Trophy size={48} />
            <p>Accomplishments coming soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Accomplishments;