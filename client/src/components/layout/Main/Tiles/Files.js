import React, { useState, useEffect } from 'react';
import classes from './Files.module.css';
import FileImg from '../../../../images/rar.png';
import axios from 'axios';

const Files = () => {
  const [filesArray, setFilesArray] = useState(null);

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
  }, []);

  const downloadFile = (e) => {};

  return (
    <React.Fragment>
      {filesArray &&
        filesArray.map((tile) => {
          return (
            <div className={classes['grid-items']} key={tile._id}>
              <div className={classes['grid-items__img']}>
                <img src={FileImg} alt="img" />
              </div>
              <div className={classes['grid-items__title']}>
                <span>{tile.filename}</span>
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default Files;
