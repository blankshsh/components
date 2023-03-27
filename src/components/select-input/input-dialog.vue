<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :close-on-click-modal="closeOnClickModal"
    :width="width"
    :top="top"
    append-to-body
    custom-class="v-select-input-dialog"
  >
    <template>
      <oa-header
        ref="header"
        :loading="loading"
        :row="baseConfig.row"
        @reset="reset"
        @search="search"
      >
        <el-form
          ref="form"
          size="small"
          :model="baseConfig.model"
          :label-width="baseConfig.labelWidth"
          @submit.native.prevent.stop
        >
          <el-form-item
            v-for="item in baseConfig.searchCol"
            :key="item.prop"
            v-bind="item"
          >
            <oa-select-input
              v-if="item.type === 'selectInput'"
              v-model="baseConfig.model[item.prop]"
              :component="item.component"
              :model="baseConfig.model"
              :code="item.code"
              :codeMap="item.codeMap"
              :title="'请选择'+ item.label"
              :placeholder="'请选择'+ item.label"
              :disabled="!closeDisabledList && disabledList.includes(item.prop)"
            />
            <oa-select-dict-data
              v-else-if="item.type === 'dict'"
              v-model="baseConfig.model[item.prop]"
              :code="item.code"
              :placeholder="'请选择'+ item.label"
              :disabled="!closeDisabledList && disabledList.includes(item.prop)"
            />
            <el-input
              v-else
              v-model.trim="baseConfig.model[item.prop]"
              clearable
              :placeholder="'请输入'+ item.label"
              :disabled="!closeDisabledList && disabledList.includes(item.prop)"
              @keyup.enter.native.prevent.stop="handleFormSubmit"
              @keydown.enter.native.prevent.stop
            />
          </el-form-item>
        </el-form>
      </oa-header>
      <oa-table
        ref="table"
        :tableAttrs="tableAttrs"
        :tableCol="baseConfig.tableCol || queryTableCol"
        :multiple="multiple"
        :selection.sync="selection"
        :selected.sync="selected"
        :loading="loading"
        :selectedMap="selectedMap"
        v-on="$listeners"
        @handleSelect="handleSelect"
      />
      <oa-pagination
        v-model="page"
        @change="query"
      />
    </template>
    <template
      v-if="multiple"
      slot="footer"
    >
      <div class="edt-oa-footer">
        <div style="flex: 1; margin-right: 20px;">
          <el-select
            key="multipleSelect"
            v-model="selected"
            size="mini"
            style="width: 100%;"
            multiple
            placeholder="展示选中项"
            clearable
            @change="handleChangeSelected"
          >
            <el-option
              v-for="item in selection"
              :key="item[selectedMap.value] || item.id"
              :label="item._label"
              :value="item[selectedMap.value]"
            />
          </el-select>
        </div>
        <div>
          <el-button
            size="mini"
            @click="visible = false"
          >
            取 消
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="submit"
          >
            确 定
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
const page = {
  pageSize: 20,
  pageNum: 1
}
export default {
  name: 'VInputDialog',
  props: {
    component: {
      required: true,
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: null
    },
    model: {
      type: Object,
      default: null
    },
    code: {
      type: String,
      default: ''
    },
    codeMap: {
      type: Object,
      default: null
    },
    disabledList: {
      type: Array,
      default() {
        return []
      }
    },
    closeDisabledList: {
      type: Boolean,
      default: false
    },
    defaultModel: {
      type: Object,
      default() {
        return {}
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectedMap: {
      type: Object,
      default() {
        return {
          label: ['label'],
          value: 'value'
        }
      }
    },
    top: {
      type: String,
      default: '100px'
    },
    title: {
      type: String,
      default: ''
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '900px'
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
      selection: [],
      selected: [],
      page: {},
      queryTableCol: [],
      tableAttrs: {
        data: []
      },
      baseConfig: {}
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.baseConfig.model = Object.assign(JSON.parse(this.baseConfig._model), this.defaultModel)
          this.initDown ? this.search() : this.init()
        } else {
          this.initDown && this.close()
        }
      },
      immediate: true
    },
    config: {
      handler(val) {
        if (val) {
          Array.isArray(val.tableCol) && val.tableCol.forEach(item => (item.showOverflowTooltip = true))
          this.baseConfig = {
            row: '3',
            labelWidth: '100px',
            _model: JSON.stringify(val.model || {}),
            ...val
          }
          val.handle && Object.assign(this, val.handle)
        }
      },
      immediate: true,
      deep: true
    },
    defaultModel: {
      handler(val) {
        this.baseConfig.model = Object.assign(JSON.parse(this.baseConfig._model), this.defaultModel)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    init() {
      this.initDown = true
      this.search()
    },
    close() {
      this.$refs.form.resetFields()
      this.page.pageNum = page.pageNum
      this.page.pageSize = page.pageSize
      this.page.total = 0
      this.tableAttrs.data = []
      this.selection = []
      this.selected = []
    },
    reset() {
      this.$refs.form.resetFields()
      this.baseConfig.model = Object.assign(JSON.parse(this.baseConfig._model), this.defaultModel)
      this.search()
    },
    search() {
      this.page.pageNum = page.pageNum
      this.page.pageSize = page.pageSize
      this.page.total = 0
      this.tableAttrs.data = []
      this.queryParams = { ...this.baseConfig.model, status: '1' }
      this.query()
    },
    getParams() {
      return this.queryParams
    },
    query() {
      const params = {
        ...this.getParams(),
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      }
      this.loading = true
      axios.post(this.baseConfig.queryUrl, params).then(res => {
        const data = res?.data?.data
        if (!data) return
        this.page.pageNum = data.pageNum
        this.page.pageSize = data.pageSize
        this.page.total = data.total
        this.tableAttrs.data = data.list || []
        this.$refs.table.scrollToTop()
        this.$refs.table.setSelection()
      }).catch(error => {
        console.error(error)
      }).finally(() => {
        this.loading = false
      })
    },
    handleFormSubmit() {
      this.search()
      this.$refs.header.collapse = ''
    },
    handleSelect(data) {
      if (data) {
        this.code && this.$emit('input', data[this.code] || '')
      } else {
        this.$emit('input', '')
      }
      this.changeValue(data)
      this.visible = false
    },
    submit() {
      if (!this.selection.length) {
        return this.$message.error('请选择数据！')
      }
      this.$emit('submit', this.selection)
      this.visible = false
    },
    changeValue(data = {}) {
      if (this.model && this.codeMap) {
        Object.keys(this.codeMap).forEach(k => {
          this.model[k] = data[this.codeMap[k]] || ''
        })
      }
      this.$emit('validateField')
    },
    handleChangeSelected() {
      this.selection = this.selection.filter(item => this.selected.includes(item[this.selectedMap.value]))
      this.$refs.table.setSelection()
    }
  }
}
</script>
<style lang="scss">

.v-select-input-dialog {
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    .edt-oa-header {
      margin-top: 0;
    }
  }
  .el-dialog__footer {
    padding: 0 20px 10px;
    .edt-oa-footer {
      display: flex;
      justify-content: space-between;

      .el-select__tags {
        flex-wrap: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
