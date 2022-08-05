<template>
  <el-card>
    <el-row type="flex" justify="space-between">
      <el-form :inline="true">
        <el-form-item label="角色名" label-width="80px">
          <el-input
            size="small"
            placeholder="请输入"
            style="width: 200px"
            v-model="page.name"
            @keydown.enter.native="getRoleList"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="getRoleList"
            >搜索</el-button
          >
          <el-button size="small" icon="el-icon-refresh" @click="resetBtn"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-button
        style="height: 35px"
        type="primary"
        plain
        size="small"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        >新增</el-button
      >
    </el-row>
    <el-table border :data="list">
      <el-table-column
        label="#"
        width="50px"
        type="index"
        align="center"
      ></el-table-column>
      <el-table-column width="350px" label="角色ID" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="name"></el-table-column>
      <el-table-column label="角色描述" prop="description"></el-table-column>
      <el-table-column label="创建时间" prop="create_date"></el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editBtn(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delBtn(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.page"
      :page-sizes="[10, 8, 6, 4]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.count"
    >
    </el-pagination>
    <el-dialog
      :title="formData.id? '修改用户':'添加用户'"
      :visible.sync="dialogVisible"
      @close="cancel"
    >
      <el-form label-width="100px" ref="form" :model="formData" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :data="menuList"
            :show-checkbox="true"
            :default-checked-keys="selectCheck"
            node-key="id"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="isOk">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  getRoleList,
  delRole,
  addRole,
  getRoleInfo,
  editRole,
} from '@/api/Role'
import { getMenuAllList } from '@/api/Menu'
export default {
  name: 'RoleIndex',
  data() {
    return {
      list: [],
      menuList: [],
      selectCheck: [],
      defaultProps: {
        label: 'title',
      },
      page: {
        page: 1,
        limit: 10,
        count: 0,
        name: '',
      },
      formData: {
        name: '',
        description: '',
        menuids: [],
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        description: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      dialogVisible: false,
    }
  },
  created() {
    this.getRoleList()
    this.getMenuAllList()
  },
  methods: {
    async getMenuAllList() {
      this.menuList = await getMenuAllList()
    },
    async getRoleList() {
      const { data, count } = await getRoleList(this.page)
      this.list = data
      this.page.count = count
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.getRoleList()
    },
    handleCurrentChange(val) {
      this.page.page = val
      this.getRoleList()
    },
    resetBtn() {
      this.page.name = ''
      this.getRoleList()
    },
    async delBtn(id) {
      try {
        await this.$confirm('确认删除吗?')
        await delRole({ id: id })
        this.$message.success('删除成功')
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    async isOk() {
      try {
        await this.$refs.form.validate()
        if (this.formData.id) {
          let res1 = this.getMenuids(this.$refs.tree.getCheckedNodes())
          let res2 = this.getMenuids(this.$refs.tree.getHalfCheckedNodes())
          this.formData.menuids = [...res1, ...res2]
          await editRole(this.formData)
          this.$message.success('修改成功')
        } else {
          let res1 = this.getMenuids(this.$refs.tree.getCheckedNodes())
          let res2 = this.getMenuids(this.$refs.tree.getHalfCheckedNodes())
          this.formData.menuids = [...res1, ...res2]
          await addRole(this.formData)
          this.$message.success('添加成功')
        }
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.dialogVisible = false
    },
    async editBtn(id) {
      this.dialogVisible = true
      this.formData = await getRoleInfo({ id: id })
      this.selectCheck = Array.from(this.getChildrenids(this.formData.authList))
    },
    getMenuids(list) {
      const menuids = []
      list.forEach((item) => {
        menuids.push(item.id)
      })
      return menuids
    },
    getChildrenids(list) {
      list.map((item) => {
        if (!item.children) {
          this.selectCheck.push(item.id)
        } else {
          this.getChildrenids(item.children)
        }
      })
      return this.selectCheck
    },
  },
}
</script>

<style>
</style>