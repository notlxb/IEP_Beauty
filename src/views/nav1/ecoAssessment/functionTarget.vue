<template>
  <section id="t3">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newContact', query:{currentPage:this.$route.query.currentPage} }">生态评量
      </el-breadcrumb-item>
      <el-breadcrumb-item
          :to="{path:'/checkNEdit', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">
        学生信息
      </el-breadcrumb-item>
      <el-breadcrumb-item
          :to="{path:'/checkNEdit/devTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">
        家长自评
      </el-breadcrumb-item>
      <el-breadcrumb-item>专项评估</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/materprehis'}">母亲孕史</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/stuInterest'}">兴趣爱好</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/healthstatus'}">健康状况</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/capacitystatus_1'}">能力现状-1</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/capacitystatus_2'}">能力现状-2</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="center"></el-divider>

    <!--发展性评估-->
    <h2>发展性评估</h2>

    <div class="buttons">
      <el-checkbox-group v-model="checked" @change="handleChecked">
        <el-checkbox v-for="item in tables" :label="item" :key="item" border>表{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="buttons">
      <el-button type="primary" @click="beginAssess">开始评估</el-button>
    </div>

  </section>

</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'
    import RadarChart from '../../../components/tools/echarts/radar-chart'

    export default {
        components: {},
        name: "function_target",
        data() {
            return {
                checked: [1, 2],
                tables: [1, 2, 3, 4, 5, 6],
            };
        },
        mounted() {

        },
        methods: {
            handleChecked() {
                // console.log(this.checked);
            },

            beginAssess() {
                console.log(this.checked);
            },

        }
    }
</script>

<style scoped>
  .buttons {
    margin-top: 1%;
    text-align: center;
  }
</style>
