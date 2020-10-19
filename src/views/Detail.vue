<template>
  <div>
    <!-- 头部部分 -->
    <div class="detailHeader">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center"><i class="iconfont iconnew"></i></div>
      <div class="right">
        <div v-if="postDetail.has_follow" @click="unfollow(postDetail.user.id)">
          已关注
        </div>
        <div v-else @click="follow(postDetail.user.id)">关注</div>
      </div>
    </div>
    <!--文章详情部分  -->
    <div class="post">
      <!-- 标题部分 -->
      <div class="title">{{ postDetail.title }}</div>
      <!-- user信息部分 -->
      <div class="name">
        <span>马哥</span>
        <span class="date">{{
          postDetail.create_date | time("YYYY-MM-DD")
        }}</span>
      </div>
      <!-- 内容部分 -->
      <div
        class="content"
        v-if="postDetail.type == 1"
        v-html="postDetail.content"
      ></div>
      <!-- 视频部分 -->
      <video v-else :src="postDetail.content" :autoplay="true" controls></video>
      <!-- 点赞部分 -->
      <div class="bottom">
        <div
          class="like"
          :class="{ active: postDetail.has_like }"
          @click="like(postDetail.id)"
        >
          <i class="iconfont icondianzan"></i
          ><span>{{ postDetail.comment_length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postDetail: {},
    };
  },
  created() {
    this.getpostDetail();
  },
  methods: {
    // 获取文章详情
    async getpostDetail() {
      const res = await this.$axios.get(`/post/${this.$route.params.id}`);
      console.log(res);
      if (res.data.statusCode === 200) {
        this.postDetail = res.data.data;
      }
    },
    // 取消关注用户
    async unfollow(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "login", params: { back: true } });
        return;
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`);
      // console.log(res);
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message);
        this.getpostDetail();
      }
    },
    // 关注用户
    async follow(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "/login", params: { back: true } });
        return;
      }
      const res = await this.$axios.get(`/user_follows/${id}`);
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message);
        this.getpostDetail();
      }
    },
    //点赞文章
    async like(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({
          name: "/login",
          params: {
            back: true,
          },
        });
        return;
      }
      const res = await this.$axios.get(`/post_like/${id}`);
      this.$toast.success(res.data.message);
      this.getpostDetail();
    },
  },
};
</script>

<style lang="less" scoped>
.detailHeader {
  height: 40px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 15px;
  .left {
    width: 25px;
    i {
      font-size: 16px;
    }
  }
  .center {
    flex: 1;
    i {
      font-size: 50px;
    }
  }
  .right {
    div {
      width: 60px;
      border: 1px solid #ccc;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 20px;
    }
  }
}
.post {
  padding: 10px 15px;
  .title {
    padding: 10px 0;
    font-weight: 700;
  }
  .name {
    color: #999;
    padding: 10px 0;
    .date {
      margin-left: 10px;
    }
  }
  .content {
    /deep/img {
      width: 100%;
    }
  }
  video {
    width: 100%;
  }
  .bottom {
    margin: 15px 0;
    display: flex;
    justify-content: flex-end;
    .like {
      width: 60px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #333;
      text-align: center;
      border-radius: 13px;
      i {
        color: #999;
        margin-right: 5px;
      }
    }
    .like.active {
      i,
      span {
        color: #f00;
      }
    }
  }
}
</style>