<template>
  <el-card style="padding: 10px">
    <el-row type="flex" justify="space-between" align="top">
      <el-form label-width="80px" :inline="true">
        <el-form-item label="分类名称">
          <el-input
            size="small"
            style="width: 200px"
            placeholder="请输入分类名称"
            v-model="page.catename"
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
    <el-table border :data="cateList">
      <el-table-column label="#" width="50px" type="index"></el-table-column>
      <el-table-column label="分类ID" prop="id"></el-table-column>
      <el-table-column label="分类名称" prop="catename"></el-table-column>
      <el-table-column label="图标class" prop="icon"></el-table-column>
      <el-table-column label="权重" prop="sort_num"></el-table-column>
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
      :page-sizes="[10, 8, 6, 4]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.count"
    >
    </el-pagination>
    <!-- 新增弹框 -->
    <el-dialog
      :title="this.formData.id? '修改分类':'添加分类'"
      :visible.sync="dialogVisible"
      @close="cancel"
    >
      <el-form label-width="80px" :model="formData" :rules="rules" ref="form">
        <el-form-item label="分类名称" prop="catename">
          <el-input
            style="width: 80%"
            placeholder="请输入分类名"
            v-model="formData.catename"
          />
        </el-form-item>
        <el-form-item label="标签名称" prop="icon">
          <el-input
            style="width: 30%"
            placeholder="请输入class名"
            v-model="formData.icon"
          />
          <a
            href="http://www.fontawesome.com.cn/"
            style="margin: 20px; color: #333; text-decoration: none"
            >具体参见fontawesome图标库</a
          >
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input-number
            v-model="formData.sort_num"
            @change="handleChange"
            :min="1"
            :max="10"
            label="排序大小"
          ></el-input-number>
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
  getCateList,
  addCates,
  editCates,
  delCates,
} from '@/api/Cate'
export default {
  name: 'CateIndex',
  data() {
    return {
      dialogVisible: false,
      cateList: [],
      page: {
        catename: '',
        page: 1,
        limit: 10,
        count: 0,
      },
      formData: {
        catename: '',
        sort_num: '',
        icon: '',
      },
      rules: {
        catename: [{ required: true, message: '请输入分类名' },],
        icon: [{ required: true, message: '请输入class名' },{pattern:/^fa-/,message:'class名格式不正确'}],
      },
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { count, data } = await getCateList(this.page)
      this.cateList = data
      this.page.count = count
    },
    handleSizeChange(val) {
      this.page.limit = val
      this.getCateList()
    },
    handleCurrentChange(val) {
      this.page.page = val
      this.getCateList()
    },
    handleChange(val) {
      this.formData.sort_num = val
    },
    cancel() {
      this.formData = {
        catename: '',
        sort_num: '',
        icon: '',
      }
      this.getCateList()
    },
    async isOk() {
      try {
        await this.$refs.form.validate()
      } catch (err) {
        console.log(err)
      }
      if (this.formData.id) {
        await editCates(this.formData)
        this.$message.success('修改成功')
        this.getCateList()
      } else {
        await addCates(this.formData)
        this.$message.success('添加成功')
        this.getCateList()
      }
      this.dialogVisible = false
    },
    editBtn(data) {
      this.dialogVisible = true
      this.formData = data
    },
    resetBtn() {
      this.page.catename = ''
      this.getCateList()
    },
    searchBtn() {
      if (this.page.catename.length) {
        this.getCateList()
      } else {
        this.$message.error('请先输入分类名')
      }
    },
    async delBtn(data) {
      try {
        await this.$confirm('确认删除吗')
      } catch (err) {
        console.log(err)
      }
      await delCates({ id: data.id })
      this.$message.success('删除成功')
      this.getCateList()
    },
  },
}
</script>

<style>
</style>