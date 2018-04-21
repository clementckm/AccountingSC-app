import { createSelector } from 'reselect';

const selectUpdateEvent = () => state => state.getIn(['SalaryModule', 'updateEvent']);

export {
	selectUpdateEvent
};
