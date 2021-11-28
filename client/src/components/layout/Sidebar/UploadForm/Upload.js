import { useState } from 'react';
import classes from './Upload.module.css';
import axios from 'axios';

const initialUploadState = {
  file: null,
  password: '',
};

const Upload = () => {
  const [uploadState, setUploadState] = useState(initialUploadState);

  const onFileChange = (e) => {
    setUploadState({
      ...uploadState,
      file: e.target.files[0],
    });
  };

  const onPasswordChange = (e) => {
    setUploadState({
      ...uploadState,
      password: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const uploadFormData = new FormData();
    uploadFormData.append('password', uploadState.password);
    uploadFormData.append('file', uploadState.file);
    try {
      await axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/api/v1/files/upload',
        withCredentials: true,
        data: uploadFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes['upload-form__container']}>
      <p className={classes['upload-form__heading']}>UPLOAD FILE</p>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className={classes['upload-file__container']}>
          <input
            type="file"
            name="mrak-upload"
            onChange={onFileChange}
            className={classes['upload-file__input']}
            required
          />
          <label
            htmlFor="mrak-password"
            className={classes['upload-password__label']}
          >
            Password :
          </label>
          <input
            type="password"
            id="mrak-password"
            name="mrak-password"
            className={classes['upload-file__password']}
            onChange={onPasswordChange}
            value={uploadState.password}
            required
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
