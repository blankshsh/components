<template>
  <el-input
    ref="input"
    class="v-money"
    :value="onFocus ? realVal : formatVal"
    v-bind="$attrs"
    @focus="handleFocus"
    @blur="handleBlur"
    v-on="$listeners"
  />
</template>
<script>
export default {
  name: 'VMoney',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      reg: {
        num: /[^\d+]/g,
        split: /(\d{3})(?=\d)/g,
        zero: /^0+(\d)/
      },
      onFocus: false,
      realVal: ''
    }
  },
  computed: {
    formatVal() {
      return this.getMoney(this.realVal, true)
    }
  },
  watch: {
    value: {
      handler(val) {
        this.realVal = `${val}`
      },
      immediate: true
    }
  },
  methods: {
    getMoney(value = '', needSplit) {
      // 分割 整数和小数
      let [_int = '', _float = ''] = value.split('.')

      // 整数部分 - 去除非数字
      _int = _int.replace(this.reg.num, '').replace(this.reg.zero, '$1') || '0'
      if (needSplit) {
        // 千位分隔符
        _int = _int.replace(this.reg.split, '$1,')
      }

      // 小数部分 - 去除非数字 补全2位
      _float = ((_float.replace(this.reg.num, '') || '0') + '00').substr(0, 2)
      return `${_int}.${_float}`
    },
    handleFocus() {
      this.realVal = this.getMoney(this.realVal)
      this.onFocus = true
    },
    handleBlur(e) {
      this.onFocus = false
      const value = this.getMoney(e.target.value)
      this.realVal = value
      this.$emit('input', value)
    }
  }
}
</script>
