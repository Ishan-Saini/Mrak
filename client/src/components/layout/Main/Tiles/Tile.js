import React from 'react';
import classes from './Tile.module.css';
import FileImg from '../../../../images/rar.png';

const DUMMY = [
  {
    id: 'id1',
    title: 'hello worlderggw',
  },
  {
    id: 'id2',
    title: 'hello worlderggw',
  },
];

const Tile = () => {
  return (
    <React.Fragment>
      {DUMMY.map((tile) => {
        return (
          <div className={classes['grid-items']} key={tile.id}>
            <div className={classes['grid-items__img']}>
              <img src={FileImg} alt="img" />
            </div>
            <div className={classes['grid-items__title']}>
              <span>{tile.title}</span>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Tile;
