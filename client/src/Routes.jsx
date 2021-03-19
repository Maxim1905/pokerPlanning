import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage, CreatePage, GamePage } from './pages';

import { useParams } from 'react-router-dom';

export const Routes = ({ isAuthenticated }) => {
  let params = useParams();

  console.log('params', params);
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/create" exact>
          <CreatePage />
        </Route>

        <Route path="/game/:id" exact>
          <GamePage />
        </Route>

        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
};
