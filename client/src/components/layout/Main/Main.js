import classes from './Main.module.css';
import Files from './Tiles/Files';

const Main = (props) => {
  return (
    <main>
      <div className={classes['main-wrapper']}>
        <Files refresh={props.refresh} />
      </div>
    </main>
  );
};

export default Main;
