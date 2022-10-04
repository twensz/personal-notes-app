import React from 'react';
import PropTypes from 'prop-types';

function Button({ onClick }) {
  return (
    <button type="button" className="action" onClick={() => onClick}>+</button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
