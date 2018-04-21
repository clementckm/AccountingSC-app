/*
*
* SampleContainer
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
import { TRIGGER_SAGA_ONE } from './constants';
import { GET_ALL_USERS } from '/imports/publications/SampleContainer/constants';
import styles from './styles';
import TestComponent from '/imports/ui/components/TestComponent';
import * as logger from '/imports/utils/client/logger';
import * as globalVar from '/imports/utils/client/globalVar';

import { SampleComponent } from 'oto-ui-components';

class SampleContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    logger.info('SampleContainer', 'anything');
    globalVar.set('SampleContainerSession', 'hehe');
  }

  render () {
    const { allUsers, dispatchReducerOne, var1, currentUser } = this.props;

    return (
      <div>
        <div className="ibox">
          <div className="ibox-content">
            <div style={styles.mainContainer}>
              <FormattedMessage {...messages.fieldOne}/>
              { currentUser._id } length: { allUsers.length }
              <button className="btn btn-success" onClick={dispatchReducerOne}>Methods in reducer</button>
              Test redux state updated: {var1}
              <TestComponent/>
              <SampleComponent />
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

SampleContainer.propTypes = {
  allUsers: PropTypes.array,
  dispatchReducerOne: PropTypes.func,
  var1: PropTypes.string,
  dispatchStopSagas: PropTypes.func,
  currentUser: PropTypes.object
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
)(SampleContainer);
