import React, { useState } from 'react';
import userActions from '../../_actions/user.actions';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';

export const NewUserForm = (props: { newUser: Function }) => {

  const [values, setValues] = useState({
    username: '', password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value });
  }

  const handleSubmit = () => {
    props.newUser({ ...values });
  }

  return (
    <div>
      <h3>New user</h3>
      <Input name="username" onChange={handleInputChange} />
      <Input name="password" onChange={handleInputChange} type="password" />
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  )
}

export default connect(null, { 
  newUser: userActions.registerUser
})(NewUserForm);