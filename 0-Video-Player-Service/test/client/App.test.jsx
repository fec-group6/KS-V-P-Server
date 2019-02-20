import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from '../../client/App'

Enzyme.configure({ adapter: new Adapter() })

import mockFetch from '../mocks/mockFetch'
mockFetch()

describe('App component', () => {
  test('App exists', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true)
  });

  test('State automatically updates when user types something in our input field', () => {
    const appWrapper = mount(<App />);
    expect(appWrapper.state().search).toEqual('');
    expect(appWrapper.state().video).toEqual(null);
  });
})
