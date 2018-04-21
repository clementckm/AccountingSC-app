/**
*
* FinancialStatementUi
*
*/

import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage, IntlProvider } from 'react-intl';
import messages from './messages';
import { translationMessages } from './translations';
import styles from './styles';

class FinancialStatementUi extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    const currentLocale = Session.get('currentLocale') || 'en';
    return (
      <IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] } >
        <div style={styles.mainContainer}>
          <h3><FormattedMessage {...messages.header} /></h3>
            <div className="statement">
              <h4><FormattedMessage {...messages.subHeaderOne} /></h4>
              <FormattedMessage {...messages.dateOne} />
                <table className="statement-content">
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Amount($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="statement-content-header"><b>Asset</b></td>
                      <td><b>{this.props.cash + this.props.receivable + (this.props.getCashSum || 0) + (this.props.getReceivableSum || 0)}</b></td>
                    </tr>
                    <tr>
                      <td>Cash</td>
                      <td>
                        {this.props.cash + (this.props.getCashSum || 0)}</td>
                    </tr>
                    <tr>
                      <td>Receivable</td>
                      <td>{this.props.receivable + (this.props.getReceivableSum || 0)}</td>
                    </tr>
                    <tr>
                      <td className="statement-content-header"><b>Liability</b></td>
                      <td><b>{this.props.payable + (this.props.getPayableSum || 0)}</b></td>
                    </tr>
                    <tr>
                      <td>Payable</td>
                      <td>{this.props.payable + (this.props.getPayableSum || 0)}</td>
                    </tr>
                    <tr>
                      <td className="statement-content-header"><b>Equity</b></td>
                      <td><b>{this.props.shareCapital +
                        this.props.revenue - this.props.expense +
                        (this.props.getRevenueSum || 0) - (this.props.getExpenseSum || 0) + (this.props.getShareCapitalSum || 0)}
                      </b></td>
                    </tr>
                    <tr>
                      <td>Share Capital</td>
                      <td>{this.props.shareCapital + (this.props.getShareCapitalSum || 0)}</td>
                    </tr>
                    <tr>
                      <td>Retained Earnings</td>
                      <td>{this.props.revenue - this.props.expense + (this.props.getRevenueSum || 0) - (this.props.getExpenseSum || 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              <h4><FormattedMessage {...messages.subHeaderTwo} /></h4>
              <FormattedMessage {...messages.dateTwo} />
                <table className="statement-content">
                  <thead>
                    <tr>
                      <th><b>Items</b></th>
                      <th><b>Amount($)</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Revenue</td>
                      <td>{this.props.revenue + (this.props.getRevenueSum || 0)}</td>
                    </tr>
                    <tr>
                      <td>Expense</td>
                      <td>{(this.props.getExpenseSum || 0) + this.props.expense}</td>
                    </tr>
                    <tr>
                      <td className="statement-content-header">Profit before Tax</td>
                      <td>{this.props.revenue + (this.props.getRevenueSum || 0) - (this.props.getExpenseSum || 0) - this.props.expense}</td>
                    </tr>
                  </tbody>
                </table>
          </div>
        </div>
      </IntlProvider>
    );
  }
}

FinancialStatementUi.propTypes = {
  cash: PropTypes.number,
  receivable: PropTypes.number,
  payable: PropTypes.number,
  shareCapital: PropTypes.number,
  retainedEarnings: PropTypes.number,
  revenue: PropTypes.number,
  expense: PropTypes.number,
  getCashSum: PropTypes.number,
  getReceivableSum: PropTypes.number,
  getPayableSum: PropTypes.number,
  getShareCapitalSum: PropTypes.number,
  getRevenueSum: PropTypes.number,
  getExpenseSum: PropTypes.number
};

export default FinancialStatementUi;
