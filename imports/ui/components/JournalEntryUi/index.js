/**
*
* JournalEntryUi
*
*/

import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage, IntlProvider } from 'react-intl';
import messages from './messages';
import { translationMessages } from './translations';
import styles from './styles';

class JournalEntryUi extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    const currentLocale = Session.get('currentLocale') || 'en';
    return (
      <IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] } >
            <tr>
              <td>{this.props.num}</td>
              <td>{this.props.amount}</td>
              <td>{this.props.assetClass1}</td>
              <td>{this.props.assetClass2}</td>
              <td>{this.props.fsli1}</td>
              <td>{this.props.fsli2}</td>
              <td>{this.props.description}</td>
            </tr>
      </IntlProvider>
    );
  }
}

JournalEntryUi.propTypes = {
  num: PropTypes.number,
  amount: PropTypes.number,
  assetClass1: PropTypes.string,
  assetClass2: PropTypes.string,
  fsli1: PropTypes.string,
  fsli2: PropTypes.string,
  description: PropTypes.string
};

export default JournalEntryUi;
