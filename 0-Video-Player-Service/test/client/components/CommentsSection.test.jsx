import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import CommentsSection from '../../../client/components/CommentsSection'

Enzyme.configure({ adapter: new Adapter() })

describe('CommentsSection component', () => {
  test('CommentsSection exists', () => {
    const wrapper = shallow(<CommentsSection />);
    expect(wrapper.exists()).toBe(true)
  });
})