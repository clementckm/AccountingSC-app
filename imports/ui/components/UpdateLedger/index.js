/**
*
* UpdateLedger
*
*/

import React from 'react';


import { FormattedMessage, IntlProvider } from 'react-intl';
import messages from './messages';
import { translationMessages } from './translations';
import styles from './styles';

class UpdateLedger extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
          <FormattedMessage {...messages.header} />
        </div>
      </IntlProvider>
    );
  }
}

UpdateLedger.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  // requiredArray: PropTypes.array.isRequired
};

export default UpdateLedger;
