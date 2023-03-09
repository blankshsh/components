<template>
  <div style="width: 1000px; margin: 0 auto;padding: 20px;">
    <el-form :model="model">
      <el-form-item label="金额">
        <v-money
          v-model="model.money"
          size="small"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        money: ''
      }
    }
  }
}
</script>
