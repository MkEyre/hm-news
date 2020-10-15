<template>
  <div>
    <div class="header">
      <div class="left"><i class="iconfont iconnew"></i></div>
      <div class="center">
        <i class="iconfont iconsearch"></i> <span>搜索新闻</span>
      </div>
      <div class="right"><i class="iconfont iconwode"></i></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 40px;
  padding: 0 5px;
  background-color: red;
  align-items: center;
  color: #fff;
  text-align: center;

  .center {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.5);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    span {
      margin-left: 2px;
    }
  }
  .left {
    width: 40px;
    .iconnew {
      font-size: 40px;
    }
  }
  .right {
    width: 30px;
    .iconwode {
      font-size: 20px;
    }
  }
}
</style>