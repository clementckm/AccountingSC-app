/*
*
* JournalEntry
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
import { REFRESH_LEDGER, INIT_STATEMENT, UPDATE_STATEMENT } from './constants';
import { GET_ALL_USERS } from '/imports/publications/JournalEntry/constants';
import styles from './styles';
import * as logger from '/imports/utils/client/logger';
import * as globalVar from '/imports/utils/client/globalVar';

import JournalEntryUi from '../../components/JournalEntryUi';
import FinancialStatementUi from '../../components/FinancialStatementUi';

class JournalEntry extends React.Component {
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

    };
  }

  render () {
    const {
      allUsers,
      dispatchRefreshLedger,
      dispatchInitStatement,
      dispatchUpdateStatement,
      journal,
      sum,
      statement,
      currentUser
    } = this.props;
    return (
      <div>
        <div className="ibox">
          <div className="ibox-content">
            <div style={styles.mainContainer}>
              <button className="btn btn-success" onClick={dispatchRefreshLedger}>Refresh Ledger</button>
                <table>
                  <thead>
                    <tr>
                      <th>Journal ID</th>
                      <th>Amount</th>
                      <th>AssetClass1</th>
                      <th>AssetClass2</th>
                      <th>Debit (FSLI1)</th>
                      <th>Credit (FSLI2)</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                     {journal.map((item, i) => <JournalEntryUi key={i} num={i} amount={item.getLedgerAmount} assetClass1={item.getLedgerAssetClass1} assetClass2={item.getLedgerAssetClass2} fsli1={item.getLedgerFsli1} fsli2={item.getLedgerFsli2} description={item.getLedgerDescription} />)}
                  </tbody>
                </table>
              <button className="btn btn-success" onClick={dispatchInitStatement}>Init Financial Statement</button>
              <button className="btn btn-success" onClick={dispatchUpdateStatement}>Update Financial Statement</button>
                <FinancialStatementUi
                  cash={statement.cash}
                  receivable={statement.receivable}
                  payable={statement.payable}
                  shareCapital={statement.shareCapital}
                  retainedEarnings={statement.retainedEarnings}
                  revenue={statement.revenue}
                  expense={statement.expense}
                  getCashSum={sum.getCashSum}
                  getReceivableSum={sum.getReceivableSum}
                  getPayableSum={sum.getPayableSum}
                  getShareCapitalSum={sum.getShareCapitalSum}
                  getRevenueSum={sum.getRevenueSum}
                  getExpenseSum={sum.getExpenseSum}
                 />
            </div>
          </div>
        </div>
      </div>
      );
  }

  // componentDidMount () {
  //   const { dispatchRefreshLedger } = this.props;
  //   dispatchRefreshLedger();
  // }

  // Keep this function intact to ensure app stability
  componentWillUnmount () {
    const { dispatchStopSagas } = this.props;
    dispatchStopSagas();
  }
}

JournalEntry.propTypes = {
  allUsers: PropTypes.array,
  dispatchRefreshLedger: PropTypes.func,
  dispatchInitStatement: PropTypes.func,
  dispatchUpdateStatement: PropTypes.func,
  dispatchStopSagas: PropTypes.func,
  journal: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  sum: PropTypes.object,
  statement: PropTypes.object,
  currentUser: PropTypes.object
};
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
    dispatchRefreshLedger: () => {
      dispatch({
        type: REFRESH_LEDGER
      });
    },
    dispatchInitStatement: () => {
      dispatch({
        type: INIT_STATEMENT
      });
    },
    dispatchUpdateStatement: () => {
      dispatch({
        type: UPDATE_STATEMENT
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
  journal: selectors.selectJournal(),
  sum: selectors.selectSum(),
  statement: selectors.selectStatement()

});

export default connect(
  mapTrackerToProps,
  mapStateToProps,
  mapDispatchToProps
)(JournalEntry);
