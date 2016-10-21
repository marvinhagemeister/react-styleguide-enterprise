import React, { PropTypes } from 'react';
import Editor from './Editor';
import Preview from './Preview';

const PlaygroundRenderer = ({ code, showCode, evalInContext, onCodeToggle }) => (
  <div className="rsg-playground rsg-border">
    <div className="rsg-playground-preview">
      <Preview code={code} evalInContext={evalInContext} />
    </div>
    {showCode ? (
      <div>
        <Editor code={code} />
        <button type="button" className="rsg-playground-codeToggle rsg-base-bg rsg-border link rsg-font" onClick={onCodeToggle}>
          Hide code
				</button>
      </div>
    ) : (
        <button type="button" className="rsg-playground-codeToggle rsg-base-bg rsg-border link rsg-font" onClick={onCodeToggle}>
          Show code
			</button>
      )}
  </div>
);

PlaygroundRenderer.propTypes = {
  code: PropTypes.string.isRequired,
  showCode: PropTypes.bool.isRequired,
  evalInContext: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onCodeToggle: PropTypes.func,
};

export default PlaygroundRenderer;
