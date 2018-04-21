import { createSelector } from 'reselect';

const selectVar1 = () => state => state.getIn(['AccountingModule', 'var1']);

export {
	selectVar1,
};
