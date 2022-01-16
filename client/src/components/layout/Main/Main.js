import classes from './Main.module.css';
import Files from './Files/Files';
import { Route, Switch } from 'react-router-dom';

const Main = (props) => {
  return (
    <main>
      <Switch>
        <Route path="/files">
          <div className={classes['files-wrapper']}>
            <Files refresh={props.refresh} />
          </div>
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
