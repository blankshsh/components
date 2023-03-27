<template>
  <el-select
    class="oa-select-dict-data"
    :value="value"
    v-bind="$attrs"
    :filterable="filterable"
    clearable
    v-on="$listeners"
  >
    <el-option
      v-for="item in options"
      :key="item.itemValue"
      :value="item.itemValue"
      :label="item.itemText"
    />
  </el-select>
</template>
<script>
import { queryDict } from './dict.js'
export default {
  name: 'VSelectDict',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    code: {
      required: true,
      type: String,
      default: ''
    },
    filterable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: []
    }
  },
  created() {
    queryDict(this.code).then(data => {
      this.options = Object.freeze(data)
      if (this.setDefault && !this.value && this.options.length) {
        this.$emit('change', this.options[0].itemValue)
      }
    })
  }
}

</script>
