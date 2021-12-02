import React, { useState, useEffect } from 'react';
import classes from './Files.module.css';
import DownloadTile from './TileModalUtil/DownloadTile';
import FileImg from '../../../../images/rar.png';
import { AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import axios from 'axios';
import DeleteTile from './TileModalUtil/DeleteTile';

const initialModalState = {
  downloadModal: false,
  deleteModal: false,
};

const Files = (props) => {
  const [filesArray, setFilesArray] = useState(null);
  const [modalState, setModalState] = useState(initialModalState);
  const [fileId, setFileId] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: 'http://127.0.0.1:5000/api/v1/files/',
          withCredentials: true,
        });
        setFilesArray(res.data.data.files);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    fetchFiles();
  }, [props.refresh, modalState.deleteModal]);

  const downloadFile = async (e) => {
    let id = e.currentTarget.parentNode.parentNode.parentNode.dataset.fileid;
    setFileId(id);
    setModalState({
      ...modalState,
      downloadModal: true,
    });
  };

  const deleteFile = async (e) => {
    let id = e.currentTarget.parentNode.parentNode.parentNode.dataset.fileid;
    setFileId(id);
    setModalState({
      ...modalState,
      deleteModal: true,
    });
  };

  const closeModal = (modal) => {
    setModalState({
      ...modalState,
      [modal]: false,
    });
  };

  return (
    <React.Fragment>
      {filesArray &&
        filesArray.map((tile) => {
          return (
            <div
              className={classes['grid-items']}
              key={tile._id}
              data-fileid={tile._id}
            >
              <div className={classes['grid-items__img']}>
                <img src={FileImg} alt="img" />
              </div>
              <div className={classes['grid-items__info']}>
                <div className={classes['grid-items__title']}>
                  <span>{tile.filename}</span>
                </div>
                <div className={classes['grid-items-btn__container']}>
                  <button
                    type="button"
                    className={classes['grid-items-download__btn']}
                    onClick={downloadFile}
                  >
                    <IconContext.Provider
                      value={{ color: '#000', size: '1.5rem' }}
                    >
                      <AiOutlineDownload />
                    </IconContext.Provider>
                  </button>
                  <button
                    type="button"
                    className={classes['grid-items-delete__btn']}
                    onClick={deleteFile}
                  >
                    <IconContext.Provider
                      value={{ color: '#000', size: '1.5rem' }}
                    >
                      <AiOutlineDelete />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {modalState.downloadModal && (
        <DownloadTile
          fileId={fileId}
          onClose={() => closeModal('downloadModal')}
        />
      )}
      {modalState.deleteModal && (
        <DeleteTile fileId={fileId} onClose={() => closeModal('deleteModal')} />
      )}
    </React.Fragment>
  );
};

export default Files;
