import './App.css';
import Header from './components/layout/Header/Header';
import Main from './components/layout/Main/Main';
import WelcomePage from './Pages/Welcome/WelcomePage';
import PrivateRoute from './Pages/PrivateRoute';
import { Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/files" />
        </Route>
        <Route path={['/login', '/signup']} exact>
          <WelcomePage />
        </Route>
        <PrivateRoute path="/files" component={Main} exact />
      </Switch>
    </div>
  );
};

export default App;
