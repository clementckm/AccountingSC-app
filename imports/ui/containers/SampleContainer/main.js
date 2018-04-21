import React from 'react';
import { IntlProvider } from 'react-intl';
import { translationMessages } from './translations';
import SampleContainer from './index';
import { Provider } from 'react-redux-meteor';
import configureStore from '/imports/ui/layouts/store';
import reducer from './reducer';
import sagas from './sagas';

// import * as logger from '/imports/utils/client/logger';
import * as globalVar from '/imports/utils/client/globalVar';

export default class SampleContainerMain extends React.Component {
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
			<Provider store = { configureStore('SampleContainer', reducer, sagas) }>
				<IntlProvider locale={ currentLocale } key={ currentLocale } messages={ translationMessages[currentLocale] }>
					<SampleContainer />
				</IntlProvider>
			</Provider>
			);
	}
}
