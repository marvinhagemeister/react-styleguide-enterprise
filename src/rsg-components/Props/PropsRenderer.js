import React, { PropTypes } from 'react';
import Code from '../Code';
import Markdown from '../Markdown';
import { unquote, getType } from './util';

function renderRows(props) {
  const rows = [];
  for (const name in props) {
    if (!props.hasOwnProperty(name)) {
      continue;
    }

    const prop = props[name];
    rows.push(
      <tr key={name}>
        <td className="rsg-prop-cell"><Code className="rsg-name">{name}</Code></td>
        <td className="rsg-prop-cell"><Code className="rsg-type">{renderType(getType(prop))}</Code></td>
        <td className="rsg-prop-cell">{renderDefault(prop)}</td>
        <td className="rsg-prop-cell rsg-prop-cellDesc">{renderDescription(prop)}</td>
      </tr>
    );
  }
  return rows;
}

function renderType(type) {
  if (!type) {
    return 'unknown';
  }

  const { name } = type;

  switch (name) {
    case 'arrayOf':
      return `${type.value.name}[]`;
    case 'instanceOf':
      return type.value;
    default:
      return name;
  }
}

function renderDefault(prop) {
  if (prop.required) {
    return (
      <span className="rsg-light">Required</span>
    );
  } else if (prop.defaultValue) {
    return (
      <Code>{unquote(prop.defaultValue.value)}</Code>
    );
  }
  return '';
}

function renderDescription(prop) {
  const { description } = prop;
  const extra = renderExtra(prop);
  return (
    <div>
      {description && <Markdown text={description} inline />}
      {description && extra && ' '}
      {extra}
    </div>
  );
}

function renderExtra(prop) {
  const type = getType(prop);

  if (!type) {
    return null;
  }

  switch (type.name) {
    case 'enum':
      return renderEnum(prop);
    case 'union':
      return renderUnion(prop);
    case 'shape':
      return renderShape(prop.type.value);
    case 'arrayOf':
      if (type.value.name === 'shape') {
        return renderShape(prop.type.value.value);
      }
      return null;
    default:
      return null;
  }
}

function renderEnum(prop) {
  if (!Array.isArray(getType(prop).value)) {
    return <span>{getType(prop).value}</span>;
  }
  const values = getType(prop).value.map(({ value }) => (
    <li className="rsg-prop-listItem" key={value}>
      <Code>{unquote(value)}</Code>
    </li>
  ));
  return (
    <span>One of: <ul className="rsg-prop-list">{values}</ul></span>
  );
}

function renderUnion(prop) {
  if (!Array.isArray(getType(prop).value)) {
    return <span>{getType(prop).value}</span>;
  }
  const values = getType(prop).value.map((value, index) => (
    <li className="rsg-prop-listItem" key={value.name + index}>
      <Code className="rsg-type">{renderType(value)}</Code>
    </li>
  ));

  return (
    <span>One of type: <ul className="rsg-prop-list">{values}</ul></span>
  );
}

function renderShape(props) {
  const rows = [];
  for (const name in props) {
    if (!props.hasOwnProperty(name)) {
      continue;
    }

    const prop = props[name];
    const defaultValue = renderDefault(prop);
    const description = prop.description;
    rows.push(
      <div key={name}>
        <Code className="rsg-name">{name}</Code>{': '}
        <Code className="rsg-type">{renderType(prop)}</Code>
        {defaultValue && ' — '}{defaultValue}
        {description && ' — '}
        {description && <Markdown text={description} inline />}
      </div>
    );
  }
  return rows;
}

export default function PropsRenderer({ props }) {
  return (
    <table className="rsg-prop-table">
      <thead className="rsg-prop-thead">
        <tr>
          <th className="rsg-prop-cellHeading">Name</th>
          <th className="rsg-prop-cellHeading">Type</th>
          <th className="rsg-prop-cellHeading">Default</th>
          <th className="rsg-prop-cellHeading rsg-prop-cellDesc">Description</th>
        </tr>
      </thead>
      <tbody className="rsg-prop-tbody">
        {renderRows(props)}
      </tbody>
    </table>
  );
}

PropsRenderer.propTypes = {
  props: PropTypes.object.isRequired,
};
