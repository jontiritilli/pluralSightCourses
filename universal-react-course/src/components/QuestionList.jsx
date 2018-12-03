import React from 'react';
import { connect } from 'react-redux';
import TagsList from './TagsList';

const QuestionListItem = ({ title, tags }) => (
  <div className="mb-3">
    <h3>{title}</h3>
    <div className="md-2">
      <TagsList tags={tags}/>
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
