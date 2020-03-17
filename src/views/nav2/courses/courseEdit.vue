<template>
  <section>
    <el-container>
      <!--      <div>{{this.$store.state.stuinfo[0].Courses}}</div>-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/courseEvaluation', query:{currentPage:this.$route.query.currentPage} }">课程评量</el-breadcrumb-item>
        <el-breadcrumb-item>填写课程评量</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
    </el-container>
    <el-divider></el-divider>
    <el-container>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true"  align="left" >
          <el-form-item label="学年">
            <el-input align="left" :disabled="true" :value="this.$route.query.schoolYear"></el-input>
          </el-form-item>
          <el-form-item label="学期">
            <el-input align="left" :disabled="true" :value="this.$route.query.term"></el-input>
          </el-form-item>
          <el-form-item label="评量日期">
            <el-input align="left" :disabled="true" v-model="evaDate"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input align="left" :disabled="true" :value="JSON.parse(this.$store.state.stuinfo[0].Courses)[0].class"></el-input>
          </el-form-item>
          <el-form-item label="学生">
            <el-input align="left" :disabled="true" :value="JSON.parse(this.$store.state.stuinfo[0].Courses)[0].stuName"></el-input>
          </el-form-item>
          <el-form-item label="课程">
            <el-input align="left" type="textarea" :disabled="true" autosize :value="JSON.parse(this.$store.state.stuinfo[0].Courses)[0].courseName"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-container>
    <el-divider></el-divider>

    <div>
      <el-form >
        <el-form-item  ref="field1" label="领域">
          <el-select v-model="field_value" placeholder="请选择" @change="second_traverse()" >
            <el-option v-for="item in field1"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="次领域">
          <el-select v-model="se_field_value" placeholder="请选择" @change="project_traverse()" >
            <el-option v-for="item in second_field"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value" @click="this.change(item.value)">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item  label="项目">
          <el-select  v-model="project_value"   placeholder="请选择" @change="pro_item_traverse()">
            <el-option v-for="item in project"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value" @click="this.change(item.value)">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form v-for="(item,index) in radio_title":key="item.value">
        <el-form-item :label="item.label">
          <el-radio-group v-model="radioarray[index]" :disabled="disabled">
            <el-radio style="display: block" v-for="opt in radioes[index]":key="opt.value":label="opt.label":value="opt.label" >
              {{opt.value}}<br>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>

      <el-form :inline="true" align="center">
        <el-form-item>
          <el-button type="danger" :disabled="disabled" @click="eval_submit()">修改提交</el-button>
          <el-button type="danger" @click.native="go_back()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
  export default {
    data(){
      return{
        disabled:false,
        field1: [],
        field_value:'',
        field_label:'',
        second_field:[],
        se_field_value:'',
        se_field_label:'',
        project:[],
        project_value:'',
        project_label:'',
        radio_title:[],
        radioes:[],
        radioarray:[],
        evaDate:'',
        evaluation:{},
        termTarget:{},
        appraisal:[],
      }
    },
    mounted(){
      if (this.$route.query.isEdit == 1)
        this.disabled = false;
      else
        this.disabled = true;
      this.field1_traverse();
      this.evaDate = this.getDate();
      this.getStuAppraisal();
    },
    methods:{
      getStuAppraisal(){
        var courses = JSON.parse(this.$store.state.stuinfo[0].Courses);
        for (var i = 0; i < courses.length; i++){
          if (courses[i].schoolYear == this.$route.query.schoolYear && courses[i].term == this.$route.query.term) {
            this.appraisal = [];
            for (var j = 0; j < courses[i].appraisal.length; j++){
              this.appraisal.push(courses[i].appraisal[j])
            }
          }
        }
      },
      getDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      field1_traverse(){
        // var value_nub=0;
        for(var i=0; i<this.$store.state.course.length;i++)
        {
          if(this.$store.state.course[i].show_type=='1')
          {
            this.field1.push({label:this.$store.state.course[i].label,value:this.$store.state.course[i].id});
            //value_nub++;
          }
        }
      },
      second_traverse(){
        this.termTarget={};
        this.second_field=[];
        this.se_field_value='';
        for (var i = 0; i < this.$store.state.course.length; i++) {
          if (this.$store.state.course[i].father == this.field_value) {
            // var s = this.$store.state.course[i].children_id;
            // var shuzu = [];
            // var str1 = s.substring(1, s.length - 1);
            // shuzu = str1.split(",");
            // for (var j = 0; j < shuzu.length; j++) {
            //   var c = parseInt(shuzu[j]);
            this.second_field.push({
              label: this.$store.state.course[i].label,
              value: this.$store.state.course[i].id
            });
            // }
          }
        }
      },
      project_traverse(){
        this.termTarget={};
        this.project=[];
        this.project_value='';
        this.radio_title=[];
        this.radioes=[];
        for(var i =0 ;i<this.$store.state.course.length;i++)
        {
          if(this.$store.state.course[i].father== this.se_field_value)
          {
            // var s = this.$store.state.course[i].children_id;
            // var shuzu=[];
            // var str1 = s.substring(1,s.length-1);
            // shuzu = str1.split(",");
            // for (var j = 0; j < shuzu.length ; j++)
            // {
            //   var c = parseInt(shuzu[j]);
            this.project.push({
              label:this.$store.state.course[i].label,
              value:this.$store.state.course[i].id});
            // }
          }
        }
      },
      pro_item_traverse(){
        this.termTarget={};
        this.radioes=[];
        this.radio_title=[];
        this.radioarray=[];
        for(var i = 0;i<this.$store.state.course.length;i++)
        {
          if(this.$store.state.course[i].father == this.project_value)
          {
            // var s = this.$store.state.course[i].children_id;
            // var shuzu=[];
            // var str1 = s.substring(1,s.length-1);
            // shuzu = str1.split(",");
            // for (var j = 0; j < shuzu.length ; j++)
            // {
            // var c = parseInt(shuzu[j]);
            this.radio_title.push({
              label:this.$store.state.course[i].label,
              value:this.$store.state.course[i].id});
            // var s2 = this.$store.state.course[c-1].children_id;
            // var arr=[];
            // var str2 = s2.substring(1,s2.length-1);
            // arr = str2.split(",");
            var arr1=[];
            for(var j = 0;j<this.$store.state.course.length;j++) {
              if (this.$store.state.course[j].father == this.$store.state.course[i].id) {
                var p = {
                  label: this.$store.state.course[j].grade,
                  value: this.$store.state.course[j].label
                };
                arr1.push(p)
              }
            }
            this.radioes.push(arr1)
            // }
          }
        }
        this.fieldID2label();
        for (var i = 0; i < JSON.parse(this.$store.state.stuinfo[0].Courses).length; i++){
          if (JSON.parse(this.$store.state.stuinfo[0].Courses)[i].schoolYear == this.$route.query.schoolYear && JSON.parse(this.$store.state.stuinfo[0].Courses)[i].term == this.$route.query.term)
            var json = JSON.parse(this.$store.state.stuinfo[0].Courses)[i].evaluation;
        }
        if (json.length > 0) {
          for (var i = 0; i < json.length; i++) {
            if ((json[i].领域 == this.field_label) && (json[i].次领域 == this.se_field_label) && (json[i].项目 == this.project_label)) {
              for (var j = 0; j < this.radio_title.length; j++) {
                this.radioarray.push(json[i].长期目标[this.radio_title[j].label].score);
              }
            }
          }
        }
        else{
          this.radioarray = [];
        }
      },
      change(name){
        console.log(name)
      },
      fieldID2label(){
        for (var i = 0; i < this.$store.state.course.length; i++){
          if(this.$store.state.course[i].id == this.field_value)
            this.field_label = this.$store.state.course[i].label;
          else if(this.$store.state.course[i].id == this.se_field_value)
            this.se_field_label = this.$store.state.course[i].label;
          else if(this.$store.state.course[i].id == this.project_value)
            this.project_label = this.$store.state.course[i].label;
        }
      },
      go_back(){
        this.$router.replace({path:'/courseEvaluation', query:{currentPage: this.$route.query.currentPage}});
      },
      eval_submit(){
        for (var i = 0; i < this.radio_title.length; i++){
          for (var j = 0; j < this.radioes[i].length; j++){
            if (this.radioes[i][j].label == this.radioarray[i]){
              var js = {};
              js.choice = this.radioes[i][j].value;
              js.score = this.radioes[i][j].label;
              js.title = this.radio_title[i].label;
              this.termTarget[this.radio_title[i].label] = js;
            }
          }
        }
        if (this.appraisal.length == 0)
          this.appraisal.push({领域:this.field_label, 描述:''});
        else
          for (var i = 0; i < this.appraisal.length; i++){
            if (this.field_label == this.appraisal[i].领域)
              break
            if (i == this.appraisal.length-1)
              this.appraisal.push({领域:this.field_label, 描述:''});
          }
        this.evaluation.领域 = this.field_label;
        this.evaluation.次领域 = this.se_field_label;
        this.evaluation.项目 = this.project_label;
        this.evaluation.长期目标 = this.termTarget;
        var Courses = JSON.parse(this.$store.state.stuinfo[0].Courses);
        for (var i = 0; i < Courses.length; i++){
          if (Courses[i].schoolYear == this.$route.query.schoolYear && Courses[i].term == this.$route.query.term)
          {
            for (var j = 0; ; j++){
              if (Courses[i].evaluation[j] == undefined)
                break;
              if ((Courses[i].evaluation[j].领域==this.evaluation.领域)&&(Courses[i].evaluation[j].次领域==this.evaluation.次领域)&&(Courses[i].evaluation[j].项目==this.evaluation.项目)) {
                Courses[i].evaluation[j] = this.evaluation;
                Courses[i].appraisal = [];
                Courses[i].evaDate = this.evaDate;
                for (var n = 0; n < this.appraisal.length; n++)
                  Courses[i].appraisal.push(this.appraisal[n])
                this.$http.post('/api/stu/upStuCourse', {
                  Course:Courses,
                  stuID:this.$store.state.stuinfo[0].student_id
                }, {}).then((response) => {
                  this.$router.replace({path:'/courseEvaluation', query:{currentPage: this.$route.query.currentPage}})
                });
                return;
              }
            }
            for (var l = 0; ;l++)
              if(Courses[i].evaluation[l]==undefined) {
                Courses[i].evaluation[l] = this.evaluation;
                Courses[i].appraisal = [];
                for (var n = 0; n < this.appraisal.length; n++)
                  Courses[i].appraisal.push(this.appraisal[n]);
                break;
              }
            Courses[i].evaDate = this.evaDate;
          }
        }
        this.$http.post('/api/stu/upStuCourse', {
          Course:Courses,
          stuID:this.$store.state.stuinfo[0].student_id
        }, {}).then((response) => {
          this.$router.replace({path:'/courseEvaluation', query:{currentPage: this.$route.query.currentPage}})
        });
      }
    }
  }
</script>

<style scoped>
</style>