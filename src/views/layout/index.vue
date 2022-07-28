<template>
  <el-container class="layout-container">
    <el-aside :width="isCollapse ? '64px': '230px'" class="layout-aside">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <NavBar :locationList='locationList'/>
      </el-header>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './component/SideBar'
import NavBar from './component/NavBar'
import {mapState} from 'vuex'
export default {
  name: 'LayoutIndex',
  components: {
    SideBar,
    NavBar
  },
  created() {
    // console.log(this.$route)
  },
  computed: {
    ...mapState('setting',['isCollapse']),
    locationList() {
      return this.$route.matched.map((item) => ({
        title: item.meta.title,
        path: item.path,
      }))
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  height: 100vh;
}
.layout-aside {
  background-color: #304156;
  
}

</style>