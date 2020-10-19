<template>
  <div>
    <div class="header">
      <div class="left"><i class="iconfont iconnew"></i></div>
      <div class="center">
        <i class="iconfont iconsearch"></i> <span>搜索新闻</span>
      </div>
      <div class="right" @click="hasLogin">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <!-- 小三角部分 -->
    <van-sticky z-index="999">
      <div class="container" @click="editTab">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </van-sticky>
    <!-- tab栏部分 -->
    <van-tabs v-model="active" sticky>
      <!-- tab栏列表 -->
      <van-tab :title="tab.name" v-for="tab in tabsList" :key="tab.id">
        <!-- 下拉刷新部分 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 分页 -->
          <van-list
            v-model="loading"
            @load="onload"
            :immediate-check="false"
            :finished="finished"
            finished-text="已全部加载完毕……"
          >
            <!-- hm-post组件 -->
            <hm-post
              v-for="(post, index) in postList"
              :key="index"
              :post="post"
              @click.native="$router.push(`/detail/${post.id}`)"
            ></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
i
<script>
export default {
  data() {
    return {
      active: 0,
      tabsList: [], //tab栏列表
      postList: [], //文章列表
      loading: false, //加载状态
      pageIndex: 1, //页面数
      pageSize: 6, //每页显示文章数
      finished: false, //是否全部显示完成
      // 下拉刷新部分
      isLoading: false,
    };
  },
  created() {
    this.getTabsList();
  },
  methods: {
    //获取tab栏列表
    async getTabsList() {
      const res = await this.$axios.get("/category");
      // console.log(res);
      if (res.data.statusCode === 200) {
        this.tabsList = res.data.data;
        this.getPostList(this.tabsList[this.active].id);
      }
    },
    //获取文章列表
    async getPostList(id) {
      const res = await this.$axios.get("/post", {
        params: {
          category: id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        },
      });
      // console.log(res);
      this.postList = [...this.postList, ...res.data.data];
      this.loading = false;
      this.isLoading = false;
      if (res.data.data.length < this.pageSize) {
        this.finished = true;
      }
    },
    //触底触发的函数
    onload() {
      // console.log("触底了呀");
      this.pageIndex++;

      this.getPostList(this.tabsList[this.active].id);
    },
    // 下拉刷新触发的函数
    onRefresh() {
      // console.log(111);
      this.postList = [];
      this.pageIndex = 1;
      this.finished = false;
      this.loading = true;
      this.getPostList(this.tabsList[this.active].id);
    },
    // 编辑导航栏项
    editTab() {
      console.log(111);
    },
    // 是否已登录
    hasLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/user");
      } else {
        this.$router.push("/login");
      }
    },
  },

  //监听active
  watch: {
    active(newValue) {
      this.postList = [];
      this.pageIndex = 1;
      this.finished = false;
      this.loading = false;
      this.getPostList(this.tabsList[newValue].id);
      // console.log(newValue);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tabs__nav {
  background-color: #eee;
  margin-right: 40px;
}
//小三角样式
.container {
  width: 40px;
  height: 44px;
  position: absolute;
  right: 0;
  background-color: #eee;
  text-align: center;
  line-height: 44px;
  z-index: 999;
}
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