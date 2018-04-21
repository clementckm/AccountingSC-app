import { createSelector } from 'reselect';

const selectJournal = () => state => state.getIn(['JournalEntry', 'journal']);
const selectSum = () => state => state.getIn(['JournalEntry', 'sum']);
const selectStatement = () => state => state.getIn(['JournalEntry', 'statement']);

export {
	selectJournal,
	selectSum,
	selectStatement
};
