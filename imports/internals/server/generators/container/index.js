/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    }
  }, {
    type: 'list',
    name: 'layoutType',
    message: 'Select the layout for your container (MainLayout for full view with navbar, MinorLayout for bare view)',
    default: 'MainLayout',
    choices: () => ['MainLayout', 'MinorLayout']
  }, {
    type: 'list',
    name: 'routeType',
    message: 'Select the route type for your container (publicRoutes has no authentication, privateRoutes only for signed in user)',
    default: 'privateRoutes',
    choices: () => ['publicRoutes', 'privateRoutes']
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/index.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true
    }, {
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/tests/index.test.js',
      templateFile: './container/test.js.hbs',
      abortOnFail: true
    }];

    // If component wants messages
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/messages.js',
      templateFile: './container/messages.js.hbs',
      abortOnFail: true
    });

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer

    // Actions
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/actions.js',
      templateFile: './container/actions.js.hbs',
      abortOnFail: true
    });
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/tests/actions.test.js',
      templateFile: './container/actions.test.js.hbs',
      abortOnFail: true
    });

    // Constants
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/constants.js',
      templateFile: './container/constants.js.hbs',
      abortOnFail: true
    });

    // Styles
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/styles.js',
      templateFile: './container/styles.js.hbs',
      abortOnFail: true
    });

    // Selectors
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/selectors.js',
      templateFile: './container/selectors.js.hbs',
      abortOnFail: true
    });
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/tests/selectors.test.js',
      templateFile: './container/selectors.test.js.hbs',
      abortOnFail: true
    });

    // Reducer
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/reducer.js',
      templateFile: './container/reducer.js.hbs',
      abortOnFail: true
    });
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/tests/reducer.test.js',
      templateFile: './container/reducer.test.js.hbs',
      abortOnFail: true
    });

    // Sagas

    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/sagas.js',
      templateFile: './container/sagas.js.hbs',
      abortOnFail: true
    });
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/tests/sagas.test.js',
      templateFile: './container/sagas.test.js.hbs',
      abortOnFail: true
    });

    // Add main js
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/main.js',
      templateFile: './container/main.js.hbs',
      abortOnFail: true
    });

    // Add all files in translations folder
    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/translations/en.json',
      templateFile: './container/translations/en.json.hbs',
      abortOnFail: true
    });

    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/translations/zh.json',
      templateFile: './container/translations/zh.json.hbs',
      abortOnFail: true
    });

    actions.push({
      type: 'add',
      path: '../../../ui/containers/{{properCase name}}/translations/index.js',
      templateFile: './container/translations/index.js.hbs',
      abortOnFail: true
    });

    // Add publications for this container
    actions.push({
      type: 'add',
      path: '../../../publications/{{properCase name}}/constants.js',
      templateFile: './publications/constants.js.hbs',
      abortOnFail: true
    });

    actions.push({
      type: 'add',
      path: '../../../publications/{{properCase name}}/server/publications.js',
      templateFile: './publications/publications.js.hbs',
      abortOnFail: true
    });

    // Modify startup/client/registerTemplates
    actions.push({
      type: 'modify',
      path: '../../../startup/client/index.js',
      pattern: '//add_new_imports',
      templateFile: './startup/client/template.hbs'
    });

    // Modify startup/server/registerAPI.js
    actions.push({
      type: 'modify',
      path: '../../../startup/server/register-publications.js',
      pattern: '//add_new_publications',
      templateFile: './startup/server/api_publications.hbs'
    });

    // Put container in a route with same name
    actions.push({
      type: 'modify',
      path: '../../../startup/client/routes.js',
      pattern: '//add_new_route',
      templateFile: './route/routes.hbs'
    });

    actions.push({
      type: 'modify',
      path: '../../../startup/client/routes.js',
      pattern: '//add_import_for_new_route',
      templateFile: './route/importForRoutes.hbs'
    });

    return actions;
  }
};
