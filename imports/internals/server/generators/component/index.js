/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
  // {
  //   type: 'list',
  //   name: 'type',
  //   message: 'Select the type of component',
  //   default: 'Stateless Function',
  //   choices: () => ['Stateless Function', 'ES6 Class'],
  // }, 
  {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    }
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
    // let componentTemplate;

    // switch (data.type) {
    //   case 'ES6 Class': {
    //     componentTemplate = './component/es6.js.hbs';
    //     break;
    //   }
    //   case 'Stateless Function': {
    //     componentTemplate = './component/stateless.js.hbs';
    //     break;
    //   }
    //   default: {
    //     componentTemplate = './component/es6.js.hbs';
    //   }
    // }

    const actions = [{
      type: 'add',
      path: '../../../ui/components/{{properCase name}}/index.js',
      templateFile: './component/es6.js.hbs',
      abortOnFail: true
    }, {
      type: 'add',
      path: '../../../ui/components/{{properCase name}}/tests/index.test.js',
      templateFile: './component/test.js.hbs',
      abortOnFail: true
    }];

    // Add all files in translations folder
    actions.push({
      type: 'add',
      path: '../../../ui/components/{{properCase name}}/translations/en.json',
      templateFile: './component/translations/en.json.hbs',
      abortOnFail: true
    });

    actions.push({
      type: 'add',
      path: '../../../ui/components/{{properCase name}}/translations/zh.json',
      templateFile: './component/translations/zh.json.hbs',
      abortOnFail: true
    });

    actions.push({
      type: 'add',
      path: '../../../ui/components/{{properCase name}}/translations/index.js',
      templateFile: './component/translations/index.js.hbs',
      abortOnFail: true
    });

    // Add i18n messages
    actions.push({
      type: 'add',
      path: '../../../ui/components/{{properCase name}}/messages.js',
      templateFile: './component/messages.js.hbs',
      abortOnFail: true
    });

    // Add local styles 
    actions.push({
      type: 'add',
      path: '../../../ui/components/{{properCase name}}/styles.js',
      templateFile: './component/styles.js.hbs',
      abortOnFail: true
    });

    return actions;
  }
};
