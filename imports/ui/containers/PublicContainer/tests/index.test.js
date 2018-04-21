import PublicContainerMain from '../main';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<PublicContainer />', () => {
  it('Expect to have unit tests specified', () => {
    const wrapper = shallow(<PublicContainerMain />);
    expect(wrapper).toEqual(false);
  });
});
