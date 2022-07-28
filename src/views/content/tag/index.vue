<template>
  <el-card style="padding: 10px">
    <el-row type="flex" justify="space-between" align="top">
      <el-form label-width="80px" :inline="true">
        <el-form-item label="标签名称">
          <el-input
            size="small"
            style="width: 200px"
            placeholder="请输入标签名称"
            v-model.trim="page.tagname"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="searchBtn"
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
    <el-table border :data="tagList">
      <el-table-column label="#" width="50px" type="index"></el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="标签名称" prop="tagname"></el-table-column>
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
      :page-sizes="[10, 12, 14, 16]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.count"
    >
    </el-pagination>
    <!-- 新增弹框 -->
    <el-dialog
      @close="closeDialog"
      :title="this.formData.id ? '修改标签' : '添加标签'"
      :visible.sync="dialogVisible"
    >
      <el-form label-width="80px" :model="formData" :rules="rules" ref="form">
        <el-form-item label="标签名称" prop="tagname">
          <el-input
            style="width: 80%"
            placeholder="请输入标签名"
            v-model.trim="formData.tagname"
          />
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
import { getTagPageList, addTags, editTags, delTags } from '@/api/Tag'
export default {
  name: 'TagIndex',
  data() {
    return {
      tagList: [],
      page: {
        tagname: '',
        page: 1,
        limit: 10,
        count: 0,
      },
      formData: {
        tagname: '',
        id: '',
      },
      rules: {
        tagname: [{ required: true, message: '请输入标签名', trigger: 'blur' }],
      },
      dialogVisible: false,
    }
  },
  created() {
    this.getTagList()
  },
  methods: {
    async getTagList() {
      const { count, data } = await getTagPageList(this.page)
      this.tagList = data
      this.page.count = count
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.getTagList()
    },
    handleCurrentChange(val) {
      this.page.page = val
      this.getTagList()
    },
    closeDialog() {
      this.formData = {
        tagname: '',
      }
      this.getTagList()
    },
    async isOk() {
      try {
        await this.$refs.form.validate()
      } catch (err) {
        console.log(err)
      }
      if (this.formData.id) {
        await editTags(this.formData)
        this.getTagList()
        this.$message.success('修改成功')
      } else {
        await addTags(this.formData)
        this.getTagList()
        this.$message.success('添加成功')
      }
      this.dialogVisible = false
    },
    searchBtn() {
      if (this.page.tagname.length) {
        this.getTagList()
      } else {
        this.$message.error('请输入标签后搜索')
      }
    },
    resetBtn() {
      this.page.tagname = ''
      this.getTagList()
    },
    async editBtn(data) {
      this.dialogVisible = true
      this.formData.tagname = data.tagname
      this.formData.id = data.id
    },
    async delBtn(data) {
      try {
        await this.$confirm('确认删除吗')
      } catch (err) {
        console.log(err)
      }
      await delTags({ id: data.id })
      this.$message.success('删除成功')
      this.getTagList()
    },
  },
}
</script>

<style>
</style>