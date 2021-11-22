import classes from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside>
      <div className={classes['sidebar-items__wrapper']}>
        <div className={classes['upload-btn__container']}>
          <button type="button">Upload</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
