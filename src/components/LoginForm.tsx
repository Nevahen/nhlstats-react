import * as React from 'react';
import { connect } from 'react-redux';
import  userActions from '../_actions/user.actions';
import { Redirect } from 'react-router';
import { Input, Button } from 'antd';

interface LoginFormProps {
  errors? : string;
  loggedIn: boolean;
  loggingIn: boolean;
  login: any;
}

interface LoginFormState {
  username: string | null,
  password: string | null,
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      username: null,
      password: null
    }
  }

  private onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = { [e.target.name]: e.target.value } as unknown;
    this.setState(value as LoginFormState )
  }
  
  private handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const { username, password} = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    if(!this.props.loggingIn) {
      return (
        <form onSubmit={this.handleSubmit}>
          { this.props.errors && <span className="text-warning">{this.props.errors}</span> }
          { this.props.loggedIn && <Redirect to="/test" />}
          <Input onChange={this.onChange} placeholder="Username" name="username"/>
          <Input.Password onChange={this.onChange} placeholder="Password" type="password" name="password" id="password"/>
          <Button htmlType="submit"> Login </Button>
        </form>
      )
    } else {
      return ( <h2>Logging in..</h2> )
    }
  }

}

const mapStateToProps = (state: any) => ({
  loggedIn: state.authentication.loggedIn,
  loggingIn: state.authentication.loggingIn,
  errors: state.authentication.errors
})

const actionCreators = {
  login: userActions.login
}

export default connect(mapStateToProps, actionCreators)(LoginForm)