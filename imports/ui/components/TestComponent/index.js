/**
*
* TestComponent
*
*/

import React from 'react';

import { FormattedMessage, IntlProvider } from 'react-intl';
import messages from './messages';
import { translationMessages } from './translations';
import styles from './styles';
import PropTypes from 'prop-types';

// import * as logger from '/imports/utils/client/logger';
import * as globalVar from '/imports/utils/client/globalVar';

class TestComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props);
    this.state = {
      currentLocale: 'en'
    };
  }

  componentWillMount () {
    const self = this;
    Tracker.autorun(() => {
      const currentLocale = globalVar.get('currentLocale') || 'en';
      self.setState({
        currentLocale
      });
    });
  }

  render () {
    const { currentLocale } = this.state;

    return (
      <IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] } >
        <div style={styles.mainContainer}>
          <FormattedMessage {...messages.header} />
        </div>
      </IntlProvider>
    );
  }
}

TestComponent.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string
  // requiredArray: PropTypes.array.isRequired
};

export default TestComponent;
