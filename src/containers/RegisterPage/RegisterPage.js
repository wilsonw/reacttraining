import React from 'react';
import { Redirect } from "react-router-dom";

class RegisterPage extends React.Component {
  state = {
    registered: false
  }

  register = () => {
    this.props.registerMe();
    this.setState({registered: true});
  }

  render = () => {
    return (!this.state.registered ? (
        <div>
          <h1>Register Page</h1>
          <button onClick={this.register}>Register me</button>
        </div>
      ) : (
        <Redirect to={this.props.location.from} />
      )
    );
  }
}

export default RegisterPage;