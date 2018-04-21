import React from 'react';
import { IntlProvider } from 'react-intl';
import { translationMessages } from './translations';
import FinancialStatement from './index';
import { Provider } from 'react-redux-meteor';
import configureStore from '/imports/ui/layouts/store';
import reducer from './reducer';
import sagas from './sagas';
export default class FinancialStatementMain extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const currentLocale = Session.get('currentLocale') || 'en';
		return (
			<Provider store = { configureStore('FinancialStatement', reducer, sagas) }>
				<IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] }>
					<FinancialStatement />
				</IntlProvider>
			</Provider>
			)
	}
}