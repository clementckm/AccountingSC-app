/*
 * RegisterAccount Messages
 *
 * This contains all the text for the RegisterAccount component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'containers.RegisterAccount.title',
    defaultMessage: 'Register your account'
  },
  description: {
    id: 'containers.RegisterAccount.title',
    defaultMessage: 'Please enter a password to access the company\'s dashboard'
  },
  alreadyLoggedIn: {
    id: 'containers.RegisterAccount.alreadyLoggedIn',
    defaultMessage: 'You are logged in, please go to the dashboard.'
  },
  proceedToDashboard: {
    id: 'containers.RegisterAccount.proceedToDashboard',
    defaultMessage: 'Proceed to Dashboard'
  },
  logOut: {
    id: 'containers.RegisterAccount.logOut',
    defaultMessage: 'Logout'
  },
  savePassword: {
    id: 'containers.RegisterAccount.savePassword',
    defaultMessage: 'Save Password'
  },
  goToLogin: {
    id: 'containers.RegisterAccount.goToLogin',
    defaultMessage: 'Go to login page'
  },
  needReset: {
    id: 'containers.RegisterAccount.needReset',
    defaultMessage: 'Need reset instruction?'
  },
  footer: {
    id: 'containers.RegisterAccount.footer',
    defaultMessage: 'This is a beta release'
  }
});
