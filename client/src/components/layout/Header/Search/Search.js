import classes from './Search.module.css';
import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Search = () => {
  return (
    <div className={classes['header-search__container']}>
      <form className={classes['header-search__form']}>
        <div className={classes['header-search-input__container']}>
          <input type="text" name="search-box" placeholder="Search in Mrak" />
        </div>
        <button className={classes['header-search__btn']}>
          <IconContext.Provider value={{ color: 'white', size: '0.8rem' }}>
            <FaSearch />
          </IconContext.Provider>
        </button>
      </form>
    </div>
  );
};

export default Search;
