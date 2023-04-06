<template>
  <div style="width: 1000px; margin: 0 auto; padding: 20px;">
    <v-water-mark text="id xxx" height="100" />
    <el-form
      :model="model"
      label-width="150px"
    >
      <el-form-item label="金额">
        <v-money
          v-model="model.money"
          size="small"
        />
      </el-form-item>
      <el-form-item label="金额">
        <v-input-target
          v-model="model.value"
          size="small"
        />
      </el-form-item>
    </el-form>
    <el-button @click="addLine">
      addLine
    </el-button>
    <v-table-validate
      ref="table"
      v-bind="table"
      bigData
    >
      <el-table
        :data="table.data"
        border
        size="mini"
        maxHeight="500px"
        highlightCurrentRow
        rowKey="v"
        @row-click="rowClick"
      >
        <el-table-column
          minWidth="150px"
          prop="code"
        >
          <template slot="header">
            <span class="oa-th-is-required">编码</span>
          </template>
          <v-table-form-item
            slot-scope="scope"
            :scope="scope"
            prop="code"
            :uuid="scope.row.v"
          >
            <el-input
              v-if="scope.row.v === selectedRow"
              :key="`${scope.row.v}-code-input`"
              v-model="scope.row.code"
              size="mini"
              placeholder="请输入编码"
            />
            <span
              v-else
              style="display: inline-block; line-height: 29px;"
            >{{ scope.row.code }}</span>
          </v-table-form-item>
        </el-table-column>
        <el-table-column
          minWidth="150px"
          prop="name"
        >
          <template slot="header">
            <span class="oa-th-is-required">名称</span>
          </template>
          <v-table-form-item
            v-if="scope.row.code === '12'"
            slot-scope="scope"
            :scope="scope"
            prop="name1"
            :uuid="scope.row.v"
          >
            <el-input
              v-if="scope.row.v === selectedRow"
              :key="`${scope.row.v}-name-input`"
              v-model="scope.row.name1"
              size="mini"
              placeholder="请输入名称"
            />
            <span
              v-else
              style="display: inline-block; line-height: 29px;"
            >{{ scope.row.name }}</span>
          </v-table-form-item>
        </el-table-column>
      </el-table>
    </v-table-validate>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        money: '',
        value: '122323'
      },
      selectedRow: '',
      table: {
        rowKey: 'v',
        data: [
          { code: 'code', name: 'name', name1: '', v: Math.random().toString(36).slice(-5) }
        ],
        rules: {
          code: { required: true, message: '请输入编码', trigger: 'blur' },
          name: { required: true, message: '请输入名称', trigger: 'blur' },
          name1: { required: true, message: '请输入名称', trigger: 'blur' }
        }
      }
    }
  },
  created() {
    window.index = this
  },
  methods: {
    addLine() {
      this.table.data.push({ code: '', name: '' })
    },
    rowClick(row) {
      this.selectedRow = row.v
    }
  }
}

</script>
<style lang="scss">
.el-table td {
  .el-form-item {
    padding-top: 14px;
    padding-bottom: 14px;
    margin-bottom: 0;
    .el-form-item__error {
      padding-top: 0;
    }
  }
}
</style>
