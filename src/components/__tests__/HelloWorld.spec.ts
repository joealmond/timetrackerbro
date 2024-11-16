import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SimpleMessage from '../SimpleMessage.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(SimpleMessage, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
