<template>
  <div>
    <hm-header>个人中心</hm-header>
    <div class="userheader">
      <div class="left">
        <img :src="this.$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center">
        <p>
          <i v-if="info.gender === 1" class="iconfont iconxingbienan"></i
          ><i v-else class="iconfont iconxingbienv"></i>{{ info.nickname }}
        </p>
        <p>{{ info.create_date | time("YYYY-MM-DD") }}</p>
      </div>
    </div>
    <van-cell-group>
      <van-cell
        title="我的关注"
        is-link
        @click="$router.push('/my-follow')"
        value="关注的用户"
      />
      <van-cell title="我的跟贴" is-link value="跟帖回复" />
      <van-cell title="我的收藏" is-link value="文档/视频" />
      <van-cell title="设置" is-link @click="$router.push('/edit')" />
      <van-cell title="退出" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    };
  },
  async created() {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const res = await this.$axios.get(`/user/${user_id}`);
    console.log(res);
    const { message, statusCode, data } = res.data;
    if (statusCode === 200) {
      this.info = data;
      // console.log(this.info);
    } else {
      this.$roast.fail(message);
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: "温馨提示",
          message: "您确定要退出吗？",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        this.$toast.success("退出成功");
        this.$router.push("/login");
      } catch {
        this.$toast("取消退出");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.userheader {
  height: 100px;
  border-bottom: 2px solid #ccc;
  display: flex;
  align-items: center;
  .left {
    width: 100px;
    text-align: center;
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
    }
  }
  .center {
    flex: 1;
    height: 50px;
    line-height: 25px;
  }
}
</style>
