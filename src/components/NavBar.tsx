import { connect } from 'react-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';
import userActions from '../_actions/user.actions';

const guestLinks = [
  { title: 'Home', to: '/', exact: true },
  { title: 'Login', to: '/login', exact: false }
]

const userLinks = [
  { title: 'Home', to: '/', exact: true },
  { title: 'Matches', to: '/matches', exact: false }
]

interface INavBarProps {
  loggedIn: boolean;
  logout: Function;
}

const NavBar = (props: INavBarProps) => {

  return (
    <nav>
      <ul>
  
      { props.loggedIn  
        
        ? userLinks.map(value => (
           <li key={value.to} ><NavLink exact={value.exact} activeClassName="nav-active" to={value.to}>{value.title}</NavLink></li>
        ))      
        : guestLinks.map(value => (
            <li key={value.to} ><NavLink exact={value.exact} activeClassName="nav-active" to={value.to}>{value.title}</NavLink></li>
          ))
        }
  
  
      </ul>
      { props.loggedIn && <span onClick={() => props.logout()}>Logout</span>}
    </nav>
  )

}

const mapStateToProps = (state: any) =>  ({
  loggedIn: state.authentication.loggedIn,
})

const mapActionsToProps = {
  logout: userActions.logout,
}

export default connect(mapStateToProps, mapActionsToProps)(NavBar);