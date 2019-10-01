import React from 'react';
import { connect } from 'react-redux';

import userActions from '../../_actions/user.actions';
import { IUser } from '../../_types/UserStore';

interface IUserListProps {
  fetchUsers: Function
  users: IUser[];
}

const UserList = (props: IUserListProps) => {

  if (props.users.length === 0) {
    props.fetchUsers();
  }

  return  (
     <ul>
      { props.users.map(user => (
        <li key={user.id}>{ user.username } </li>
      )) }
    </ul>
  )
}

const actionToState = {
  fetchUsers: userActions.fetchUsers
}

export default connect(null, actionToState)(UserList)