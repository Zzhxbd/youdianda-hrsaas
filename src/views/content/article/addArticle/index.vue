<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础信息" name="first" style="margin-left: 58px">
        <el-form
          label-width="110px"
          :inline="true"
          :model="formData"
          :rules="rules"
          ref="form1"
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
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="是否置顶" style="width: 40%" prop="istop">
            <el-switch
              v-model="formData.istop"
              active-text="是"
              inactive-text="否"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="收藏数量" style="width: 40%" prop="lovenum">
            <el-input
              placeholder="请输入收藏数量"
              style="width: 300px"
              v-model="formData.lovenum"
            />
          </el-form-item>
          <el-form-item label="文章缩略图" style="width: 100%" prop="pic">
            <el-upload
              class="upload-demo"
              action="http://124.223.14.236:8060/admin/common/upload?type=images"
              :on-change="updatePic"
              :on-remove="removePic"
              :limit="1"
              name="点击查看详情"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="文章标签" prop="tags">
            <el-checkbox-group
              v-model="isTagsList"
              :min="0"
              :max="5"
              style="padding: 0 100px"
            >
              <el-checkbox
                v-for="obj in tagsList"
                :key="obj.id"
                :label="obj.tagname"
                >{{ obj.tagname }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="SEO信息" name="second">
        <el-form
          label-width="110px"
          :inline="true"
          :model="formData"
          :rules="rules"
          ref="form2"
        >
          <el-form-item
            label="seo关键字"
            prop="keywords"
            style="width: 80%; padding-left: 150px"
          >
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入SEO关键词名称"
              style="width: 700px"
              v-model="formData.keywords"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="seo的描述"
            prop="description"
            style="width: 80%; padding-left: 150px"
          >
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入SEO关键词名称"
              style="width: 700px"
              v-model="formData.description"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="文章内容" name="third">
        <quill-editor
          ref="text"
          v-model="formData.content"
          class="editor"
          :options="editorOption"
          style="height: 300px"
        />
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" align="center" justify="center">
      <el-button size="small" icon="el-icon-plus" type="success" @click="isOk"
        >立即发布</el-button
      >
      <el-button
        size="small"
        icon="el-icon-folder-checked"
        type="primary"
        @click="isSave"
        >保存草稿</el-button
      >
      <el-button
        size="small"
        type="warning"
        icon="el-icon-back"
        @click="$router.back()"
        >返回列表</el-button
      >
    </el-row>
  </el-card>
</template>

<script>
import { getCateAllList } from '@/api/Cate'
import { update } from '@/api/User'
import { getTagList } from '@/api/Tag'
import { addArticle, getArticleInfo, editArticle } from '@/api/Article'
export default {
  name: 'AddArticle',
  watch: {
    time(val) {
      this.formData.create_date = +new Date(val)
    },
    isTagsList(val) {
      this.formData.tags = val.join(',')
    },
  },
  data() {
    return {
      time: null,
      activeName: 'first',
      editorOption: {},
      cateList: [],
      tagsList: [],
      isTagsList: [],
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
        click: [{ required: 'true', message: '请选择' }],
        create_date: [{ required: 'true', message: '请选择' }],
        ishot: [{ required: 'true', message: '请选择' }],
        istop: [{ required: 'true', message: '请选择' }],
        lovenum: [{ required: 'true', message: '请填写收藏数量' }],
        pic: [{ required: 'true', message: '请选择图片' }],
        tags: [{ required: 'true', message: '请选择' }],
        keywords: [{ required: 'true', message: '请输入关键词' }],
        description: [{ required: 'true', message: '请输入ESO表述' }],
      },
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getArticleInfo()
    } else {
      this.getTagList()
    }
  },
  methods: {
    async getArticleInfo() {
      this.formData = await getArticleInfo({ id: this.$route.query.id })
    },
    readChange(val) {
      this.formData.click = val
    },
    async getCate() {
      const res = await getCateAllList()
      this.cateList = res
    },
    async updatePic(file) {
      if (file.status !== 'ready') return
      const pic = file.raw
      const fd = new FormData()
      fd.append('file', pic)
      const { savePath } = await update(fd)
      this.formData.pic = savePath
    },
    removePic() {
      this.formData.pic = ''
    },
    async getTagList() {
      const res = await getTagList()
      this.tagsList = res
    },
    async isOk() {
      try {
        await this.$refs.form1.validate()
        await this.$refs.form2.validate()
        this.formData.status = 2
        if (this.$route.query.id) {
          await editArticle(this.formData)
          this.$message.success('修改成功')
          this.$refs.form1.resetFields()
          this.$refs.form2.resetFields()
          this.$router.push({
            path: '/content_article',
          })
          setTimeout(function () {
            window.location.reload()
          }, 10)
        } else {
          await addArticle(this.formData)
          this.$message.success('添加成功')
          this.$refs.form1.resetFields()
          this.$refs.form2.resetFields()
          this.$router.push({
            path: '/content_article',
          })
          setTimeout(function () {
            window.location.reload()
          }, 10)
        }
      } catch (err) {
        console.log(err);
      }
    },
    async isSave() {
      try {
        await this.$refs.form1.validate()
        await this.$refs.form2.validate()
        this.formData.status = 1
        await addArticle(this.formData)
        this.$message.success('已添加草稿')
        this.$refs.form.resetFields()
        this.$router.push({
          path: '/content_article',
        })
        setTimeout(function () {
          window.location.reload()
        }, 100)
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style>
</style>