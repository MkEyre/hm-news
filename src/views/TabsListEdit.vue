<template>
  <div>
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="title">点击删除一下频道</div>
      <div class="box">
        <div class="outer" v-for="tab in tabsList" :key="tab.id">
          <div class="inner" @click="del(tab.id)">{{ tab.name }}</div>
        </div>
      </div>
      <div class="title">点击添加一下频道</div>
      <div class="box">
        <div class="outer" v-for="tab in nextTabsList" :key="tab.id">
          <div class="inner">{{ tab.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabsList: [],
      nextTabsList: [],
    };
  },
  created() {
    this.getTabsList();
  },
  methods: {
    // 获取tabs列表
    async getTabsList() {
      const tabsList = localStorage.getItem("tabsList");
      const nextTabsList = localStorage.getItem("nextTabsList");
      if (tabsList && nextTabsList) {
        this.tabsList = JSON.parse(tabsList);
        this.nextTabsList = JSON.parse(nextTabsList);
        return;
      }
      const res = await this.$axios.get("/category");
      console.log(res);
      if (res.data.statusCode === 200) {
        this.tabsList = res.data.data;
      }
    },
    // 删除tabs
    del(id) {
      const tab = this.tabsList.find((item) => item.id === id);
      this.nextTabsList.push(tab);
      this.tabsList = this.tabsList.filter((item) => item.id !== id);
    },
  },
  watch: {
    tabsList(val) {
      localStorage.setItem("tabsList", JSON.stringify(val));
      localStorage.setItem("nextTabsList", JSON.stringify(this.nextTabsList));
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  .title {
    font-weight: 700;
    margin: 10px 0;
  }
  .box {
    display: flex;
    flex-wrap: wrap;
    .outer {
      width: 20%;
      box-sizing: border-box;
      padding: 5px;
      .inner {
        background-color: #eee;
        text-align: center;
        padding: 5px 10px;
      }
    }
  }
}
</style>