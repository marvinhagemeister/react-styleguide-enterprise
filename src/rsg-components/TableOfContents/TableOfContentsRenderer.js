import React, { PropTypes } from 'react';

const TableOfContentsRenderer = ({ items, searchTerm, onSearchTermChange }) => {
  return (
    <div>
      <div className="rsg-reset rsg-font">
        <input
          value={searchTerm}
          className="rsg-search rsg-base rsg-base-bg rsg-border"
          placeholder="Filter by name"
          onChange={event => onSearchTermChange(event.target.value)}
          />
        {items}
      </div>
    </div>
  );
};

TableOfContentsRenderer.propTypes = {
  items: PropTypes.node.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
};

export default TableOfContentsRenderer;
