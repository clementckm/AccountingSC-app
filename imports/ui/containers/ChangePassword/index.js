/*
*
* ChangePassword
*
*/
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from 'react-redux-meteor';
// import { toJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';
import { TRIGGER_SAGA_ONE } from './constants';
import { GET_ALL_USERS } from '/imports/publications/ChangePassword/constants';
import PropTypes from 'prop-types';
// import styles from './styles';
// import * as logger from '/imports/utils/client/logger';
// import * as globalVar from '/imports/utils/client/globalVar';

class ChangePassword extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      changePassMessage: '',
      originalPassword: '',
      newPassword: '',
      newPasswordAgain: ''
    };
    this.changePassword = this.changePassword.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  changePassword () {
    const {
      originalPassword,
      newPassword,
      newPasswordAgain
    } = this.state;

    const self = this;
    let changePassMsg = '';
    if (newPassword !== newPasswordAgain) {
      changePassMsg = 'Please make sure the new passwords you entered matched';
      this.setState({
        changePassMessage: changePassMsg
      });
      return false;
    }

    Accounts.changePassword(originalPassword, newPassword, function (error, result) {
      if (error) {
        changePassMsg = error.message;
      } else {
        changePassMsg = 'Your password has been changed sucessfully';
      }

      self.setState({
        changePassMessage: changePassMsg
      });
    });
  }

  handleInputChanged (evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({
      [name]: value
    });
  }

  render () {
    return (
      <div className="wrapper wrapper-content animated fadeIn">
        {
          this.state.changePassMessage ? (
            <div className="aler alert-info">
              <br/>
              {this.state.changePassMessage}
              <br/>
              <br/>
            </div>
          ) : ''
        }
        <br/>
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox-content">
              <h2>
                <i className="fa fa-lock"></i>
                <FormattedMessage {...messages.changePassword}/>
              </h2>

              <form className="form-horizontal" id="changePassword">

                <div className="hr-line-dashed"></div>

                <div className="form-group">
                  <label className="col-sm-2 control-label">
                    <FormattedMessage {...messages.original}/>
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="password"
                      className="form-control"
                      name="originalPassword"
                      onChange={this.handleInputChanged}
                      required
                    />
                  </div>
                </div>

                <div className="hr-line-dashed"></div>

                <div className="form-group">
                  <label className="col-sm-2 control-label">
                    <FormattedMessage {...messages.newPassword}/>
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      onChange={this.handleInputChanged}
                      required
                    />
                  </div>
                </div>

                <div className="hr-line-dashed"></div>

                <div className="form-group">
                  <label className="col-sm-2 control-label">
                    <FormattedMessage {...messages.repeatNewPassword}/>
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="password"
                      className="form-control"
                      name="newPasswordAgain"
                      onChange={this.handleInputChanged}
                      required
                    />
                  </div>
                </div>

                <div className="hr-line-dashed"></div>
              </form>
              <div className="col-sm-10 col-sm-offset-2">
                <button
                  className="btn btn-primary pull-left"
                  name="submit"
                  onClick={this.changePassword}
                >
                  <i className="fa fa-lock">
                  </i>
                  <FormattedMessage {...messages.changePassword}/>
                </button>
              </div>
              <br/>
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

ChangePassword.propTypes = {
  dispatchStopSagas: PropTypes.func
};

const mapTrackerToProps = (state, props) => {
  if (Meteor.subscribe(GET_ALL_USERS).ready()) {
    return {
      currentUser: Meteor.user(),
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
)(ChangePassword);
