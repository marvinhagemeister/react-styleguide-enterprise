import { PropTypes } from 'react';
import renderMarkdown from '../utils/markdown-to-jsx';

const tags = [
  'a',
  'p',
  'ul',
  'ol',
  'blockquote',
  'table',
  'thead',
  'td',
  'th',
  'hr',
  'h3',
  'h4',
  'h5',
  'h6',
  'code',
  'pre',
  'em',
  'strong',
  'img',
  'li',
  'tr',
  'tbody',
];

const textTags = [
  'p',
  'ul',
  'ol',
  'blockquote',
  'table',
  'hr',
  'h3',
  'h4',
  'h5',
  'h6',
];

// Custom CSS classes for each tag: <em> → <em className={s.em}>.
const overrides = tags.map(value => {
  let css = 'rsg-' + value;
  if (value === 'a') {
    css += ' link';
  } else if (textTags.indexOf(value) > -1) {
    css += ' rsg-font rsg-text-tag';
  } else if (value === 'code') {
    css += ' rsg-reset rsg-monospace';
  } else if (value === 'pre') {
    css += ' rsg-code-bg rsg-border';
  } else if (value === 'hr') {
    css += ' rsg-border';
  } else if (value === 'thead') {
    css += ' rsg-border';
  }

  return {
    [value]: {
      props: {
        className: css,
      },
    },
  };
});

// Inline mode: replace <p> (usual root component) with <span>
const overridesInline = {
  p: {
    component: 'span',
    props: {
      className: 'rsg-base rsg-font',
    },
  },
};

const newOver = {};

overrides.forEach(item => {
  const key = Object.keys(item)[0];
  if (key !== 'p') {
    overridesInline[key] = item[key];
  }
  newOver[key] = item[key];
});

export default function Markdown({
  text,
  inline,
}) {
  const options = { overrides: !inline ? newOver : overridesInline };
  return renderMarkdown(text, options);
}

Markdown.propTypes = {
  text: PropTypes.string.isRequired,
  inline: PropTypes.bool,
};
