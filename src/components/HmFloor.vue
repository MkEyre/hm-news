<template>
  <div>
    <hm-floor
      v-if="parent.parent"
      :parent="parent.parent"
      :count="count - 1"
    ></hm-floor>
    <div class="hm-floor">
      <div class="head">
        <div class="left">
          <!-- <span class="floor">{{ floorCount(1, parent) }}楼</span> -->
          <span class="floor">{{ count }}楼</span>

          <span class="nickname">{{ parent.user.nickname }} </span>
        </div>
        <div class="center">{{ parent.create_date }}</div>
        <div class="right" @click="reply">回复</div>
      </div>
      <div class="content">{{ parent.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["parent", "count"],
  // methods: {
  //   floorCount(num, parent) {
  //     if (parent.parent) {
  //       return this.floorCount(num + 1, parent.parent);
  //     } else {
  //       return num;
  //     }
  //   },
  // },
  methods: {
    reply() {
      this.$bus.$emit("reply", this.parent.id, this.parent.user.nickname);
    },
  },
};
</script>

<style lang="less" scoped>
.hm-floor {
  border: 1px solid #999;
  background-color: #eee;
  padding: 10px;
  margin-top: -1px;
  .head {
    display: flex;
    margin-bottom: 10px;
    .left {
      flex: 1;
    }
    .center {
      flex: 3;
      color: #999;
    }
    .right {
      width: 40px;
    }
  }
}
</style>