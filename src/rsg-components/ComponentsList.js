import React, { PropTypes } from 'react';

const ComponentsListRenderer = ({ items }) => (
  <div className="rsg-components-list">
    {items.map(({ heading, name, content }) => {
      const headingCss = heading ? 'rsg-bold' : '';
      return (<div className="rsg-components-list-item" key={name}>
        <a className={'link ' + headingCss} href={'#' + name}>{name}</a>
        {content}
      </div>
      );
    }
    )}
  </div>
);

ComponentsListRenderer.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ComponentsListRenderer;
