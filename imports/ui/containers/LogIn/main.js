import React from 'react';
import { IntlProvider } from 'react-intl';
import { translationMessages } from './translations';
import LogIn from './index';
import { Provider } from 'react-redux-meteor';
import configureStore from '/imports/ui/layouts/store';
import reducer from './reducer';
import sagas from './sagas';
import globalVar from '/imports/utils/client/globalVar';

export default class LogInMain extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			currentLocale: 'en'
		};
	}

	componentWillMount () {
		const self = this;
		Tracker.autorun(() => {
			const currentLocale = globalVar.get('currentLocale') || 'en';
			self.setState({
				currentLocale
			});
		});
	}

	render () {
		const { currentLocale } = this.state;

		return (
			<Provider store = { configureStore('LogIn', reducer, sagas) }>
				<IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] }>
					<LogIn />
				</IntlProvider>
			</Provider>
		);
	}
}
