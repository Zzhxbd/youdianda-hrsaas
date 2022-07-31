<template>
  <el-dialog title="添加菜单" :visible.sync="dialogShow">
    <el-form
      label-width="100px"
      inline
      :model="formData"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="菜单地址" prop="path">
        <el-input v-model="formData.path" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddMenu',
  data() {
    return {
      dialogShow: false,
      formData: {
        title: '',
        path: '',
      },
      rules: {
        title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        path: [
          { required: true, message: '请输入菜单地址', trigger: 'blur' },
          { pattern: /^\//, message: '菜单地址必须以/开头', trigger: 'blur' },
        ],
      },
    }
  },
}
</script>

<style>
</style>