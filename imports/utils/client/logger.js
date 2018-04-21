import { Meteor } from 'meteor/meteor';

export const info = (...args) => {
	let finalMessage = `\n====START INFO LOG====`;
	console.log('arguments', args);
	for (let i = 1; i < args.length; i++) {
		finalMessage += `\n${JSON.stringify(args[i])}`;
	}
	finalMessage += `\n====END INFO LOG ====`;

	console.log(args[0], finalMessage);
	Meteor.call('loggerMethods/logInfo', args[0], finalMessage);
};

export const warn = (...args) => {
	let finalMessage = `\n====START WARN LOG====`;
	for (let i = 1; i < args.length; i++) {
		finalMessage += `\n${JSON.stringify(args[i])}`;
	}
	finalMessage += `\n====END WARN LOG ====`;

	console.log(args[0], finalMessage);
	Meteor.call('loggerMethods/logWarn', args[0], finalMessage);
};

export const error = (...args) => {
	let finalMessage = `\n====START ERROR LOG====`;
	for (let i = 1; i < args.length; i++) {
		finalMessage += `\n${JSON.stringify(args[i])}`;
	}
	finalMessage += `\n====END ERROR LOG ====`;

	console.log(`%c${args[0]} ${finalMessage}`, 'color: #D91E18');
	Meteor.call('loggerMethods/logError', args[0], finalMessage);
};
