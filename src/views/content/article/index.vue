<template>
  <div>
    <router-view v-if="isAdd"/>
    <el-card style="padding: 10px" v-else>
      <el-row type="flex" justify="space-between" align="top">
        <el-form label-width="50px" :inline="true">
          <el-form-item label="标题">
            <el-input
              v-model="page.title"
              size="small"
              style="width: 200px"
              placeholder="请输入标题"
            />
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              @focus="getCate"
              size="small"
              style="width: 200px"
              placeholder="请选择分类"
              v-model="page.cateid"
            >
              <el-option
                v-for="obj in cateList"
                :key="obj.id"
                :label="obj.catename"
                :value="obj.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="time"
              style="width: 200px"
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
        style="height:40px"
          type="primary"
          plain
          size="mini"
          icon="el-icon-plus"
          @click="addBtn"
          >新增</el-button
        >
      </el-row>
      <el-table border :data="articleList" v-loading="loading">
        <el-table-column label="ID" width="80px" prop="id"></el-table-column>
        <el-table-column
          label="标题"
          width="300px"
          prop="title"
        ></el-table-column>
        <el-table-column
          label="分类名"
          width="100px"
          prop="catename"
        ></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100%"
              :src="'http://124.223.14.236:8060/' + scope.row.pic"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.create_date | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" width="100px">
          <template slot-scope="scope">
            <el-switch :value="scope.row.ishot" :active-value="1"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否置顶" width="100px">
          <template slot-scope="scope">
            <el-switch :value="scope.row.istop" :active-value="1"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="文章状态" width="100px">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.status === 0 ? '待审核' : '已发布' }}</el-tag>
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
    </el-card>
  </div>
</template>

<script>
import { getArticleList, delArticle } from '@/api/Article'
import { getCateAllList } from '@/api/Cate'
export default {
  name: 'ArticleIndex',
  data() {
    return {
      isAdd:this.$route.path==='/content_article/add'? true:false,
      articleList: [],
      cateList: [],
      loading: true,
      ishot: false,
      time: [],
      page: {
        start_time: '',
        end_time: '',
        title: '',
        cateid: '',
        page: 1,
        limit: 10,
        count: 0,
      },
    }
  },
  watch: {
    time(newVal) {
      this.page.start_time = +new Date(newVal[0])
      this.page.end_time = +new Date(newVal[1])
    },
    $route(to){
      if(to.path==='/content_article'){
        this.isAdd=false
      }
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      const { data, count } = await getArticleList(this.page)
      this.loading = false
      this.articleList = data
      this.page.count = count
    },
    handleSizeChange(val) {
      this.loading = true
      this.page.limit = val
      this.getArticleList()
    },
    handleCurrentChange(val) {
      this.loading = true
      this.page.page = val
      this.getArticleList()
    },
    async getCate() {
      const res = await getCateAllList()
      this.cateList = res
    },
    searchBtn() {
      this.loading = true
      this.getArticleList()
    },
    resetBtn() {
      this.loading = true
      this.page = {
        start_time: '',
        end_time: '',
        title: '',
        cateid: '',
        page: 1,
        limit: 10,
        count: 0,
      }
      this.time = []
      this.getArticleList()
    },
    async delBtn(data) {
      try {
        await this.$confirm('确认删除吗')
        await delArticle({ id: data.id })
        this.$message.success('删除成功')
        this.getArticleList()
      } catch (err) {
        return this.$message('取消删除')
      }
    },
    addBtn() {
      this.isAdd=true
      this.$router.push({
        path: '/content_article/add',
      })
    },
    editBtn(data){
      this.$router.push({
        path: '/content_article/add',
        query:{
          id:data.id
        }
      })
      this.isAdd=true
    }
  },
}
</script>

<style>
</style>