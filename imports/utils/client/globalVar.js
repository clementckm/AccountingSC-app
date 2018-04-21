import { Session } from 'meteor/session';

export const set = (key, value) => {
	Session.set(key, value);
};

export const get = (key) => {
	return Session.get(key);
};

export const setPersistent = (key, value) => {
	Session.setPersistent(key, value);
};

export const remove = (key) => {
	delete Session.keys[key];
};
