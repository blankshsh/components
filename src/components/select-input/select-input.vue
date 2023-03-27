<template>
  <div class="v-select-input">
    <v-input-target
      ref="input"
      v-bind="$attrs"
      v-on="$listeners"
      @handleClick="handleClick"
    />
    <v-input-dialog
      ref="dialog"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'VSelectInput',
  methods: {
    handleClick() {
      this.$refs.dialog.visible = true
    }
  }
}
</script>
<style lang="scss">
</style>
