import Search from './Search/Search';
import classes from './Header.module.css';
import Dropdown from './Dropdown/Dropdown';

const Header = () => {
  return (
    <header>
      <div className={classes['header-title']}>
        <span>M</span>rak
      </div>
      <Search />
      <Dropdown />
    </header>
  );
};

export default Header;
