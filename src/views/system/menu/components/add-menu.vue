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
        <el-input v-model="formData.title" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="菜单地址" prop="path">
        <el-input v-model="formData.path" placeholder="路由地址,以/开头" />
      </el-form-item>
      <el-form-item label="组件地址" prop="component">
        <el-input
          v-model="formData.component"
          placeholder="组件存储路径地址,不以/开头"
        />
      </el-form-item>
      <el-form-item label="权限标识" prop="mark">
        <el-input
          v-model="formData.mark"
          placeholder="格式:controller@action"
        />
      </el-form-item>
      <el-form-item label="菜单标识" prop="icon">
        <el-input placeholder="请输入内容" v-model="formData.icon">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="重定向" prop="redirect">
        <el-input
          v-model="formData.redirect"
          placeholder="格式:controller@action"
        />
      </el-form-item>
      <el-form-item label="是否外链" prop="is_link">
        <el-radio v-model="formData.is_link" label="1">是</el-radio>
        <el-radio v-model="formData.is_link" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="排序" prop="redirect">
        <el-input-number v-model="formData.sort" @change="handleChange" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="是否显示" prop="is_show">
        <el-radio v-model="formData.is_show" label="1">是</el-radio>
        <el-radio v-model="formData.is_show" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="是否缓存" prop="is_cache">
        <el-radio v-model="formData.is_cache" label="1">是</el-radio>
        <el-radio v-model="formData.is_cache" label="0">否</el-radio>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="end">
      <el-button size="small">取消</el-button>
      <el-button type="primary" size="small">确认</el-button>
    </el-row>
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
        component: '',
        mark: '',
        icon: '',
        redirect: '',
        is_link:'0',
        is_show:'1',
        is_cache:'1',
        sort:10
      },
      rules: {
        title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        path: [
          { required: true, message: '请输入菜单地址', trigger: 'blur' },
          { pattern: /^\//, message: '菜单地址必须以/开头', trigger: 'blur' },
        ],
        mark: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
      },
    }
  },
  methods:{
    handleChange(value){
      this.sort=value
    }
  }
}
</script>

<style>
</style>