/*
*
* SalaryModule
*
*/
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from 'react-redux-meteor';
import { toJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';
import { UPDATE_LEDGER } from './constants';
import { GET_ALL_USERS } from '/imports/publications/SalaryModule/constants';
import styles from './styles';
import * as logger from '/imports/utils/client/logger';
import * as globalVar from '/imports/utils/client/globalVar';

class SalaryModule extends React.Component {
  constructor (props) {
    super(props);

    // Log messages to server
    // logger.info('SampleContainer', {gg: 'gg'}, 'hehe');
    // logger.warn('SampleContainer', {gg: 'gg'}, 'hehe');
    // logger.error('SampleContainer', {gg: 'gg'}, 'hehe', {coolstory: 'coolstory'});

    // Set globalVar
    // globalVar.set('hehehe', 'hihi');
    // globalVar.get('hehehe'); //hihi
    // globalVar.setPersistent('hehehe', 'hihi');
    // globalVar.remove('hehehe');

    this.state = {
      employeeName: '',
      salary: ''
    };
    this.handleSalaryChanged = this.handleSalaryChanged.bind(this);
  }

  handleSalaryChanged(evt) {
      const name = evt.target.name;
      const value = evt.target.value;

      this.setState({
        [name]: value
      });
  }

  render () {
    const {
      allUsers,
      updateLedger,
      updateEvent,
      currentUser,
      employeeName,
      salary
    } = this.props;
    return (
      <div>
        <div className="ibox">
          <div className="ibox-content">
            <div style={styles.mainContainer}>
              <h1><FormattedMessage {...messages.header}/></h1>
              <h2><FormattedMessage {...messages.subHeader}/></h2>
              <div style={styles.mainContainer}>
                <form>
                  <FormattedMessage {...messages.headerOne} />
                    <input
                      name="employeeName"
                      type="employeeName"
                      onChange={this.handleSalaryChanged}
                      placeholder="Type in the name"
                    />
                  <FormattedMessage {...messages.headerTwo} />
                    <input
                      name="salary"
                      type="salary"
                      onChange={this.handleSalaryChanged}
                      placeholder="Type in the salary"
                    />
                </form>
                    <button className="btn btn-success" onClick={evt => updateLedger(this.state.employeeName, this.state.salary)}>Add</button>
                    <h3>{updateEvent}</h3>
              </div>
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

// Publications here
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
    updateLedger: (employeeName, salary) => {
      dispatch({
        type: UPDATE_LEDGER,
         employeeName,
         salary
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
  updateEvent: selectors.selectUpdateEvent()
});

export default connect(
  mapTrackerToProps,
  mapStateToProps,
  mapDispatchToProps
)(SalaryModule);
