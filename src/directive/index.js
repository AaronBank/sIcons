import validator from './validator'

export default (Vue) => {
  Vue.use(validator, {
    eventPatch: {
      prefix: 'on-'
    },
    triggerEvent: ['change'],
    successHandler (conclusion, value, options) {
      const parent = options.el.parentNode

      if (parent.className.indexOf('ivu-form-item-error') !== -1) {
        const node = parent.getElementsByClassName('ivu-form-item-error-tip')[0]
        parent.removeChild(node)
        parent.className = parent.className.replace(' ivu-form-item-error', '')
      }
    },
    errorHandler (conclusion, value, options) {
      const parent = (options.el || options.compIns.$el).parentNode
      let node

      if (parent.className.indexOf('ivu-form-item-error') !== -1) {
        node = parent.getElementsByClassName('ivu-form-item-error-tip')[0]
        node.innerHTML = conclusion.message
      } else {
        node = document.createElement('div')
        node.className = 'ivu-form-item-error-tip'
        node.innerHTML = conclusion.message

        parent.appendChild(node)
        parent.className = parent.className + ' ivu-form-item-error'
      }
    }
  })
}
