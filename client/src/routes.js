import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage, CreatePage, GamePage } from './pages';

// создаем хук где будет лежать вся логика роутинга нашего приложения
export const useRoutes = (isAuthenticated) => {
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
