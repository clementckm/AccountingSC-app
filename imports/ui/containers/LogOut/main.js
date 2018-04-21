import React from 'react';
import { IntlProvider } from 'react-intl';
import { translationMessages } from './translations';
import LogOut from './index';
import { Provider } from 'react-redux-meteor';
import configureStore from '/imports/ui/layouts/store';
import reducer from './reducer';
import sagas from './sagas';
export default class LogOutMain extends React.Component {
	render () {
		const currentLocale = Session.get('currentLocale') || 'en';
		return (
			<Provider store = { configureStore('LogOut', reducer, sagas) }>
				<IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] }>
					<LogOut />
				</IntlProvider>
			</Provider>
			);
	}
}
