/*
*
* CreateAccount
*
*/
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from 'react-redux-meteor';
import PropTypes from 'prop-types';
// import { toJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';
import {
  TRIGGER_SEND_ENROLMENT_EMAIL
} from './constants';
import { GET_ALL_USERS } from '/imports/publications/CreateAccount/constants';
import styles from './styles';
import * as logger from '/imports/utils/client/logger';
import * as globalVar from '/imports/utils/client/globalVar';

class CreateAccount extends React.Component {
  constructor (props) {
    super(props);

    // log messages to server
    logger.info('CreateAccount', {gg: 'gg'}, 'hehe');
    logger.warn('CreateAccount', {gg: 'gg'}, 'hehe');
    logger.error('CreateAccount', {gg: 'gg'}, 'hehe', {coolstory: 'coolstory'});

    // set globalVar
    globalVar.set('hehehe', 'hihi');

    this.state = {
      email: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange (evt) {
    this.setState({
      email: evt.target.value
    });
  }

  render () {
    const {
      email
    } = this.props;

    const {
      dispatchSendEnrollment
    } = this.props;
    return (
      <div className="middle-box text-center loginscreen animated fadeInDown">
        <div style={styles.mainContainer}>
          <div>
            <div>
              <img src="/img/otonomos/logoGrey40.png" />
            </div>
            <h3 className="paddingTop10 fontSize18">
              <FormattedMessage {...messages.title}/>
            </h3>
            <p>
              <FormattedMessage {...messages.description}/>
            </p>
            <p></p>
          </div>

          <p>
            <input
              type="text"
              className="form-control"
              onChange={this.handleEmailChange}
              placeholder="Email address"
            />
          </p>
          <br/>
          <button className="btn btn-primary block full-width m-b" onClick={evt => dispatchSendEnrollment(this.state.email)}>Create New Account</button>

          <p>
            Test redux state updated: {email}
          </p>
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

CreateAccount.propTypes = {
  email: PropTypes.string,
  dispatchSendEnrollment: PropTypes.func,
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
    dispatchSendEnrollment: (email) => {
      dispatch({
        type: TRIGGER_SEND_ENROLMENT_EMAIL,
        email
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
)(CreateAccount);
