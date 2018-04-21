/*
*
* ResetPassword
*
*/
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FlowRouter } from 'meteor/kadira:flow-router';
import messages from './messages';
import { connect } from 'react-redux-meteor';
import PropTypes from 'prop-types';
// import { toJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';
import { TRIGGER_SAGA_ONE } from './constants';
import { GET_ALL_USERS } from '/imports/publications/ResetPassword/constants';
import styles from './styles';
import { Accounts } from 'meteor/accounts-base';

class ResetPassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      passwordRecovery: 'The two passwords you entered are not the same',
      resetPassword: '',
      email: '',
      newPassword: '',
      repeatPassword: '',
      recoveryEmail: '',
      forgetPasswordMessage: ''
    };
    this.sendResetToken = this.sendResetToken.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange (evt) {
    const name = evt.target.name;
    const value = evt.target.value;

    this.setState({
      [name]: value
    });
  }

  sendResetToken (evt) {
    evt.preventDefault();

    const {
      recoveryEmail
    } = this.state;

    let forgetPasswordMsg = '';

    Accounts.forgotPassword({email: recoveryEmail}, function (error, response) {
      if (error) {
        forgetPasswordMsg = error.reason;
      } else {
        forgetPasswordMsg = 'We have emailed you a link to reset your password';
      }
    });

    this.setState({
      forgetPasswordMessage: forgetPasswordMsg
    });
  }

  changePassword () {
    const {
      newPassword,
      repeatPassword,
      resetPassword
    } = this.state;

    let recoveryMsg = '';
    let newResetPassword = resetPassword;

    if (newPassword !== repeatPassword) {
      recoveryMsg = 'The two passwords you entered are not the same';
    }

    Accounts.resetPassword(resetPassword, newPassword, function (error) {
      if (error) {
        recoveryMsg = error.reason;
        newResetPassword = '';
      } else {
        recoveryMsg = 'Your password is successfully changed';
        newResetPassword = null;
      }

      this.setState({
        passwordRecovery: recoveryMsg,
        resetPassword: newResetPassword
      });
    });
  };

  render () {
    const {
      passwordRecover,
      forgetPassword,
      resetPassword
    } = this.state;

    return (
      <div>
        <div style={styles.mainContainer}>
          <div className="middle-box text-center loginscreen animated fadeInDown">
            <div>
              <div>
                <img src="/img/otonomos/logoGrey40.png" />
              </div>
              <p className="tagLine">
                <FormattedMessage {...messages.tagLine}/>
              </p>
              <h3 className="paddingTop10 fontSize18">
                <FormattedMessage {...messages.title}/>
              </h3>
              <p></p>
              {passwordRecover}
              {forgetPassword}
              {
                resetPassword ? (
                  <div>
                    <form id="newPassword" className="m-t" role="form">
                      <div>
                        <div className="form-group">
                          <input
                            name="newPassword"
                            type="password"
                            className="form-control"
                            placeholder="New password"
                            required="true"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            name="repeatPassword"
                            type="password"
                            className="form-control"
                            placeholder="New password again"
                            required="true"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary block full-width m-b"
                        >
                          <FormattedMessage {...messages.changePassword}/>
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <form id="forgetPassword" className="m-t" role="form" onSubmit={ evt => this.sendResetToken(evt) }>
                    <div>
                      <div className="form-group">
                        <input
                          name="recoveryEmail"
                          type="text"
                          className="form-control"
                          placeholder="Email address"
                          required="true"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary block full-width m-b"
                      >
                        <FormattedMessage {...messages.resetInstruction}/>
                      </button>
                    </div>
                  </form>
                )
              }
              <a onClick={evt => FlowRouter.go('login')}>
                <small>
                  <FormattedMessage {...messages.backToLogin}/>
                </small>
              </a>

              <p className="m-t">
                <small>
                  <FormattedMessage {...messages.footer}/> &copy; 2017
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      );
  }

  // Keep this function intact to ensure app stability
  componentWillUnmount () {
    const { dispatchStopSagas } = this.props;
    dispatchStopSagas();
  }
}

ResetPassword.propTypes = {
  dispatchStopSagas: PropTypes.func
};

const mapTrackerToProps = (state, props) => {
  if (Meteor.subscribe(GET_ALL_USERS).ready()) {
    return {
      currentUser: {_id: 'lll'},
      allUsers: Meteor.users.find().fetch(),
      subsReady: true
    };
  }

  return { currentUser: {}, allUsers: [], subsReady: false };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchReducerOne: () => {
      dispatch({
        type: TRIGGER_SAGA_ONE
      });
    },

    dispatchStopSagas: () => {
      dispatch({
        type: 'CANCEL_SAGAS'
      });
    }
  };
};

const mapStateToProps = createStructuredSelector({
  var1: selectors.selectVar1()
});

export default connect(
  mapTrackerToProps,
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
