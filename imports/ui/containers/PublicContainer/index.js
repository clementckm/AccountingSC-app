/*
*
* PublicContainer
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
import { GET_ALL_USERS } from '../../../publications/PublicContainer/constants';

class PublicContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    const { allUsers, dispatchReducerOne, var1, currentUser } = this.props;
    return (
      <div>
        <div className="ibox">
          <div className="ibox-content">
            <FormattedMessage {...messages.fieldOne}/>
            { currentUser._id } length: { allUsers.length }
            Viet is awesome!
            <button className="btn btn-success" onClick={dispatchReducerOne}>Methods in reducer</button>
            Test redux state updated: {var1}
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

PublicContainer.propTypes = {
  allUsers: PropTypes.array,
  dispatchReducerOne: PropTypes.func,
  var1: PropTypes.string,
  currentUser: PropTypes.object,
  dispatchStopSagas: PropTypes.func
};

// publications here
/*
  In case of multiple publications..
  if (
  Meteor.subscribe('pub1').ready() &&
  Meteor.subscribe('pub2').ready() &&
  Meteor.subscribe('pub3').ready() &&
  ) {
    return {
      dataFromPub1: pub1Collection.find().fetch(),
      dataFromPub2: pub2Collection.find().fetch(),
      dataFromPub3: pub3Collection.find().fetch()
    }
  }

  return {
    dataFromPub1: [],
    dataFromPub2: null,
    dataFromPub3: [],
  }
*/
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
)(PublicContainer);
