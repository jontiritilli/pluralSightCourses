import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Markdown from 'react-markdown';
import TagsList from './TagsList';
import { Questions } from '../reducers';

const QuestionDetail = ({ title, body, answer_count, tags }) => (
  <div>
    <h3 className="mb-2">{title}</h3>
    {body ? (
      <div>
        <div className="mb-3">
          <TagsList tags={tags} />
        </div>
        <Markdown source={body} />
        <div>{answer_count} answers available</div>
      </div>
    ) : (
      <div>...Question is loading</div>
    )}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  ...state.Questions.find(
    ({ question_id }) => question_id == ownProps.question_id
  ),
});

export default connect(mapStateToProps)(QuestionDetail);

QuestionDetail.propTypes = {
  title: PropType.string,
  body: PropType.string,
  answer_count: PropType.number,
  tags: PropType.array,
};
