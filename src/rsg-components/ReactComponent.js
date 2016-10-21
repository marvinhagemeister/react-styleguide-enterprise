import React, { PropTypes } from 'react';
import Markdown from './Markdown';
import Props from './Props';
import Examples from './Examples';
import ReactComponentRenderer from './ReactComponentRenderer';

export default function ReactComponent({
  component,
  sidebar,
}) {
  const { name, pathLine, examples } = component;
  const { description, props } = component.props;
  return (
    <ReactComponentRenderer
      name={name}
      pathLine={pathLine}
      description={description && <Markdown text={description} />}
      props={props && <Props props={props} />}
      examples={examples && <Examples examples={examples} />}
      sidebar={sidebar}
      />
  );
}

ReactComponent.propTypes = {
  component: PropTypes.object.isRequired,
  sidebar: PropTypes.bool,
};
