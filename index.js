import Money from './src/components/money/money.vue'
import TableVdlidate from './src/components/table-validate/table-validate.vue'
import TableFormItem from './src/components/table-validate/table-form-item.vue'

const components = [
  Money,
  TableVdlidate,
  TableFormItem
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.1.1',
  install
}
