import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import VideoPlayer from '../../../client/components/VideoPlayer'

Enzyme.configure({ adapter: new Adapter() })

describe('VideoPlayer component', () => {
  test('VideoPlayer exists', () => {
    
    const wrapper = shallow(<VideoPlayer />);
    expect(wrapper.exists()).toBe(true)
  });
})