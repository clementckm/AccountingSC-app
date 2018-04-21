import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import MainLayout from '/imports/ui/layouts/MainLayout';
import MinorLayout from '/imports/ui/layouts/MinorLayout';
import SampleContainer from '/imports/ui/containers/SampleContainer/main';

import PublicContainer from '/imports/ui/containers/PublicContainer/main';

import LogIn from '/imports/ui/containers/LogIn/main';

import ResetPassword from '/imports/ui/containers/ResetPassword/main';

import RegisterAccount from '/imports/ui/containers/RegisterAccount/main';

import CreateAccount from '/imports/ui/containers/CreateAccount/main';

import ChangePassword from '/imports/ui/containers/ChangePassword/main';

import SalaryModule from '/imports/ui/containers/SalaryModule/main';

import JournalEntry from '/imports/ui/containers/JournalEntry/main';

import AccountingModule from '/imports/ui/containers/AccountingModule/main';

import FinancialStatement from '/imports/ui/containers/FinancialStatement/main';

//add_import_for_new_route





// validation logic
const checkIfVE = function (ctx, redirect) {
	if (!Meteor.user() && !Meteor.loggingIn()) {
		redirect('login');
	}
};

const redirectIfLoggedIn = function (ctx, redirect) {
	if (Meteor.userId() && FlowRouter.getRouteName() !== 'logout') {
		redirect('sampleContainer');
	}
};

// Set up routes group in the app
const publicRoutes = FlowRouter.group({
	name: 'publicRoutes',
	triggersEnter: [
		redirectIfLoggedIn
	]
});

const privateRoutes = FlowRouter.group({
  name: 'privateRoutes',
  triggersEnter: [
    checkIfVE
  ]
});

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action () {
    FlowRouter.go('sampleContainer');
  }
});

privateRoutes.route('/SampleContainer', {
  name: 'sampleContainer',
  action () {
    mount(MainLayout, {
      main: <SampleContainer/>
    });
  }
});

publicRoutes.route('/PublicContainer', {
  name: 'publicContainer',
  action () {
    mount(MinorLayout, {
      main: <PublicContainer/>
    });
  }
});

publicRoutes.route('/login', {
  name: 'login',
  action () {
    mount(MinorLayout, {
      main: <LogIn/>
    });
  }
});

publicRoutes.route('/ResetPassword', {
  name: 'resetPassword',
  action () {
    mount(MinorLayout, {
      main: <ResetPassword/>
    });
  }
});

publicRoutes.route('/RegisterAccount', {
  name: 'registerAccount',
  action () {
    mount(MinorLayout, {
      main: <RegisterAccount/>
    });
  }
});

publicRoutes.route('/LogOut', {
  name: 'logout',
  action () {
    if (Meteor.userId()) {
      Meteor.logout(() => {
        FlowRouter.go('login');
      });
    }
  }
});

publicRoutes.route('/CreateAccount', {
  name: 'createAccount',
  action () {
    mount(MinorLayout, {
      main: <CreateAccount/>
    });
  }
});

privateRoutes.route('/ChangePassword', {
  name: 'changePassword',
  action () {
    mount(MainLayout, {
      main: <ChangePassword/>
    });
  }
});

privateRoutes.route('/SalaryModule', {
  name: 'salaryModule',
  action() {
    mount(MainLayout, {
      main: <SalaryModule/>,
    });
  },
});

privateRoutes.route('/JournalEntry', {
  name: 'journalEntry',
  action() {
    mount(MainLayout, {
      main: <JournalEntry/>,
    });
  },
});

privateRoutes.route('/AccountingModule', {
  name: 'accountingModule',
  action() {
    mount(MainLayout, {
      main: <AccountingModule/>,
    });
  },
});

privateRoutes.route('/FinancialStatement', {
  name: 'financialStatement',
  action() {
    mount(MainLayout, {
      main: <FinancialStatement/>,
    });
  },
});

//add_new_route
