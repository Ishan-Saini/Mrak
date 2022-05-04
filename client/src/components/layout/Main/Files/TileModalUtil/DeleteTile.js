import React from 'react';
import classes from './TileModalUtil.module.css';
import Modal from '../../../../UI/Modal/Modal';
import axios from 'axios';

const DeleteTile = (props) => {
  const deleteFileHandler = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `/api/v1/files/delete/${props.fileId}`,
        withCredentials: true,
      });
      props.onClose();
    } catch (err) {
      console.log(err.res.data.message);
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes['delete-modal']}>
        <h2>Are you sure?</h2>
        <div className={classes['modal-btn__container']}>
          <button
            className={classes['modal-action__btn']}
            type="button"
            onClick={deleteFileHandler}
          >
            Delete
          </button>
          <button
            className={classes['modal-action__btn']}
            type="button"
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTile;
