import unionWith from 'lodash/unionWith';

export const Questions = (state = [], { type, questions, question }) => {
  const questionEquality = (a = {}, b = {}) => a.question_id == b.question_id;
  if (type === 'FETCHED_QUESTION') {
    state = unionWith([question], state, questionEquality);
  }
  if (type === 'FETCHED_QUESTIONS') {
    state = unionWith(state, questions, questionEquality);
  }
  return state;
};
