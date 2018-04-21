import React from 'react';
import { IntlProvider } from 'react-intl';
import { translationMessages } from './translations';
import ChangePassword from './index';
import { Provider } from 'react-redux-meteor';
import configureStore from '/imports/ui/layouts/store';
import reducer from './reducer';
import sagas from './sagas';
export default class ChangePasswordMain extends React.Component {
	render () {
		const currentLocale = Session.get('currentLocale') || 'en';
		return (
			<Provider store = { configureStore('ChangePassword', reducer, sagas) }>
				<IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] }>
					<ChangePassword />
				</IntlProvider>
			</Provider>
			);
	}
}
