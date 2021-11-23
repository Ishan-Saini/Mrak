import classes from './Main.module.css';
import Tile from './Tiles/Tile';

const Main = () => {
  return (
    <main>
      <div className={classes['main-wrapper']}>
        <Tile />
      </div>
    </main>
  );
};

export default Main;
