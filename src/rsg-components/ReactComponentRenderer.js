import React, { PropTypes } from 'react';

const ReactComponentRenderer = ({ name, pathLine, description, props, examples, sidebar }) => {
  return (
    <div className="rsg-component">
      <header className="rsg-component-header rsg-font">
        <h2 className="rsg-component-primaryHeading" id={name}>
          {name}
        </h2>
        <div className="rsg-component-pathLine rsg-light rsg-monospace">{pathLine}</div>
        {sidebar ? (
          <a className="rsg-component-isolatedLink link" href={'#!/' + name}>Open isolated ⇢</a>
        ) : (
            <a className="rsg-component-isolatedLink link" href="/">← Back</a>
          )}
      </header>
      <div>
        {description}
      </div>
      <div className="rsg-component-props rsg-font rsg-reset">
        <h3 className="rsg-component-heading">Props</h3>
        {props}
      </div>
      {examples}
    </div>
  );
};

ReactComponentRenderer.propTypes = {
  name: PropTypes.string.isRequired,
  pathLine: PropTypes.string.isRequired,
  description: PropTypes.node,
  props: PropTypes.node,
  examples: PropTypes.node,
  sidebar: PropTypes.bool,
};

export default ReactComponentRenderer;
