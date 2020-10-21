<template>
  <div class="hm-comment">
    <div class="head">
      <div class="left">
        <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="" />
      </div>
      <div class="center">
        <p class="nickname">{{ comment.user.nickname }}</p>
        <p class="date">{{ comment.create_date }}</p>
      </div>
      <div class="right" @click="reply">回复</div>
    </div>
    <hm-floor
      v-if="comment.parent"
      :parent="comment.parent"
      :count="floorCount(1, comment.parent)"
    ></hm-floor>
    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  methods: {
    floorCount(num, parent) {
      if (parent.parent) {
        return this.floorCount(num + 1, parent.parent);
      } else {
        return num;
      }
    },
    reply() {
      this.$bus.$emit("reply", this.comment.id, this.comment.user.nickname);
    },
  },
};
</script>

<style lang="less" scoped>
.hm-comment {
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  .head {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .left {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .center {
      padding-left: 10px;
      flex: 1;
      height: 50px;
      line-height: 25px;
      .date {
        color: #999;
      }
    }
    .right {
      width: 40px;
      color: #999;
    }
  }
  .content {
    margin-top: 10px;
  }
}
</style>