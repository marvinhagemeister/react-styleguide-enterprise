import React, { PropTypes } from 'react';
import Markdown from './Markdown';

const MessageRenderer = ({ children }) => (
  <div className="rsg-message">
    <Markdown text={Array.isArray(children) ? children.join('\n') : children} />
  </div>
);

MessageRenderer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MessageRenderer;
