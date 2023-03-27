<template>
  <div class="v-table-validate">
    <slot />
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'

export default {
  name: 'VTableValidate',
  props: {
    prop: {
      type: String,
      default: ''
    },
    // 校验规则
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    // 表格数据
    data: {
      type: Array,
      default() {
        return []
      }
    },
    rowKey: {
      type: [String, Number],
      default: 'v'
    }
  },
  provide() {
    return {
      elForm: this
    }
  },
  data() {
    return {
      fieldMap: {}
    }
  },
  watch: {
    data(val) {
      if (!val.length) {
        this.fieldMap = {}
      }
      this.initData(val)
    }
  },
  created() {
    this.initData(this.data)
  },
  methods: {
    initData(data) {
      data.forEach(item => {
        if (!item[this.rowKey]) {
          item[this.rowKey] = Math.random().toString(36).slice(-5)
        }
      })
    },
    addField({ prop, uuid }) {
      if (!this.fieldMap[uuid]) {
        this.$set(this.fieldMap, uuid, {})
      }
      this.$set(this.fieldMap[uuid], prop, '')
    },
    delField({ prop, uuid }) {
      if (this.fieldMap[uuid]) {
        delete this.fieldMap[uuid][prop]
      }
    },
    validate(key) {
      return new Promise((resolve, reject) => {
        const map = this.fieldMap
        const arr = []
        this.data.forEach(row => {
          const uuid = row[this.rowKey]
          Object.keys(map[uuid]).forEach(prop => {
            const rules = [].concat(this.rules[prop]).map(item => {
              return {
                ...item,
                row: { ...row }
              }
            })
            const value = row[prop]
            arr.push({ rules, prop, uuid, value })
          })
        })
        Promise.all(arr.map(item => this.validateField(item))).then(res => {
          resolve(!res.includes(false))
        })
      })
    },
    validateItem(trigger = '', { prop, row, value, uuid } = {}) {
      const rules = [].concat(this.rules[prop] || {}).map(item => {
        return {
          ...item,
          row: { ...row }
        }
      })
      this.validateField({
        trigger,
        rules,
        prop,
        uuid,
        value
      })
    },
    validateField({ trigger, rules, prop, uuid, value }) {
      return new Promise(resolve => {
        const descriptor = {}
        if (trigger) {
          rules = rules.filter(item => item.trigger === trigger)
        }

        if (Array.isArray(rules)) {
          rules.forEach(rule => {
            delete rule.trigger
          })
        }

        descriptor[prop] = rules

        const validator = new AsyncValidator(descriptor)

        const model = {}
        model[prop] = value

        validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
          const map = this.fieldMap
          if (errors) {
            this.$set(map[uuid], prop, errors[0].message)
            resolve(false)
          } else {
            if (map[uuid] && map[uuid][prop]) {
              this.$set(map[uuid], prop, '')
            }
            resolve(true)
          }
        })
      })
    }
  }
}

</script>
