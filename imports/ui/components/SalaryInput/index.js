/**
*
* SalaryInput
*
*/

import React from 'react';


import { FormattedMessage, IntlProvider } from 'react-intl';
import messages from './messages';
import { translationMessages } from './translations';
import styles from './styles';
import PropTypes from 'prop-types';

class SalaryInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const currentLocale = Session.get('currentLocale') || 'en';
    return (
      <IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] } >
        <div style={styles.mainContainer}>
          <form>
            <FormattedMessage {...messages.headerOne} />
            <input
              type="text"
              ref="employeeName"
              placeholder="Type in the name"
            />
            <FormattedMessage {...messages.headerTwo} />
            <input
              type="number"
              ref="salary"
              placeholder="Type in the salary"
            />
          </form>
            <button onClick={()=>this.props.passRefUpward(this.refs)}>Add</button>
        </div>
      </IntlProvider>
    );
  }
}

SalaryInput.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  // requiredArray: PropTypes.array.isRequired
};

export default SalaryInput;
