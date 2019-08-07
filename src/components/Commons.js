import React from 'react';

import axios from 'axios';

export const POSTS_URL = "http://jsonplaceholder.typicode.com/posts";
export const COMMENTS_URL = "http://jsonplaceholder.typicode.com/comments?postId=";

export const fetchData = (url, callback, errorCallback=(err)=>{}) => {
  console.log(`Fetch data from ${url}`);
  axios.get(url).then((res) => {
    callback(res.data);
  }).catch((err) => {
    console.error(err);
    errorCallback(err);
  });
}

export const showLoader = (props) => {
  return (
    props.showLoader ? <h1>Loading...</h1> : props.children
  );
}

export const getTotalCount = (blogLikes) => {
  return Object.values(blogLikes).reduce((acc, val) => {
    return acc + val;
  }, 0);
}