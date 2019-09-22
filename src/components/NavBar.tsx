import { connect } from 'react-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

const guestLinks = [
  { title: 'Home', to: '/', exact: true },
  { title: 'Login', to: '/login', exact: false }
]

const userLinks = [
  { title: 'Home', to: '/', exact: true },
  { title: 'Matches', to: '/matches', exact: false }
]

interface INavBarProps {
  loggedIn: boolean
}

const NavBar = (props: INavBarProps) => {

  return (
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
  )

}

const mapStateToProps = (state: any) =>  ({
  loggedIn: state.authentication.loggedIn,
})

export default connect(mapStateToProps)(NavBar);