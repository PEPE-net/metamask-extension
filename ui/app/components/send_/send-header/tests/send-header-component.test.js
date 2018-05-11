import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { DEFAULT_ROUTE } from '../../../../routes'
import SendHeader from '../send-header.component.js'

import PageContainerHeader from '../../../page-container/page-container-header'

const propsMethodSpies = {
  clearSend: sinon.spy(),
}
const historySpies = {
  push: sinon.spy(),
}

sinon.spy(SendHeader.prototype, 'onClose')

describe('SendHeader Component', function () {
  let wrapper
  let instance

  beforeEach(() => {
    wrapper = shallow(<SendHeader
      clearSend={propsMethodSpies.clearSend}
      history={historySpies}
      isToken={false}
    />, { context: { t: str => str } })
    instance = wrapper.instance()
  })

  afterEach(() => {
    propsMethodSpies.clearSend.resetHistory()
    historySpies.push.resetHistory()
    SendHeader.prototype.onClose.resetHistory()
  })

  describe('onClose', () => {
    it('should call clearSend', () => {
      assert.equal(propsMethodSpies.clearSend.callCount, 0)
      wrapper.instance().onClose()
      assert.equal(propsMethodSpies.clearSend.callCount, 1)
    })

    it('should call history.push', () => {
      assert.equal(historySpies.push.callCount, 0)
      wrapper.instance().onClose()
      assert.equal(historySpies.push.callCount, 1)
      assert.equal(historySpies.push.getCall(0).args[0], DEFAULT_ROUTE)
    })
  })

  describe('render', () => {
    it('should render a PageContainerHeader compenent', () => {
      assert.equal(wrapper.find(PageContainerHeader).length, 1)
    })

    it('should pass the correct props to PageContainerHeader', () => {
      const {
        onClose,
        subtitle,
        title,
      } = wrapper.find(PageContainerHeader).props()
      assert.equal(subtitle, 'onlySendToEtherAddress')
      assert.equal(title, 'sendETH')
      assert.equal(SendHeader.prototype.onClose.callCount, 0)
      onClose()
      assert.equal(SendHeader.prototype.onClose.callCount, 1)
    })
  })
})