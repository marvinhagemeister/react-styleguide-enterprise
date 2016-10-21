import React, { PropTypes } from 'react';

const PlaygroundError = ({ message }) => (
  <pre className="rsg-playground-error rsg-monospace white error-bg">{message}</pre>
);

PlaygroundError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default PlaygroundError;
