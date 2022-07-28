<template>
  <div>
    <div class="logo">
      <h3>优点达资讯管理系统</h3>
    </div>
    <!-- 菜单区域 -->
    <el-menu
    :collapse='isCollapse'
    :collapse-transition="false"
      background-color="#344154"
      text-color="#fff"
      :default-active="$route.path"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">后台主页</span>
      </el-menu-item>
      <el-submenu index="/system">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system_menu">菜单管理</el-menu-item>
          <el-menu-item index="/system_role">角色管理</el-menu-item>
          <el-menu-item index="/system_user">用户管理</el-menu-item>
          <el-menu-item index="/system_config">系统配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/content">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/content_cate">分类管理</el-menu-item>
          <el-menu-item index="/content_tag">标签管理</el-menu-item>
          <el-menu-item index="/content_article">文章管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/adv">
        <template slot="title">
          <i class="el-icon-s-open"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/adv_pos">广告位管理</el-menu-item>
          <el-menu-item index="/adv_img">广告图管理</el-menu-item>
          <el-menu-item index="/adv_link">友情链接管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/user">
        <template slot="title">
          <i class="el-icon-s-finance"></i>
          <span>会员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user_user">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'SidBar',
  computed:{
    ...mapState('setting',['isCollapse'])
  }
}
</script>

<style lang='less'>
.logo {
    height: 60px;
    line-height: 60px;
    background-color: #2b2f3a;
    h3 {
      text-align: center;
      color: #fff;
      font-weight: normal;
      font-size: 18px;
    }
  }
</style>