import React from 'react';
import PropTypes from 'prop-types';

function Button({
  type = 'button', title, onClick, children,
}) {
  return (
    <button type={type} className="action" title={title} onClick={onClick}>{children}</button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => { },
};

export default Button;
