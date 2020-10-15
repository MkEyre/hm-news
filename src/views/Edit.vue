<template>
  <div>
    <hm-header>编辑资料</hm-header>
    <div class="head_img">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader class="imgFile" :after-read="afterRead" multiple />
    </div>
    <van-cell-group>
      <van-cell
        title="昵称"
        @click="shownicknameDialog"
        is-link
        :value="info.nickname"
      />
      <van-cell title="密码" is-link :value="info.password" />
      <van-cell
        title="性别"
        @click="showgenderDialog"
        is-link
        :value="info.gender === 1 ? '男' : '女'"
      />
    </van-cell-group>
    <van-dialog
      v-model="nicknameDialog"
      @confirm="changeNickname"
      title="修改昵称"
      show-cancel-button
    >
      <van-field v-model="nickname" />
    </van-dialog>
    <van-dialog
      v-model="genderDialog"
      @confirm="changeGender"
      title="修改性别"
      show-cancel-button
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      nicknameDialog: false,
      genderDialog: false,
      nickname: "",
      gender: 0,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const user_id = localStorage.getItem("user_id");
      const res = await this.$axios.get(`/user/${user_id}`);
      console.log(res);
      const { data, message, statusCode } = res.data;
      if (statusCode === 200) {
        this.info = data;
      } else {
        this.$toast.fail(message);
      }
    },
    //显示修改昵称弹窗
    shownicknameDialog() {
      //数据回显
      this.nicknameDialog = true;
      this.nickname = this.info.nickname;
    },
    //修改昵称
    changeNickname() {
      if (this.nickname === this.info.nickname) {
        return;
      }
      // const user_id = localStorage.getItem("user_id");
      // this.$axios
      //   .post(`/user_update/${user_id}`, { nickname: this.nickname })
      //   .then((res) => {
      //     console.log(res);
      //     const { message, statusCode, data } = res.data;
      //     if (statusCode === 200) {
      //       this.getUserInfo();
      //       this.$toast.success(message);
      //     }
      //   });
      this.axiosRequest({ nickname: this.nickname });
    },
    //显示修改性别弹窗
    showgenderDialog() {
      this.genderDialog = true;
      // 性别数据回显
      this.gender = this.info.gender;
    },
    //修改性别
    changeGender() {
      if (this.gender === this.info.gender) {
        return;
      }
      // const user_id = localStorage.getItem("user_id");
      // this.$axios
      //   .post(`/user_update/${user_id}`, { gender: this.gender })
      //   .then((res) => {
      //     const { statusCode, message } = res.data;
      //     if (statusCode === 200) {
      //       this.getUserInfo();
      //       this.$toast.success(message);
      //     }
      //   });
      this.axiosRequest({ gender: this.gender });
    },
    //上传图片后触发的函数
    async afterRead(file) {
      console.log(file);
      const formdate = new FormData();
      formdate.append("file", file.file);
      const res = await this.$axios.post("/upload", formdate);
      // const user_id = localStorage.getItem("user_id");
      // this.$axios
      //   .post(`/user_update/${user_id}`, {
      //     head_img: res.data.data.url,
      //   })
      //   .then((res) => {
      //     const { statusCode, message } = res.data;
      //     if (statusCode === 200) {
      //       this.getUserInfo();
      //       this.$toast.success(message);
      //     }
      //   });
      this.axiosRequest({
        head_img: res.data.data.url,
      });
    },
    async axiosRequest(data) {
      const user_id = localStorage.getItem("user_id");
      const res = await this.$axios.post(`/user_update/${user_id}`, data);
      const { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.getUserInfo();
        this.$toast.success(message);
      } else {
        this.$toast.fail(message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.head_img {
  height: 100px;
  position: relative;
  text-align: center;
  padding-top: 20px;
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  .imgFile {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>