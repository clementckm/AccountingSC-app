/*
*
* LogOut
*
*/
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FlowRouter } from 'meteor/kadira:flow-router';
import PropTypes from 'prop-types';
import messages from './messages';
import { connect } from 'react-redux-meteor';
// import { toJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';
import { TRIGGER_SAGA_ONE } from './constants';
import { GET_ALL_USERS } from '/imports/publications/LogOut/constants';
import styles from './styles';

class LogOut extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {
    if (!this.props.currentUser) {
      console.log('go go go');
      return Meteor.logout(() => FlowRouter.go('/login'));
    }
  }

  // redirectToLogin (evt) {
  //   evt.preventDefault();
  //   console.log('redirecting');
  //   // if (!this.props.currentUser) {
  //   //   console.log('go go go')
  //   //   // return Meteor.logout(() => FlowRouter.go('/SampleContainer'));
  //   // }
  // }

  render () {
    return (
      <div>
        <div className="ibox">
          <div className="ibox-content">
            <div style={styles.mainContainer}>
              <FormattedMessage {...messages.logOutMessage}/>
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

LogOut.propTypes = {
  currentUser: PropTypes.object,
  dispatchStopSagas: PropTypes.func
};

const mapTrackerToProps = (state, props) => {
  if (Meteor.subscribe(GET_ALL_USERS).ready()) {
    return {
      currentUser: Meteor.user(),
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
)(LogOut);
