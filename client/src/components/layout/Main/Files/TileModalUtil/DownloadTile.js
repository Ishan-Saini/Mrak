import React, { useState } from 'react';
import classes from './TileModalUtil.module.css';
import Modal from '../../../../UI/Modal/Modal';
import axios from 'axios';

const DownloadTile = (props) => {
  const [passwordInput, setPasswordInput] = useState('');

  const passwordChangeHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const dwFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'POST',
        url: `/api/v1/files/download/${props.fileId}`,
        withCredentials: true,
        responseType: 'blob',
        data: {
          password: passwordInput,
        },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      const ext = res.headers['content-type'].split('/')[1];
      link.setAttribute('download', `file.${ext}`);
      document.body.appendChild(link);
      link.click();
      props.onClose();
    } catch (err) {
      //console.log(err.res.data.message);
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes['download-form__container']}>
        <h2>Enter password to download</h2>
        <form
          className={classes['download-form']}
          onSubmit={dwFormSubmitHandler}
        >
          <div className={classes['download-password__container']}>
            <label
              className={classes['download-password-container__label']}
              htmlFor="dw-pass"
            >
              PASSWORD :
            </label>
            <input
              type="password"
              name="dw-password"
              id="dw-pass"
              onChange={passwordChangeHandler}
              value={passwordInput}
              className={classes['download-password__input']}
            />
          </div>
          <div className={classes['modal-btn__container']}>
            <button className={classes['modal-action__btn']} type="submit">
              Download
            </button>
            <button
              className={classes['modal-action__btn']}
              type="button"
              onClick={props.onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DownloadTile;
