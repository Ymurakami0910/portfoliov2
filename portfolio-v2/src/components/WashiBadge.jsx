import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import './WashiBadge.css';

function WashiBadge({ text, rotate = 1.5 }) {
  return (
    <div className="washi-badge" style={{ '--rotate': `${rotate}deg` }}>
      <FontAwesomeIcon
        icon={faTrophy}
        style={{
          fontSize: '11px',
          color: '#fff',
          position: 'relative',
          zIndex: 1
        }}
      />
      <span className="washi-badge__text">{text}</span>
    </div>
  );
}

export default WashiBadge;