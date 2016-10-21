import React, { PropTypes } from 'react';
import Section from './Section';
import SectionsRenderer from './SectionsRenderer';

export default function Sections({
  sections,
  sidebar,
}) {
  const sectionsJsx = sections.map(section => (
    <Section
      key={section.name}
      section={section}
      sidebar={sidebar}
      />
  ));
  return (
    <SectionsRenderer sections={sectionsJsx} />
  );
}

Sections.propTypes = {
  sections: PropTypes.array.isRequired,
  sidebar: PropTypes.bool,
};
