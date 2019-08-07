import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import DetailPage from './containers/DetailPage/DetailPage';
import HomeLayout from './containers/HomeLayout/HomeLayout';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import {connect} from 'react-redux';
import {getTotalCount} from './components/Commons';

class App extends React.Component {
  state = {
    userLogggedIn: false
  }

  registerMe = () => {
    this.setState({userLogggedIn: true});
  }

  render = () => {
    return(
      <BrowserRouter>
        <div className={styles.Main}>
          <Link to={"/"}>Back Home...</Link>
          <h1>Total Likes: {this.props.totalLikesCount}</h1>
          <Switch>
            <Route path={"/details/:id"}
              render={(props) => (this.state.userLogggedIn ?
                <DetailPage {...props} /> :
                <Redirect to={{pathname: "/register", from: props.location}} /> )}/>
            <Route path={"/"} exact
              render={() => <HomeLayout onUpdateLike={this.props.onUpdateLike} blogLikes={this.props.blogLikes} />}
            />
            <Route path={"/register"} render={(props) => <RegisterPage registerMe={this.registerMe} {...props}/>} />
            <Route render={()=><h1>Not Found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const blogLikes = state.blogLikes;
  const totalLikesCount = getTotalCount(blogLikes);
  return {blogLikes, totalLikesCount};
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateLike: (blogId, change) => {
      dispatch({type: "update", blogId, change});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
