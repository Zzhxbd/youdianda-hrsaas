<template>
  <el-card>
    <el-row>
      <el-form :inline="true">
        <el-form-item label="账号" label-width="40px">
          <el-input
            v-model="page.login_name"
            size="small"
            style="width: 200px"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="手机号" label-width="60px">
          <el-input
            v-model="page.phone"
            size="small"
            style="width: 200px"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="账号状态" label-width="80px">
          <el-select v-model="page.status" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="冻结" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="getUserList"
            >搜索</el-button
          >
          <el-button size="small" icon="el-icon-refresh" @click="resetBtn"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        style="margin-bottom: 10px"
        >新增</el-button
      >
    </el-row>
    <el-table border :data="list">
      <el-table-column label="#" width="80px" type="index"></el-table-column>
      <el-table-column label="账号" prop="login_name"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="角色" prop="role_id">
        <template slot-scope="scope">
          <el-tag
            type="success"
            v-for="(item, index) in scope.row.rolename"
            :key="index"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="create_date"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="冻结"
            @change="changeSwitch(scope.row.status, scope.row.id)"
          >
          </el-switch>
        </template>
      </el-table-column>
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
      title="'修改管理员'  '添加管理员'"
      :visible.sync="dialogVisible"
      @close="cancel"
    >
      <el-form
        label-width="100px"
        ref="form"
        :model="formData"
        :rules="rules"
        inline
      >
        <el-form-item label="管理员账号" prop="login_name">
          <el-input v-model="formData.login_name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="管理员姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="管理员邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="管理员手机" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="账号状态">
          <el-switch
            style="width: 200px"
            v-model="formData.status"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group
            v-model="formData.role_id"
            style="padding-left: 100px"
          >
            <el-checkbox
              v-for="item in roleList"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
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
  getUserList,
  editUser,
  deltUser,
  addtUser,
  getUserInfo,
} from '@/api/SystemUser'
import { getRoleAllList } from '@/api/Role'
export default {
  name: 'UserIndex',
  data() {
    return {
      list: [],
      roleList: [],
      page: {
        login_name: '',
        status: '',
        phone: '',
        page: 1,
        limit: 10,
        count: 0,
      },
      formData: {
        name: '',
        login_name: '',
        password: '',
        email: '',
        phone: '',
        role_id: [],
        status: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max: 6, message: '姓名2-6个字符', trigger: 'blur' },
        ],
        login_name: [{ required: true, message: '请输入', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 6, max: 16, message: '密码6-16个字符', trigger: 'blur' },
        ],
        email: [{ required: true, message: '请输入', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '手机号格式错误',
            trigger: 'blur',
          },
        ],
      },
      dialogVisible: false,
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data, count } = await getUserList(this.page)
      this.list = data
      this.page.count = count
      this.roleList = await getRoleAllList()
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.page.page = val
      this.getUserList()
    },
    resetBtn() {
      this.page.login_name = ''
      this.page.status = ''
      this.page.phone = ''
      this.getUserList()
    },
    async changeSwitch(status, id) {
      this.formData = { ...this.formData, status: status, id: id }
      await editUser(this.formData)
      this.$message.success('切换成功')
    },
    async delBtn(id) {
      try {
        await this.$confirm('确认删除吗?')
        await deltUser({ id: id })
        this.getUserList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.formData = {
        name: '',
        login_name: '',
        password: '',
        email: '',
        phone: '',
        role_id: [],
        status: '',
        id: '',
      }
      this.dialogVisible = false
    },
    async isOk() {
      try {
        await this.$refs.form.validate()
        if (this.formData.id) {
          await editUser(this.formData)
          this.$message.success('修改管理员成功')
          this.getUserList()
        } else {
          await addtUser(this.formData)
          this.$message.success('添加管理员成功')
          this.getUserList()
        }
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    async editBtn(id) {
      this.dialogVisible = true
      this.formData = await getUserInfo({ id: id })
    },
  },
}
</script>

<style>
</style>