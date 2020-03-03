<template>
  <div >
    <el-container>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/iepMeeting' }">IEP会议</el-breadcrumb-item>
        <el-breadcrumb-item>编辑会议</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
    </el-container>
    <el-divider></el-divider>
    <el-container>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true"  align="left" >
          <el-form-item label="日期">
            <el-date-picker :disabled="disabled" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" align="left" v-model="date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="学年">
            <el-select :disabled="disabled" v-model="schoolYear" placeholder="请选择">
              <el-option
                  v-for="item in schoolYear_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学期">
            <el-select :disabled="disabled" v-model="term" placeholder="请选择">
              <el-option
                  v-for="item in term_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生">
            <el-input :disabled="disabled" align="left" v-model="stuName"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input :disabled="disabled" align="left" v-model="stuID"></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input :disabled="disabled" align="left" v-model="creator"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-container>
    <el-divider></el-divider>
    <div>
      <vue-ckeditor type="classic"  v-model="summary" :editors="editors1"
                    :config='config' :readonly="disabled"></vue-ckeditor>
    </div>
    <el-divider></el-divider>
    <el-form :inline="true" align="center">
      <el-button type="danger" @click="meeting_submit()">提交</el-button>
    </el-form>
  </div>

</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'
    export default {
        components:{'vue-ckeditor': VueCkeditor.component},
        data(){
            return{
                term_options: [{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options: [{value: '2017-2018', label: '2017-2018'},
                    {value: '2018-2019', label: '2018-2019'},
                    {value: '2019-2020', label: '2019-2020'},
                    {value: '2020-2021', label: '2020-2021'}],


                date:'',
                schoolYear:'',
                term:'',
                stuName:'',
                stuID:'',
                creator:'',
                summary:'',


                disabled:true,

                editors1: {
                    classic: ClassicEditor,
                },
                config:{
                    language:'zh-cn',
                    ckfinder: {
                        uploadUrl: '/api/stu/picture_IEP'
                    },
                },
            }
        },
        mounted(){
            if (this.$route.query.isEdit == 1) {
                this.disabled = false;
                console.log(this.$store.state.iepmeeting);
                this.readMeetingInfo();
            }else {
                this.disabled = true;
                console.log(this.$store.state.iepmeeting);
                this.readMeetingInfo();
            }
        },

        methods:{
            readMeetingInfo(){
                this.date = this.$store.state.iepmeeting[0].date;
                this.schoolYear = this.$store.state.iepmeeting[0].schoolYear;
                this.term = this.$store.state.iepmeeting[0].term;
                this.stuName = this.$store.state.iepmeeting[0].stuName;
                this.stuID = this.$store.state.iepmeeting[0].stuID;
                this.creator = this.$store.state.iepmeeting[0].creator;
                this.summary = this.$store.state.iepmeeting[0].summary;
            },

            meeting_submit() {
                var date = this.date;
                var schoolYear = this.schoolYear;
                var term = this.term;
                var stuName = this.stuName;
                var stuID = this.stuID;
                var creator = this.creator;
                var summary = this.summary;
                this.$http.post('/api/stu/upIepMeeting',{
                    schoolYear:schoolYear,
                    term:term,
                    stuName:stuName,
                    stuID:stuID,
                    creator:creator,
                    date:date,
                    summary:summary,
                    id:this.$store.state.iepmeeting[0].id,
                },{}).then((response)=>{
                    console.log(response);
                })
                console.log('success!');
                this.$router.replace({path:'/iepMeeting'});
            },
        }
    }
</script>

<style scoped>

</style>
