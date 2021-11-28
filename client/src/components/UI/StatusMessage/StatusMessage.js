import React from 'react';
import classes from './StatusMessage.module.css';

const StatusMessage = (props) => {
  return (
    <div
      className={
        `${classes.msg}` +
        ' ' +
        `${
          props.status === 'error'
            ? classes['error-msg']
            : classes['success-msg']
        }`
      }
    >
      <p>{props.message}</p>
    </div>
  );
};

export default StatusMessage;
