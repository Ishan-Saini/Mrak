import classes from './Sidebar.module.css';
import Upload from './UploadForm/Upload';

const Sidebar = (props) => {
  return (
    <aside>
      <div className={classes['sidebar-items__wrapper']}>
        <Upload refreshToggler={props.refreshToggler} />
      </div>
    </aside>
  );
};

export default Sidebar;
