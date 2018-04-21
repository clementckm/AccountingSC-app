// npm package
import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

// custom imports
import LanguageToggle from '/imports/ui/components/LanguageToggle';
class MinorLayout extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	componentWillMount () {
		$('body').addClass('gray-bg');
	}

	render () {
		return (
			<div className="text-center loginscreen animated fadeInDown">
				{ this.props.main }
				<div className="hr-line-dashed"></div>
				<center>
					<LanguageToggle />
				</center>
			</div>
			);
	}
}

MinorLayout.propTypes = {
	main: PropTypes.object
};

export default MinorLayout;
