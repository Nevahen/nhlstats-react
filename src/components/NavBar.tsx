import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

const guestLinks = [
  { title: 'Home', to: '/' },
  { title: 'Login', to: '/login' }
]

const userLinks = [
  { title: 'Home', to: '/' },
  { title: 'Matches', to: '/matches' }
]

interface INavBarProps {
  loggedIn: boolean
}

const NavBar = (props: INavBarProps) => {

  return (
    <ul>

    { props.loggedIn  
      
      ? userLinks.map(value => (
         <li key={value.to} ><Link to={value.to}>{value.title}</Link></li>
      ))      
      : guestLinks.map(value => (
          <li key={value.to} ><Link to={value.to}>{value.title}</Link></li>
        ))
      }


    </ul>
  )

}

const mapStateToProps = (state: any) =>  ({
  loggedIn: state.authentication.loggedIn,
})

export default connect(mapStateToProps)(NavBar);