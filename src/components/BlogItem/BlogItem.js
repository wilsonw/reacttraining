import React from 'react';
import css from './BlogItem.module.css';

const BlogItem = (props) => {
  return(
    <div className={css.BlogCard}>
      <h3 className={css.BlogTitle}>{props.title}</h3>
      <p className={css.BlogDesc}>{props.body}</p>
    </div>
  );
}

export default BlogItem;