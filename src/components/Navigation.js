import React from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';

function Navigation() {
  const { locale } = React.useContext(LocaleContext);

  return (
    <div className="navigation">
      <ul>
        <li><Link to="/archived">{locale === 'id' ? 'Terarsip' : 'Archived'}</Link></li>
      </ul>
    </div>
  );
}

export default Navigation;
