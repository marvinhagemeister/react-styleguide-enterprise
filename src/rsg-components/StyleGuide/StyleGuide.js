import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import Components from '../Components';
import TableOfContents from '../TableOfContents';
import Message from '../Message';
import StyleGuideRenderer from '../StyleGuide/StyleGuideRenderer';
import { HOMEPAGE, DOCS_CONFIG } from '../../../scripts/consts';

export default class StyleGuide extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    components: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    sidebar: PropTypes.bool,
    codeKey: PropTypes.number
  };
  static defaultProps = {
    sidebar: true,
  };
  static childContextTypes = {
    codeKey: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      codeKey: this.props.codeKey,
      config: this.props.config,
    };
  }

  renderComponents(components, sections, sidebar) {
    if (!isEmpty(components) || !isEmpty(sections)) {
      return (
        <Components
          components={components}
          sections={sections}
          sidebar={sidebar}
          />
      );
    }

    return (
      <Message>
        No components or sections found.
				Check [the `components` and `sections` options]({DOCS_CONFIG}) in your style guide config.
			</Message>
    );
  }

  renderTableOfContents(components, sections) {
    return <TableOfContents components={components} sections={sections} />;
  }

  render() {
    const { config, components, sections, sidebar } = this.props;

    return (
      <StyleGuideRenderer
        title={config.title}
        homepageUrl={HOMEPAGE}
        components={this.renderComponents(components, sections, sidebar)}
        sections={sections}
        toc={this.renderTableOfContents(components, sections)}
        sidebar={sidebar}
        />
    );
  }
}
