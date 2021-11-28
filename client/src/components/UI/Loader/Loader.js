import { ClipLoader } from 'react-spinners';
import classes from './loader.module.css';

const Loader = (props) => {
  return (
    <div className={classes.loader}>
      <ClipLoader loading={props.loading} color="#000" size={props.size} />
    </div>
  );
};

export default Loader;
