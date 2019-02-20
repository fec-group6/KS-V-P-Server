import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SearchBar from '../../../client/components/SearchBar'
import App from '../../../client/App'

Enzyme.configure({ adapter: new Adapter() })

import mockFetch from '../../mocks/mockFetch'
mockFetch()

describe('SearchBar component', () => {
  test('SearchBar exists', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.exists()).toBe(true)
  });

  test('State automatically updates when user types something in our input field', () => {
    const appWrapper = mount(<App />);

    expect(appWrapper.state().search).toEqual('');
    appWrapper.find('#searchInputField').simulate('change', {
      target: { value: 'Hello search bar!' }
    })
    expect(appWrapper.state().search).toEqual('Hello search bar!');

  });
})
