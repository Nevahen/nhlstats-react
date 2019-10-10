import { connect } from 'react-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';
import userActions from '../_actions/user.actions';
import { Menu } from 'antd';

const guestLinks = [
  { title: 'Home', to: '/', exact: true },
  { title: 'Login', to: '/login', exact: false }
]

const userLinks = [
  { title: 'Home', to: '/', exact: true },
  { title: 'Matches', to: '/matches', exact: false },
  { title: 'New Game', to: '/game', exact: false },
  { title: 'Users', to: '/users', exact: false }
]

interface INavBarProps {
  loggedIn: boolean;
  logout: Function;
}

const NavBar = (props: INavBarProps) => {

  return (
    
      <Menu theme="dark" style={{ lineHeight: '64px' }} mode="horizontal">
  
      { props.loggedIn  
        
        ? userLinks.map(value => (
           <Menu.Item key={value.to} ><NavLink exact={value.exact} activeClassName="nav-active" to={value.to}>{value.title}</NavLink></Menu.Item>
        ))      
        : guestLinks.map(value => (
            <Menu.Item key={value.to} ><NavLink exact={value.exact} activeClassName="nav-active" to={value.to}>{value.title}</NavLink></Menu.Item>
          ))
        }
  
  
      
      { props.loggedIn && <Menu.Item onClick={() => props.logout()}>Logout</Menu.Item>}
      </Menu>
  )

}

const mapStateToProps = (state: any) =>  ({
  loggedIn: state.authentication.loggedIn,
})

const mapActionsToProps = {
  logout: userActions.logout,
}

export default connect(mapStateToProps, mapActionsToProps)(NavBar);