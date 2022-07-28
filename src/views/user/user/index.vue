<template>
  <el-card style="padding: 10px">
    <el-row type="flex" justify="space-between" align="top">
      <el-form label-width="60px" :inline="true">
        <el-form-item label="用户名">
          <el-input
            v-model="page.username"
            size="small"
            style="width: 200px"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model="page.mobile"
            size="small"
            style="width: 200px"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="page.sex" size="small">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
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
        >新增</el-button
      >
    </el-row>
    <el-table border :data="userList">
      <el-table-column label="#" width="80px" type="index"></el-table-column>
      <el-table-column label="用户ID" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="用户头像">
        <template slot-scope="scope">
          <el-image
            style="width: 100%"
            :src="'http://124.223.14.236:8060/' + scope.row.icon"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex" type="success">女</el-tag>
          <el-tag v-else>男</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="出生年月">
        <template slot-scope="scope">
          <span>{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editBtn(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delBtn(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.count"
    >
    </el-pagination>
    <!-- 新增弹框 -->
    <el-dialog
      :title="this.formData.id ? '修改用户' : '添加用户'"
      :visible.sync="dialogVisible"
      @close="cancel"
    >
      <el-form
        label-width="80px"
        ref="form"
        :inline="true"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            style="width: 80%"
            placeholder="请输入用户名称"
            v-model="formData.username"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            style="width: 80%"
            placeholder="请输入手机号"
            v-model="formData.mobile"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            style="width: 80%"
            placeholder="请输入密码"
            v-model="formData.password"
          />
        </el-form-item>
        <el-form-item label="标签名称" prop="sex">
          <el-switch
            v-model="formData.sex"
            active-text="男"
            inactive-text="女"
            :active-value="0"
            :inactive-value="1"
          >
          </el-switch>
        </el-form-item>
        <br />
        <el-form-item style="magin: 20ox">
          <el-upload
            class="upload-demo"
            action=""
            :on-change="change"
            :file-list="icon"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
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
import { getUserList, addUsers, editUsers ,delUser} from '@/api/UserVip'
import { update } from '@/api/User'
export default {
  name: 'UserVipIndex',
  data() {
    return {
      userList: [],
      dialogVisible: false,
      page: {
        sex: '',
        username: '',
        mobile: '',
        page: 1,
        limit: 10,
        count: 0,
      },
      icon: [],
      formData: {
        icon: '',
        mobile: '',
        password: '',
        sex: null,
        username: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '用户名2-6个字符', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern:
              /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // {
          //   pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          //   message: '至少六个字符,有一个字母和一个数字',
          // },
        ],
        sex: [{ required: true }],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data, count } = await getUserList(this.page)
      this.userList = data
      this.page.count = count
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
      this.page = {
        sex: '',
        username: '',
        mobile: '',
        page: 1,
        limit: 10,
        count: 0,
      }
      this.getUserList()
    },
    cancel() {
      this.formData = {
        icon: '',
        mobile: '',
        password: '',
        sex: 1,
        username: '',
      }
      this.dialogVisible = false
    },
    async isOk() {
      try {
        await this.$refs.form.validate()
        if (this.formData.id) {
          await editUsers(this.formData)
          this.$message.success('修改成功')
          this.getUserList()
        } else {
          await addUsers(this.formData)
          this.$message.success('添加成功')
          this.getUserList()
        }
      } catch (err) {
        console.log(err)
      }
      this.dialogVisible = false
    },
    async change(file) {
      if (file.status !== 'ready') return
      console.log(file)
      const icon = file.raw
      const fd = new FormData()
      fd.append('file', icon)
      const { savePath } = await update(fd)
      this.formData.icon = savePath
    },
    editBtn(data) {
      this.dialogVisible = true
      this.formData = data
    },
   async delBtn(data){
      try {
        await this.$confirm('确认删除吗')
      } catch (err) {
        console.log(err)
      }
      await delUser({ id: data.id })
      this.$message.success('删除成功')
      this.getUserList()
    }
  },
}
</script>

<style lang='less' scoped>
</style>