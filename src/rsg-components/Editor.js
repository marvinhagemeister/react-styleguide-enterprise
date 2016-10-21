import React, { PropTypes } from 'react';

const Editor = ({ code }) => {
  return (
    <div className="CodeMirror">
      <div className="CodeMirror-scroll">
        <pre className="CodeMirror-lines">{code}</pre>
      </div>
    </div>);
};

Editor.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Editor;
