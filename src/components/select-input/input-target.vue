<template>
  <el-input
    ref="input"
    class="v-select-input-target"
    v-bind="$attrs"
    :value="value"
    :suffix-icon="realIcon"
    :disabled="isDisabled"
    :clearable="clearable"
    :title="value"
    readonly
    v-on="$listeners"
    @click.native="handleClick"
    @mouseenter.native="handleInputMouseenter"
    @mouseleave.native="handleInputMouseleave"
  />
</template>

<script>
export default {
  name: 'VInputTarget',
  inject: {
    elForm: {
      from: 'elForm',
      default() {
        return {}
      }
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'el-icon-search'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    model: {
      type: Object,
      default: null
    },
    codeMap: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showClearable: false
    }
  },
  computed: {
    isDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },
    realIcon() {
      return this.showClearable ? 'el-icon-circle-close' : this.icon
    }
  },
  methods: {
    handleClick(e) {
      if (this.isDisabled) return
      if (e && e.target.tagName === 'I') {
        if ([...e.target.classList].includes('el-icon-circle-close')) {
          this.$emit('input', '')
          this.changeValue()
          this.$refs.input && this.$refs.input.clear()
        }
      } else {
        this.$emit('handleClick')
      }
    },
    changeValue(data = {}) {
      if (this.model && this.codeMap) {
        Object.keys(this.codeMap).forEach(k => {
          this.model[k] = data[this.codeMap[k]] || ''
        })
      }
    },
    handleInputMouseenter() {
      if (this.isDisabled || !this.clearable) return
      this.showClearable = !!this.value
    },
    handleInputMouseleave() {
      if (this.isDisabled || !this.clearable) return
      this.showClearable = false
    }
  }
}
</script>
<style lang="scss">
.v-select-input-target {
  .el-icon-circle-close {
    cursor: pointer;
  }
}
</style>
