// meteor packages
import { check } from 'meteor/check';

// custom npm packages
import { logInfo, logWarn, logError } from '/imports/utils/server/logger';
import rateLimit from '/imports/utils/server/rate-limit';

Meteor.methods({
	'loggerMethods/logInfo' (component, message) {
		check(component, String);
		check(message, String);
		logInfo(component, message);
	},

	'loggerMethods/logWarn' (component, message) {
		check(component, String);
		check(message, String);
		logWarn(component, message);
	},

	'loggerMethods/logError' (component, message) {
		check(component, String);
		check(message, String);
		logError(component, message);
	}
});

rateLimit({
	methods: [
		'loggerMethods/logInfo',
		'loggerMethods/logWarn',
		'loggerMethods/logError'
	],
	limit: 5,
	timeRange: 1000
});
