<template>
  <div>
    <!-- 视频部分 -->
    <div class="vedio-img" v-if="post.type === 2">
      <div class="title">{{ post.title }}</div>
      <div class="img">
        <img :src="checkUrl(post.cover[0].url)" alt="" />
        <div class="play">
          <i class="iconfont iconshipin"></i>
        </div>
      </div>
      <div class="user">
        <span>{{ post.user.nickname }}</span>
        <span class="count">{{ post.comments.length }}跟帖</span>
      </div>
    </div>
    <!-- 单张图片 -->
    <div class="single-img" v-else-if="post.cover.length < 3">
      <div class="left line2">
        <div class="title">{{ post.title }}</div>
        <div class="user">
          <span>{{ post.user.nickname }}</span>
          <span class="count">{{ post.comments.length }}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="checkUrl(post.cover[0].url)" alt="" />
      </div>
    </div>
    <!-- 多张图部分 -->
    <div class="multi-img" v-else>
      <div class="title">{{ post.title }}</div>
      <div class="img">
        <img :src="checkUrl(post.cover[0].url)" alt="" /><img
          :src="checkUrl(post.cover[1].url)"
          alt=""
        /><img :src="checkUrl(post.cover[2].url)" alt="" />
      </div>
      <div class="user">
        <span>{{ post.user.nickname }}</span>
        <span class="count">{{ post.comments.length }}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods: {
    checkUrl(url) {
      if (url.startsWith("http")) {
        return url;
      } else {
        return this.$axios.defaults.baseURL + url;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.single-img,
.vedio-img,
.multi-img {
  border-bottom: 1px solid #ccc;
  padding: 5px;
}
.title {
  font-size: 14px;
}
.user {
  color: #999;
  .count {
    margin-left: 10px;
  }
}
.single-img {
  display: flex;
  .left {
    flex: 1;
    display: flex;
    padding: 5px;
    flex-direction: column;
    justify-content: space-between;
  }
  .img {
    img {
      width: 100px;
      height: 80px;
      object-fit: cover;
    }
  }
}
.vedio-img {
  .img {
    padding: 10px;
    position: relative;

    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      text-align: center;
      line-height: 60px;
      .iconshipin {
        color: #fff;
        font-size: 30px;
      }
    }
  }
}
.multi-img {
  .img {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 120px;
      height: 80px;
      object-fit: cover;
    }
  }
}
</style>