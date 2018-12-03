import unionWith from 'lodash/unionWith';

export const Questions = (state = [], { type, questions }) => {
  const questionEquality = (a = {}, b = {}) => a.question_id == b.question_id;
  if (type === 'FETCHED_QUESTIONS') {
    return unionWith(state, questions, questionEquality);
  }
  return state;
};
