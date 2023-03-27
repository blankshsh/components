<template>
  <div
    class="el-form-item v-table-form-item"
    :class="[
      { 'is-error': !!validateMessage },
      'el-form-item--' + sizeClass
    ]"
  >
    <div class="el-form-item__content">
      <slot />
      <div
        v-if="!!validateMessage"
        class="el-form-item__error"
      >
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VTableFormItem',
  componentName: 'ElFormItem',
  inject: ['elForm'],
  props: {
    scope: {
      type: Object,
      default() {
        return {}
      }
    },
    prop: {
      type: [String, Number],
      default: ''
    },
    uuid: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    validateMessage() {
      const fieldMap = this.elForm.fieldMap
      return fieldMap[this.uuid] ? fieldMap[this.uuid][this.prop] || '' : ''
    },
    sizeClass() {
      return this.size || this.elForm.size
    }
  },
  created() {
    this.elForm.addField({
      prop: this.prop,
      uuid: this.uuid
    })
    this.$on('el.form.blur', this.handleBlur)
    this.$on('el.form.change', this.handleChange)
  },
  beforeDestroy() {
    this.elForm.delField({
      prop: this.prop,
      uuid: this.uuid
    })
  },
  methods: {
    handleBlur() {
      this.elForm.validateItem('blur', {
        prop: this.prop,
        uuid: this.uuid,
        row: this.scope.row,
        index: this.scope.$index,
        value: this.scope.row[this.prop]
      })
    },
    handleChange() {
      this.elForm.validateItem('change', {
        prop: this.prop,
        uuid: this.uuid,
        row: this.scope.row,
        index: this.scope.$index,
        value: this.scope.row[this.prop]
      })
    }
  }
}

</script>
