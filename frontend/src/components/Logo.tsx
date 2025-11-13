import { useState } from 'react';
import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showTagline = false }) => {
  const [imageError, setImageError] = useState(false);
  const logoUrl = 'https://i.imgur.com/QScISt6.png';

  return (
    <div className={`logo logo-${size}`}>
      <div className="logo-container">
        {!imageError ? (
          <img 
            src={logoUrl} 
            alt="lupaSHE Logo" 
            className="logo-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="logo-svg">
            <div className="logo-text">
              <span className="logo-lupa">lupa</span>
              <span className="logo-she">SHE</span>
            </div>
            {showTagline && (
              <div className="logo-tagline">Tu seguridad en nuestras manos</div>
            )}
            <span className="logo-trademark">®</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;

