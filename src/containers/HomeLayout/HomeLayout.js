import React from 'react';
import BlogItem from '../../components/BlogItem/BlogItem';
import { Link } from 'react-router-dom';
import * as Commons from '../../components/Commons';
import styles from './HomeLayout.module.css';

class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogList: [],
      errorMsg: "",
      load: false
    }
  }

  fetchData = () => {
    this.setState({load: true});
    Commons.fetchData(Commons.POSTS_URL, (res) => {
      this.setState({blogList: res, load: false});
    },
    (err) => {
      this.setState({errorMsg: "Could not fetch data.", load: false})
    });
  }

  componentDidMount = () => {
    this.fetchData();
  }

  render() {
    const blogItems = this.state.blogList.map((blog) => {
      return (
        <div key={blog.id}>
          <BlogItem {...blog} />
          <div className={styles.Likes}>
            <div className={styles.TotalCount}>{this.props.blogLikes[blog.id] || 0} Likes</div>
            <button className={styles.LikeButton} onClick={() => {this.props.onUpdateLike(blog.id, 1)}}>+1</button>
            <button className={styles.LikeButton} onClick={() => {this.props.onUpdateLike(blog.id, -1)}}>-1</button>
          </div>
          <Link to={`/details/${blog.id}`}>Details...</Link>
        </div>
      );
    });
    return(
      <div>
        <h1>Home Page</h1>
        <Commons.showLoader showLoader={this.state.load}>
          {this.state.errorMsg}
          {blogItems}
        </Commons.showLoader>
      </div>
    );
  }
}

export default HomeLayout;