import { useState } from 'react';
import classes from './Upload.module.css';

const Upload = () => {
  const [upload, setUpload] = useState(null);

  const onFileChange = (e) => {
    setUpload({
      uploadedFile: e.target.files[0],
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes['upload-form__container']}>
      <p className={classes['upload-form__heading']}>UPLOAD FILE</p>
      <form onSubmit={submitHandler}>
        <div className={classes['upload-file__continer']}>
          <input
            type="file"
            name="fileInput"
            required
            onChange={onFileChange}
          />
        </div>
        <div className={classes['upload-btn__container']}>
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
