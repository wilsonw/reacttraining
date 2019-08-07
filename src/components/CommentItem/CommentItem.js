import React from 'react';
import styles from './CommentItem.module.css';

const CommentItem = (props) => {
  return(
    <div className={styles.Wrapper}>
      <div className={styles.Name}>{props.name}</div>
      <div className={styles.Email}>{props.email}</div>
      <div>{props.body}</div>
    </div>
  );
}

export default CommentItem;