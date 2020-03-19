<template>
  <div id="iep_meeting">
    <el-container>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/iepMeeting', query:{currentPage:this.$route.query.currentPage} }">IEP会议</el-breadcrumb-item>
        <el-breadcrumb-item>新建会议</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
    </el-container>
    <el-divider></el-divider>
    <el-container>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <el-form :inline="true"  align="left" >
          <el-form-item label="日期">
            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" align="left" v-model="date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="学年">
            <el-select v-model="schoolYear" placeholder="请选择">
              <el-option
                  v-for="item in schoolYear_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学期">
            <el-select v-model="term" placeholder="请选择">
              <el-option
                  v-for="item in term_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生">
            <el-input align="left" v-model="stuName"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input align="left" v-model="stuID"></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input align="left" v-model="creator"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-container>
    <el-divider></el-divider>

    <vue-ckeditor style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" type="classic"  v-model="summary" :editors="editors1"
                  :config='config'></vue-ckeditor>

    <el-divider></el-divider>
    <el-form :inline="true" align="center">
      <el-button type="danger" @click="meeting_add()">添加</el-button>
      <el-button type="danger" @click.native="go_back()">返回</el-button>
    </el-form>
  </div>

</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'

    export default {
        name:"iep_meeting",
        components:{'vue-ckeditor': VueCkeditor.component},
        data(){
            return{
                date:'',
                schoolYear:'',
                term:'',
                stuName:'',
                stuID:'',
                creator:'',
                summary:'',
                term_options: [{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options: [],


                edt: ClassicEditor,
                disabled:false,
                editors1: {
                  classic: ClassicEditor,
                },
                config:{
                    language:'zh-cn',
                    placeholder:'点击此处编辑',
                    ckfinder: {
                        uploadUrl: '/api/stu/picture_IEP'
                    },
                },
            }
        },
        mounted(){
          this.init_options();
        },

        methods:{
            go_back(){
              this.$router.replace({path:'/iepMeeting', query:{currentPage: this.$route.query.currentPage}});
            },

            init_options(){
              //初始化学年选项
              var year = new Date().getFullYear();
              this.schoolYear_options.push({key:0, value:(year+1)+'-'+(year+2), label:(year+1)+'-'+(year+2)});
              this.schoolYear_options.push({key:1, value:year+'-'+(year+1), label:year+'-'+(year+1)});
              for (var i = 2; ; i++)
                if (year-i+1 >= 2019)
                  this.schoolYear_options.push({key:i, value:(year-i+1)+'-'+(year-i+2), label:(year-i+1)+'-'+(year-i+2)});
                else
                  break;
            },

            meeting_add() {
                var date = this.date;
                var schoolYear = this.schoolYear;
                var term = this.term;
                var stuName = this.stuName;
                var stuID = this.stuID;
                var creator = this.creator;
                var summary = this.summary;
                this.$http.post('/api/stu/addIepMeeting',{
                    schoolYear:schoolYear,
                    term:term,
                    stuName:stuName,
                    stuID:stuID,
                    creator:creator,
                    date:date,
                    summary:summary,
                },{}).then((response)=>{
                    console.log(response);
                });
                console.log('success!');
                this.$router.replace({path:'/iepMeeting', query:{currentPage: this.$route.query.currentPage}});
            },
            onClick(){},
        }
    }
</script>

<style scoped>

</style>
