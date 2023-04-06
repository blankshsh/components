import WaterMark from './src/components/water-mark/water-mark.vue'
import Money from './src/components/money/money.vue'
import TableVdlidate from './src/components/table-validate/table-validate.vue'
import TableFormItem from './src/components/table-validate/table-form-item.vue'
import InputTarget from './src/components/select-input/input-target.vue'
import InputDialog from './src/components/select-input/input-dialog.vue'
import SelectInput from './src/components/select-input/select-input.vue'
import SelectDiCt from './src/components/select-dict/select-dict.vue'

const components = [
  WaterMark,
  Money,
  TableVdlidate,
  TableFormItem,
  InputTarget,
  InputDialog,
  SelectInput,
  SelectDiCt
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
