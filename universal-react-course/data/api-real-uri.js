export const questions = `https://api.stackexchange.com/2.2/questions?site=stackoverflow`;
export const question = id =>
  `https://api.stackexchange.com/2.2/questions/${id}?site=stackoverflow&filter=withbody`;
