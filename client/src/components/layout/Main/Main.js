import classes from './Main.module.css';
import Files from './Tiles/Files';

const Main = () => {
  return (
    <main>
      <div className={classes['main-wrapper']}>
        <Files />
      </div>
    </main>
  );
};

export default Main;
