<template>
  <div>
    <hm-header>我的跟帖</hm-header>
    <van-list
      v-model="loading"
      @load="onload"
      :finished="finished"
      finished-text="到底了……"
    >
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="date">{{ item.create_date | time("YYYY-MM-DD") }}</div>
        <div class="comment" v-if="item.parent">
          <div class="comment-user">回复：{{ item.parent.user.nickname }}</div>
          <div class="comment-text">{{ item.parent.content }}</div>
        </div>
        <div class="newcomment">{{ item.content }}</div>
        <div class="post">
          <div class="title">{{ item.post.title }}</div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 4,
      loading: false,
      finished: false,
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    async getComment() {
      const res = await this.$axios.get("/user_comments", {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      });
      // console.log(res);
      if (res.data.statusCode === 200) {
        this.commentList = [...this.commentList, ...res.data.data];
        this.loading = false;
        if (res.data.data < this.pageSize) {
          this.finished = true;
        }
      }
    },
    onload() {
      this.pageIndex++;
      this.getComment();
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  line-height: 20px;
  .date {
    color: #ccc;
  }
  .comment {
    padding: 5px;
    background-color: #ddd;
    height: 50px;
    line-height: 25px;
    color: #999;
    &-text {
      font-size: 14px;
    }
  }
  .newcomment {
    padding: 5px 0;
  }
  .post {
    display: flex;
    color: #999;
    .title {
      flex: 1;
    }
    .iconjiantou1 {
      padding: 0 5px;
    }
  }
}
</style>