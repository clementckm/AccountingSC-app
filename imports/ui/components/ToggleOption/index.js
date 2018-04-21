/**
*
* ToggleOption
*
*/

import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
const ToggleOption = ({ value, message, intl }) => (
  <option value={value}>
    {intl.formatMessage(message)}
  </option>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(ToggleOption);
