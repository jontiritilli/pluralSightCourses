import React from 'react';
import PropType from 'prop-types';

const TagsList = ({ tags }) => (
  <div>
    {tags.map(tag => (
      <code key={tag}>{tag}, </code>
    ))}
  </div>
);

export default TagsList;

TagsList.propTypes = {
  tags: PropType.array,
};
