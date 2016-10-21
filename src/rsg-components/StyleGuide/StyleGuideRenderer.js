import React, { PropTypes } from 'react';
import Markdown from '../Markdown';

const StyleGuideRenderer = ({ title, homepageUrl, components, toc, sidebar }) => {
  const sidebarCss = sidebar
    ? 'hasSidebar'
    : '';

  return (
    <div className={"rsg-main " + sidebarCss}>
      <main className="rsg-content">
        <div className="rsg-components">
          {components}
          <footer className="rsg-footer rsg-font rsg-light">
            <Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
          </footer>
        </div>
      </main>
      {sidebar &&
        <div className="rsg-sidebar rsg-code-bg rsg-border">
          <h1 className="rsg-sidebar-heading rsg-reset rsg-font rsg-border">{title}</h1>
          {toc}
        </div>
      }
    </div>
  );
};

StyleGuideRenderer.propTypes = {
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  components: PropTypes.object.isRequired,
  toc: PropTypes.node.isRequired,
  sidebar: PropTypes.bool,
};

export default StyleGuideRenderer;
