import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TagsList from './TagsList';

const QuestionListItem = ({ title, tags, question_id }) => (
  <div className="mb-3">
    <h3>{title}</h3>
    <div className="md-2">
      <TagsList tags={tags} />
    </div>
    <div>
      <Link to={`questions/${question_id}`}>
        <button type="button" className="btn btn-info">
          Info
        </button>
      </Link>
    </div>
  </div>
);

const QuestionList = ({ Questions }) => (
  <div>
    {Questions && Questions.length ? (
      <div>
        {Questions.map(question => (
          <QuestionListItem key={question.question_id} {...question} />
        ))}
      </div>
    ) : (
      <div>...Loading</div>
    )}
  </div>
);

const mapStateToProps = ({ Questions }) => ({ Questions });

export default connect(mapStateToProps)(QuestionList);

QuestionListItem.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.array,
  question_id: PropTypes.number,
};

QuestionList.propTypes = {
  Questions: PropTypes.array,
};
