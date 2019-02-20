import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import VideoList from '../../../client/components/VideoList'

Enzyme.configure({ adapter: new Adapter() })

describe('VideoList component', () => {
  test('VideoList exists', () => {
    const wrapper = shallow(<VideoList />);
    expect(wrapper.exists()).toBe(true)
  });
})