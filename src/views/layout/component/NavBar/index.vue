<template>
  <el-row
    type="flex"
    style="height: 60px"
    justify="space-between"
    align="middle"
  >
    <el-row class="header-left" type="flex" align="middle">
      <el-button
        @click="toggleCollapse"
        v-if="!isCollapse"
        size="small"
        icon="el-icon-s-fold"
      ></el-button>
      <el-button
        @click="toggleCollapse"
        v-else
        size="small"
        icon="el-icon-s-unfold"
      ></el-button>
      &nbsp;&nbsp;
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(obj, index) in locationList" :key="index">
          <router-link v-if="index < locationList.length - 1" :to="obj.path">{{
            obj.title
          }}</router-link>
          <span v-else>{{ obj.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar icon="el-icon-user-solid" size="small" src=""></el-avatar>
          {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>布局设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="quit"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-row>
</template>

<script>
import { mapState, mapMutations, mapGetters,mapActions } from 'vuex'
export default {
  name: 'NavBar',
  props: {
    locationList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState('setting',['isCollapse']),
    ...mapGetters('user',['name']),
  },
  methods: {
    ...mapMutations('setting',['toggleCollapse']),
    ...mapActions('user',['quitOut']),
    async quit() {
      try {
        await this.$confirm('退出就什么都没了', '提示')
        this.quitOut()
        this.$router.push('/login')
      } catch (err) {
        return
      }
    },
  },
}
</script>

<style lang='less'>
.layout-header {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  .el-dropdown-link {
    line-height: 60px;
  }
  .el-avatar {
    vertical-align: middle;
  }
}
</style>