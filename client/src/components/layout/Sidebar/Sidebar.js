import classes from './Sidebar.module.css';
import Upload from './UploadForm/Upload';

const Sidebar = () => {
  return (
    <aside>
      <div className={classes['sidebar-items__wrapper']}>
        <Upload />
      </div>
    </aside>
  );
};

export default Sidebar;
