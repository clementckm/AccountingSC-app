import { GET_ALL_USERS } from '../constants';

Meteor.publish(GET_ALL_USERS, function () {
	if (!this.userId) return [];
	return Meteor.users.find({}, {limit: 10});
});
