/**
*
* LanguageToggle
*
*/

import React from 'react';

import { FormattedMessage, IntlProvider } from 'react-intl';
import messages from './messages';
import { translationMessages } from './translations';
import PropTypes from 'prop-types';
// import styles from './styles';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import globalVar from '/imports/utils/client/globalVar';

class LanguageToggle extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        <div>
          <DropdownButton title={currentLocale} id="bg-nested-dropdown">
            <MenuItem eventKey="1" onClick={() => globalVar.set('currentLocale', 'en')}>
              <FormattedMessage {...messages.english}/>
            </MenuItem>
            <MenuItem eventKey="2" onClick={() => globalVar.set('currentLocale', 'zh')}>
              <FormattedMessage {...messages.chinese}/>
            </MenuItem>
          </DropdownButton>
        </div>
      </IntlProvider>
    );
  }
}

LanguageToggle.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string
  // requiredArray: PropTypes.array.isRequired
};

export default LanguageToggle;
