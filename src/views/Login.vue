<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      clearable
      @input="checkUsername"
      @clear="clearUsernameErrMsg"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      clearable
      @input="checkPassword"
      @clear="clearPasswordErrMsg"
    />
    <hm-button @click.native="startLogin">登录</hm-button>
    <div class="router">
      没有账号，请<router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      usernameErrMsg: "",
      passwordErrMsg: "",
    };
  },
  created() {
    const { username, password } = this.$route.params;
    if (username && password) {
      this.username = username;
      this.password = password;
    }
  },
  methods: {
    checkUsername() {
      const reg = /^1\d{2,7}$/;
      if (reg.test(this.username)) {
        this.usernameErrMsg = "";
      } else {
        this.usernameErrMsg = "用户名格式错误";
      }
    },
    clearUsernameErrMsg() {
      this.usernameErrMsg = "";
    },
    checkPassword() {
      const reg = /^1\d{2,7}$/;
      if (reg.test(this.password)) {
        this.passwordErrMsg = "";
      } else {
        this.passwordErrMsg = "密码格式错误";
      }
    },
    clearPasswordErrMsg() {
      this.passwordErrMsg = "";
    },
    async startLogin() {
      if (
        this.username &&
        this.password &&
        !this.usernameErrMsg &&
        !this.passwordErrMsg
      ) {
        const res = await this.$axios.post("/login", {
          username: this.username,
          password: this.password,
        });
        // console.log(res);
        const { message, statusCode, data } = res.data;
        if (statusCode === 200) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user.id);
          this.$toast.success(message);
          this.$router.push("/user");
        } else {
          this.$toast.fail(message);
        }
      } else {
        this.$toast.fail("验证失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.router {
  float: right;
  padding-right: 20px;
}
</style>
