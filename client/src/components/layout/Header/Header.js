import React, { useContext } from 'react';
import Search from './Search/Search';
import classes from './Header.module.css';
import Dropdown from './Dropdown/Dropdown';
import UserContext from '../../../store/User-Context';

const Header = () => {
  const userCtx = useContext(UserContext);
  return (
    <header>
      <div className={classes['header-title']}>
        <span className={classes['header-title__initial']}>M</span>
        <span className={classes['header-title__rest']}>rak</span>
      </div>
      {userCtx.isLoggedIn && <Search />}
      {userCtx.isLoggedIn && <Dropdown />}
    </header>
  );
};

export default Header;
