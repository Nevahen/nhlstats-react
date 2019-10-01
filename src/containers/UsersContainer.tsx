import React from 'react';
import { connect } from 'react-redux';

import { UserStore } from '../_types/UserStore';
import { AppState } from '../App';
import NewUserForm from '../components/Users/NewUserForm';
import UserList from '../components/Users/UserList';

interface IUserContainerProps {
  userStore: UserStore,
}

const UsersContainerComponent = (props: IUserContainerProps) => {

 if(props.userStore.fetching) {
    return (
      <h2>Loading users..</h2>
    )
  }

  return (
    <div>
      <h1>Hi</h1>
      <UserList users={props.userStore.users} />
      <NewUserForm />
    </div>
  );

}

const mapStateToProps = (state: AppState) =>  ({
  userStore: state.userStore,
})

export default connect(mapStateToProps)(UsersContainerComponent);