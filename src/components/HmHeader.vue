<template>
  <div class="header">
    <div class="hm-header">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center"><slot></slot></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  height: 40px;

  .hm-header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    height: 40px;
    background-color: #f4f4f4;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    .left,
    .right {
      width: 40px;
    }
    .center {
      flex: 1;
      text-align: center;
      font-weight: 700;
    }
  }
}
</style>
