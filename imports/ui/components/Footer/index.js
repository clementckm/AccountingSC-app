import React from 'react';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from '../../containers/LocaleToggle';

export default class Footer extends React.Component {
  render () {
    return (
      <div className="footer">
        <div className="pull-right">
          <LocaleToggle />
        </div>
        <div>
          <FormattedMessage {...messages.disclaimer} /><a href="/errors">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
        </div>
      </div>
    );
  }
}
