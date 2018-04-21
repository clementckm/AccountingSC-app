import winston from 'winston';

const logger = new winston.Logger({
	level: Meteor.settings.private.logger.level,
	transports: [
		new (winston.transports.Console)()
	]
});

export const logInfo = (component, message) => {
	let userId = Meteor.userId() || 'Random User';
	logger.info(`[${component}] User - ${userId}: ${message}`);
};

export const logWarn = (component, message) => {
	let userId = Meteor.userId() || 'Random User';
	logger.warn(`[${component}] User - ${userId}: ${message}`);
};

export const logError = (component, message) => {
	let userId = Meteor.userId() || 'Random User';
	logger.error(`[${component}] User - ${userId}: ${message}`);
};
