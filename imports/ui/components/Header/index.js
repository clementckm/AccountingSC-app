import React from 'react';

// import messages from './messages';
// import { FormattedMessage } from 'react-intl';

import { smoothlyMenu } from '../../layouts/Helpers';

// import LogoImg from 'public/hkex_logo.png';
// import OtonomosLogo from 'public/otonomos.png';

export default class Header extends React.Component {
  toggleNavigation (e) {
    e.preventDefault();
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }
  render () {
    // const isAdmin = JSON.parse(localStorage.getItem('user')).data.isAdmin;
    // let nameComponent = (<h2 style={{ marginLeft: 35 }}></h2>);
    try {
      const co = JSON.parse(localStorage.activeCompany) || {};
      const coName = co.name || '';
      nameComponent = (<h2 style={{ marginLeft: 35 }}>{coName}</h2>);
    } catch (e) {
      // console.log('parse localStorage.currentCompany: ', e);
    }
    let adminOrUser;
    // if (isAdmin) {
    //   adminOrUser = (<div className="col-sm-8">
    //     <h2><FormattedMessage {...messages.HKEX} /></h2>
    //     <h4><FormattedMessage {...messages.administrator} /></h4>
    //   </div>);
    // } else {
    //   adminOrUser = (<div className="col-sm-8">
    //     <img src={OtonomosLogo} style={{ marginLeft: 30 }} />
    //     {nameComponent}
    //     {/*<h4 style={{ marginLeft: 35 }}>Title in Company</h4>*/}
    //   </div>);
    // }
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top white-bg" role="navigation" style={{ marginBottom: 0 }}>
          <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation} href="#"><i className="fa fa-bars" /></a>
          {adminOrUser}
          <div className="navbar-header pull-right">
            <img src={LogoImg} />
          </div>
        </nav>
      </div>
    );
  }
}
