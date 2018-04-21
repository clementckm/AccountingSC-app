/*
 *
 * CreateAccount reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEND_EMAIL_REDUCER
} from './constants';

const initialState = fromJS({
  email: ''
});

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SEND_EMAIL_REDUCER:
      return state.set('email', action.email);
    // ALWAYS INCLUDE CANCEL_SAGAS for app stability.
    case 'CANCEL_SAGAS':
      return state;
    default:
      return state;
  }
}
