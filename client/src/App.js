import { Routes } from './Routes';
import { useAuth } from './hooks/auth.hook';
import styled from 'styled-components';
import { AuthContext } from './context/auth.context';

import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

const Container = styled.div`
  height: calc(100vh - 52px);
`;

const App = () => {
  const { userId, token, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, logout, login, userId, isAuthenticated }}
    >
      <BrowserRouter>
        <Container>
          {isAuthenticated && <Navbar />}

          <Routes isAuthenticated={isAuthenticated} />
        </Container>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
