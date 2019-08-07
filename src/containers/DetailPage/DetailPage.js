import React from 'react';
import BlogItem from '../../components/BlogItem/BlogItem';
import CommentItem from '../../components/CommentItem/CommentItem';
import * as Commons from '../../components/Commons';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      blog: null,
      comments: [],
      load: false,
    }
  }

  fetchBlog = () => {
    this.setState({load: true});
    Commons.fetchData(`${Commons.POSTS_URL}/${this.props.match.params.id}`, (data) => {
      this.setState({blog: data, load: false});
    },
    (err) => {
      this.setState({load: false});
    });
  }

  fetchComments = () => {
    this.setState({load: true});
    Commons.fetchData(`${Commons.COMMENTS_URL}${this.props.match.params.id}`, (data) => {
      this.setState({comments: data, load: false});
    },
    (err) => {
      this.setState({load: false});
    });
  }

  componentDidMount = () => {
    this.fetchBlog();
  }

  render() {
    const commentItems = this.state.comments.map((comment) => {
      return (
        <CommentItem key={comment.id} {...comment} />
      );
    });
    return(
      <div>
        <h1>Detail Page</h1>
        <Commons.showLoader showLoader={this.state.load}>
          {this.state.errorMsg}
          {this.state.blog && <BlogItem {...this.state.blog} />}
          {this.state.blog && <button onClick={this.fetchComments}>Show Comments</button>}
          {this.state.comments && commentItems}
        </Commons.showLoader>
      </div>
    );
  }
}

export default DetailPage;