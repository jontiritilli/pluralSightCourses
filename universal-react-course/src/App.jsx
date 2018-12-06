import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import QuestionDetail from './components/QuestionDetail';

const AppDisplay = () => (
  <div>
    <h1>
      <Link to="/">Isomorphic React</Link>
    </h1>
    <div>
      <Route exact path="/" render={() => <QuestionList />} />
      <Route
        exact
        path="/questions/:id"
        render={({ match }) => <QuestionDetail question_id={match.params.id} />}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(AppDisplay);
