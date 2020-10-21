<template>
  <div>
    <!-- 头部部分 -->
    <div class="head">
      <div class="detailHeader">
        <div class="left" @click="$router.back()">
          <i class="iconfont iconjiantou2"></i>
        </div>
        <div class="center"><i class="iconfont iconnew"></i></div>
        <div class="right">
          <div
            v-if="postDetail.has_follow"
            @click="unfollow(postDetail.user.id)"
          >
            已关注
          </div>
          <div v-else @click="follow(postDetail.user.id)">关注</div>
        </div>
      </div>
    </div>
    <!--文章详情部分  -->
    <div class="post">
      <!-- 标题部分 -->
      <div class="title">{{ postDetail.title }}</div>
      <!-- user信息部分 -->
      <div class="name">
        <span>{{ postDetail.user.nickname }}</span>
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
      <video v-else :src="postDetail.content" controls></video>
      <!-- 点赞部分 -->
      <div class="likebottom">
        <div
          class="like"
          :class="{ active: postDetail.has_like }"
          @click="like(postDetail.id)"
        >
          <i class="iconfont icondianzan"></i
          ><span>{{ postDetail.like_length }}</span>
        </div>
      </div>
    </div>
    <div class="view" ref="view"></div>
    <!-- 评论部分 -->
    <div class="comments">
      <hm-comment
        v-for="comment in commentList"
        :key="comment.id"
        :comment="comment"
      ></hm-comment>
    </div>
    <div class="bottom">
      <div class="input" v-if="!isShow">
        <div class="left">
          <input type="text" ref="input" @focus="handleFocus" />
        </div>
        <div class="center">
          <van-icon name="chat-o" :badge="postDetail.comment_length" />
        </div>
        <div class="right">
          <van-icon
            name="star-o"
            :class="{ active: postDetail.has_star }"
            @click="hasStar"
          />
        </div>
      </div>
      <div class="textarea" v-else>
        <textarea
          v-model="content"
          :placeholder="replyName ? '回复:' + replyName : '请发表您的评论'"
          ref="textarea"
          @blur="handleBlur"
        ></textarea>
        <div class="send" @mousedown="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postDetail: {
        user: {},
      },
      commentList: [],
      isShow: false,
      replyId: "",
      replyName: "",
      content: "",
    };
  },
  created() {
    this.getpostDetail();
    this.getcommentList();
    this.$bus.$on("reply", async (replyId, replyName) => {
      // console.log(111);
      this.replyId = replyId;
      this.replyName = replyName;
      this.isShow = true;
      await this.$nextTick();
      this.$refs.textarea && this.$refs.textarea.focus();
    });
  },
  methods: {
    // 获取文章详情
    async getpostDetail() {
      const res = await this.$axios.get(`/post/${this.$route.params.id}`);
      // console.log(res);
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
        this.getpostDetail(this.postDetail.id);
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
    // 获取评论列表
    async getcommentList() {
      const res = await this.$axios.get(
        `/post_comment/${this.$route.params.id}`
      );
      // console.log(res);
      this.commentList = res.data.data;
    },
    // 聚焦时触发的函数
    async handleFocus() {
      this.isShow = true;
      await this.$nextTick();
      this.$refs.textarea.focus();
    },
    // 失焦时触发的函数
    handleBlur() {
      this.isShow = false;
      if (!this.content) {
        this.replyId = "";
        this.replyName = "";
      }
    },
    //
    async send() {
      const res = await this.$axios.post(
        `/post_comment/${this.$route.params.id}`,
        {
          content: this.content,
          parent_id: this.replyId,
        }
      );
      // console.log(res);
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message);
        this.getcommentList();
        this.content = "";
        this.$refs.view.scrollIntoView();
      }
    },
    async hasStar() {
      const res = await this.$axios.get(`/post_star/${this.$route.params.id}`);
      console.log(res);
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message);
        this.getpostDetail();
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 头部部分
.head {
  height: 40px;
  .detailHeader {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 999;
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
}
// 文章详情部分
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
  .likebottom {
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
// 评论部分
.comments {
  border-top: 3px solid #ccc;
  padding-bottom: 50px;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #ccc;
  .input {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    .left {
      flex: 1;
      input {
        height: 30px;
        background-color: #ddd;
        border-radius: 15px;
        width: 90%;
        border: none;
        text-indent: 1em;
      }
    }
    .center,
    .right {
      width: 50px;
      font-size: 20px;
      text-align: center;
    }
    .active {
      color: #f00;
    }
  }
  .textarea {
    display: flex;
    padding: 10px 15px;
    align-items: center;

    textarea {
      border: none;
      resize: none;
      background-color: #ddd;
      flex: 1;
      height: 60px;
      border-radius: 10px;
      padding: 10px;
    }
    .send {
      margin-left: 10px;
      background-color: #f00;
      color: #fff;
      width: 50px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 10px;
    }
  }
}
</style>