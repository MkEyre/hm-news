<template>
  <div>
    <hm-header>注册</hm-header>
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
      v-model="nickname"
      required
      label="昵称"
      placeholder="请输入昵称"
      :error-message="nicknameErrMsg"
      clearable
      @input="checkNickname"
      @clear="clearNicknameErrMsg"
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
    <hm-button @click.native="startRegister">注册</hm-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      nickname: "",
      password: "",
      usernameErrMsg: "",
      nicknameErrMsg: "",
      passwordErrMsg: "",
    };
  },
  methods: {
    checkUsername() {
      const reg = /^1\d{2,7}$/;
      if (reg.test(this.username)) {
        this.usernameErrMsg = "";
      } else {
        this.usernameErrMsg = "用户名验证错误";
      }
    },
    clearUsernameErrMsg() {
      this.usernameErrMsg = "";
    },
    checkNickname() {
      const reg = /^[\u4e00-\u9fa5]{3,7}$/;
      if (reg.test(this.nickname)) {
        this.nicknameErrMsg = "";
      } else {
        this.nicknameErrMsg = "昵称验证错误";
      }
    },
    clearNicknameErrMsg() {
      this.nicknameErrMsg = "";
    },
    checkPassword() {
      const reg = /^1\d{2,7}$/;
      if (reg.test(this.password)) {
        this.passwordErrMsg = "";
      } else {
        this.passwordErrMsg = "密码验证错误";
      }
    },
    clearPasswordErrMsg() {
      this.passwordErrMsg = "";
    },
    startRegister() {
      if (
        this.username &&
        this.nickname &&
        this.password &&
        !this.usernameErrMsg &&
        !this.nicknameErrMsg &&
        !this.passwordErrMsg
      ) {
        this.$axios
          .post("/register", {
            username: this.username,
            nickname: this.nickname,
            password: this.password,
          })
          .then((res) => {
            // console.log(res)
            const { data, statusCode, message } = res.data;
            if (statusCode === 200) {
              this.$toast.success(message);
              this.$router.push({
                name: "/login",
                params: {
                  username: this.username,
                  password: this.password,
                },
              });
            }
          });
      } else {
        this.$toast.fail("验证失败");
      }
    },
  },
};
</script>

<style></style>
