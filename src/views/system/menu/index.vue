<template>
  <el-card style="padding: 20px">
    <el-row style="padding-bottom: 10px">
      <el-button size="small" type="primary" plain icon="el-icon-plus" @click="addMenu"
        >新增</el-button
      >
    </el-row>
    <el-table
      border
      :data="menuList"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column label="菜单名称" prop="title"></el-table-column>
      <el-table-column label="菜单地址" prop="path"></el-table-column>
      <el-table-column label="权限标识" prop="mark"></el-table-column>
      <el-table-column
        label="图标"
        prop="icon"
        align="center"
      ></el-table-column>
      <el-table-column label="组件路径" prop="component"></el-table-column>
      <el-table-column label="类型" prop="type" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1">菜单</el-tag>
          <el-tag v-else type="success">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="is_show" align="center">
        <template slot-scope="scope">
          <el-switch :value="scope.row.is_show" :active-value="1"> </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            v-if="scope.row.type === 1"
            size="small"
            type="warning"
            icon="el-icon-plus"
            circle
          ></el-button>
          <el-button
            @click="delMenu(scope.row.id)"
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-menu ref="addMenu"/>
  </el-card>
</template>

<script>
import { getMenuAllList, delMenu } from '@/api/Menu'
import AddMenu from './components/add-menu.vue'
export default {
  name: 'MenuIndex',
  components:{
AddMenu
  },
  data() {
    return {
      menuList: [],
    }
  },
  created() {
    this.getMenuAllList()
  },
  methods: {
    async getMenuAllList() {
      const res = await getMenuAllList()
      this.menuList = res
    },
    async delMenu(id) {
      try {
        await this.$confirm('确认删除吗?')
        await delMenu({ id: id })
        this.getMenuAllList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
        if (err === 'cancel') {
          this.$message.error('取消删除')
        }
      }
    },
    addMenu(){
      this.$refs.addMenu.dialogShow=true
    }
  },
}
</script>

<style>
</style>