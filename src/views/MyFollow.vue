<template>
  <div>
    <hm-header>我的关注</hm-header>
    <div class="follow">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <div class="center-user">{{ item.nickname }}</div>
          <div class="center-date">
            {{ item.create_date | time("YYYY-MM-DD") }}
          </div>
        </div>
        <div class="right" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList();
    // this.follow();
  },
  methods: {
    // 获取用户关注列表
    async getList() {
      const res = await this.$axios.get("/user_follows");
      // console.log(res);
      if (res.data.statusCode === 200) {
        this.list = res.data.data;
      }
    },
    //关注用户
    async follow() {
      await this.$axios.get("/user_follows/4");
    },
    //取消关注
    async unfollow(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`);
      // console.log(res);
      if (res.data.statusCode === 200) {
        this.getList();
        this.$toast.success(res.data.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.follow {
  .item {
    height: 80px;
    border-bottom: 1px solid #ccc;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    .center {
      flex: 1;
      height: 50px;
      line-height: 25px;
      margin-left: 20px;
      &-user {
        font-size: 14px;
      }
      &-date {
        color: #999;
      }
    }
    .left {
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }
    .right {
      background-color: #ddd;
      padding: 8px 15px;
      border-radius: 20px;
    }
  }
}
</style>