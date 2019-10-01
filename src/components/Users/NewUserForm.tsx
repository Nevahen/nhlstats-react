import React, { useState } from 'react';
import userActions from '../../_actions/user.actions';
import { connect } from 'react-redux';

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
      <input name="username" onChange={handleInputChange} />
      <input name="password" onChange={handleInputChange} type="password" />
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}

export default connect(null, { 
  newUser: userActions.registerUser
})(NewUserForm);