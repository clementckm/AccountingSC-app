import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Dropdown } from 'react-bootstrap';
import { smoothlyMenu } from '../layouts/Helpers';
import LanguageToggle from '/imports/ui/components/LanguageToggle';

class TopHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  toggleNavigation (e) {
    e.preventDefault();
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  redirectToLogout () {
    FlowRouter.go('logout');
  }

  render () {
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
          {
              // <div className="navbar-header">
              //     <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation} href="#"><i className="fa fa-bars"></i> </a>
              // </div>
          }
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <LanguageToggle />
            </li>
            <li>
              <a onClick={evt => this.redirectToLogout()}>
                <i className="fa fa-sign-out"></i> Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default TopHeader;
