module.exports = {
	verbose: true,
  moduleNameMapper: {
    '^meteor/session$': '<rootDir>/imports/utils/server/jest-mocker/meteorSession',
  }
};
