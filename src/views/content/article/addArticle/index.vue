<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础信息" name="first" style="margin-left: 58px">
        <el-form
          label-width="110px"
          :inline="true"
          :model="formData"
          :rules="rules"
          ref="form"
        >
          <el-form-item label="标题" prop="title" style="width: 80%">
            <el-input
              placeholder="请输入标题名称"
              style="width: 700px"
              v-model="formData.title"
            >
              <el-button slot="append" icon="el-icon-search">查重</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="作者" style="width: 40%" prop="author">
            <el-input
              placeholder="请输入作者"
              style="width: 300px"
              v-model="formData.author"
            />
          </el-form-item>
          <el-form-item label="分类" style="width: 40%" prop="cateid">
            <el-select
              placeholder="请选择"
              style="width: 200px"
              v-model="formData.cateid"
              @focus="getCate"
            >
              <el-option
                v-for="obj in cateList"
                :key="obj.id"
                :label="obj.catename"
                :value="obj.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阅读次数" style="width: 40%" prop="click">
            <el-input-number
              v-model="formData.click"
              @change="readChange"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="创建时间" style="width: 40%" prop="create_date">
            <el-date-picker
              v-model="time"
              type="date"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否推荐" style="width: 40%" prop="ishot">
            <el-switch
              v-model="formData.ishot"
              active-text="是"
              inactive-text="否"
              :active-value='1'
              :inactive-value='0'
            >
            </el-switch>
          </el-form-item>
           <el-form-item label="是否置顶" style="width: 40%" prop="istop">
            <el-switch
              v-model="formData.istop"
              active-text="是"
              inactive-text="否"
              :active-value='1'
              :inactive-value='0'
            >
            </el-switch>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="SEO信息" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="文章内容" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { getCateAllList } from '@/api/Cate'
export default {
  name: 'AddArticle',
  watch: {
    time(val) {
      this.formData.create_date = +new Date(val)
    }
  },
  data() {
    return {
      time: null,
      activeName: 'first',
      cateList: [],
      formData: {
        title: '',
        tags: '',
        status: '',
        author: '', //作者
        cateid: '', //分类id
        click: 1, //阅读次数
        content: '', //文章正文
        create_date: '', //创建时间戳
        description: '', //文章描述
        ishot: 0, //是否推荐，0否，1是
        istop: 0, //是否置顶，0否，1是
        keywords: '', //文章关键字
        lovenum: '', //点赞数量
        pic: '',
      },
      rules: {
        title: [{ required: 'true', message: '请输入标题' }],
        author: [{ required: 'true', message: '请输入作者' }],
        cateid: [{ required: 'true', message: '请选择' }],
        click: [{ required: 'true',message: '请选择' }],
        create_date: [{ required: 'true', message: '请选择' }],
        ishot:[{ required: 'true', message: '请选择' }],
         istop:[{ required: 'true', message: '请选择' }]
      },
    }
  },
  methods: {
    readChange(val) {
      this.formData.click = val
    },
    async getCate() {
      const res = await getCateAllList()
      this.cateList = res
    },
  },
}
</script>

<style>
</style>