import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation">
      <ul>
        <li><Link to="/archived">Arsip</Link></li>
      </ul>
    </div>
  );
}

export default Navigation;
