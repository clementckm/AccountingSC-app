/*
 *
 * JournalEntry reducer
 *
 */

import { fromJS } from 'immutable';
import { RETURN_LEDGER, RETURN_STATEMENT, REFRESH_STATEMENT } from './constants';

const initialState = fromJS({
  journal: [],
  statement: [],
  sum:[]
});

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case RETURN_LEDGER:
    return state.set('journal', action.journal);
    case RETURN_STATEMENT:
    return state.set('statement', action.statement);
    case REFRESH_STATEMENT:
    return state.set('sum', action.sum);
  // ALWAYS INCLUDE CANCEL_SAGAS for app stability.
    case 'CANCEL_SAGAS':
    return state;
  default:
    return state;
  }
}
