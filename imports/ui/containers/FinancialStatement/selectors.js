import { createSelector } from 'reselect';

const selectVar1 = () => state => state.getIn(['FinancialStatement', 'var1']);

export {
	selectVar1,
};
