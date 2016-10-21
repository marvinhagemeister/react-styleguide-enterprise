import React, { PropTypes } from 'react';

const CodeRenderer = ({ className, children }) => {
  const css = className ? className : '';
  return <code className={'rsg-code ' + css}>{children}</code>;
};

CodeRenderer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default CodeRenderer;
