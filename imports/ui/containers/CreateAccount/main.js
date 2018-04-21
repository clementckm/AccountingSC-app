// npm packages
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux-meteor';

// custom imports
import { translationMessages } from './translations';
import CreateAccount from './index';
import configureStore from '/imports/ui/layouts/store';
import reducer from './reducer';
import sagas from './sagas';

export default class CreateAccountMain extends React.Component {
	render () {
		const currentLocale = Session.get('currentLocale') || 'en';
		return (
			<Provider store = { configureStore('CreateAccount', reducer, sagas) }>
				<IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] }>
					<CreateAccount />
				</IntlProvider>
			</Provider>
			);
	}
}
