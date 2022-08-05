<template>
  <div class="login">
    <el-row class="login-container" type="flex" align="middle" justify="center">
      <el-col class="login-box" :span="6">
        <h3>优点达资讯管理系统</h3>
        <el-form :model="formData" :rules="loginRules" ref="formRef">
          <el-form-item prop="login_name">
            <el-input
              clearable
              prefix-icon="el-icon-user-solid"
              v-model="formData.login_name"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              clearable
              prefix-icon="el-icon-lock"
              type="password"
              v-model="formData.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="submitForm(formData)"
              :loading="isLoading"
              type="primary"
              style="width: 100%"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginIndex',
  data() {
    return {
      formData: {
        login_name: 'admin',
        password: '111111',
      },
      isLoading: false,
      loginRules: {
        login_name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 6, message: '用户名长度为1~6位', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度为6-16位', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    ...mapActions(['user/loginAction']),
    //表单验证
    async submitForm(data) {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.isLoading = true
          //发起请求
         await this['user/loginAction'](data)
          //跳转路由
          this.$router.push('/')
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.login-container {
  background: url('../../assets/v2-8dfcd19bb713ed71e6044bdb84d0772d_720w.jpg') no-repeat center;
  background-size: cover;
  min-height: 100vh;
}
.login-box {
  background-color: #fff;
  min-height: 300px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 5px 30px;
}
.login-box h3 {
  margin-bottom: 30px;
  text-align: center;
  color: orange;
  font-weight: normal;
  font-size: 22px;
  border-bottom: 1px solid #eee;
  line-height: 60px;
}
.login-box{
  opacity: 0.7;
}
</style>