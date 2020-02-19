<template>
  <section>
    <el-container>
      <!--      <div>{{this.$store.state.stuinfo[0].Courses}}</div>-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/courseEvaluation' }">课程评量</el-breadcrumb-item>
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
      <el-button type="danger" @click="show_data1()" >数据视图</el-button>
      <el-button type="danger"@click="show_data()">修改数据</el-button>
    </div>
    <el-divider></el-divider>
    <div v-show="show1">
      <!--      <div>-->
      <!--        <el-button type="primary" @click="changedata()">成长图</el-button>-->
      <!--        &lt;!&ndash;      <el-button type="primary" @click = "pass_data()">显示图形</el-button>&ndash;&gt;-->
      <!--      </div>-->
      <el-form>
        <el-form-item  ref="school_year" label="年度">
          <el-select   v-model="sch_year" placeholder="请选择"  @change = "choose_fields()" >
            <el-option v-for="item in school_year"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item   label="领域">
          <el-select  v-model="cho_fields" placeholder="请选择"  @change = "choose_sec_fields()" >
            <el-option v-for="item in fields"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item   label="次领域">
          <el-select v-model="cho_sec_fields" placeholder="请选择"  @change = "choose_pro()" >
            <el-option v-for="item in sec_fields"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item   label="项目">
          <el-select v-model="choose_project" placeholder="请选择" @change = "getdata()">
            <el-option v-for="item in projects"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div >
        <columnarchart ref="tdata" />
      </div>
    </div>

    <div v-show="show2">
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
          <el-radio-group v-model="radioarray[index]">
            <el-radio style="display: block" v-for="opt in radioes[index]":key="opt.value":label="opt.label":value="opt.label" >
              {{opt.value}}<br>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button type="danger" @click="eval_submit()">修改提交</el-button>
    </div>
  </section>
</template>

<script>
  import columnarchart from '../../../components/tools/echarts/columnar-chart'
  export default {
    components: {
      columnarchart
    },
    data(){
      return{
        show:false,
        show1:true,
        show2:false,
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

        stu_id:'',
        stu_id_index:'',
        school_year:[],
        sch_year:'',
        school_year_term:[],
        fields:[],
        cho_fields:'',
        term_location:'',
        sec_fields:[],
        cho_sec_fields:'',
        choose_project:'',
        projects:[],
        tidata1:[],
        tdata:[]
      }
    },
    mounted(){
      this.stu_id = this.$store.state.stuinfo[0].student_id;
      this.changedata();
      this.field1_traverse();
      this.evaDate = this.getDate();

    },

    methods:{
      show_data1(){
        this.show2 = false;
        this.show1 = true;
      },
      show_data(){
        this.show2 = true;
        this.show1 = false;
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


      changedata(){
        for(var i = 0;i < this.$store.state.stuinfo.length;i++){
          if(this.$store.state.stuinfo[i].student_id = this.stu_id){
            this.stu_id_index = i;
            break;
          }
        }
        //console.log(this.stu_id)
        this.choose_sch_year();

      },
      choose_sch_year(){
        this.sch_year = '';
        this.school_year = [];
        this.fields = [];
        this.cho_fields='';
        this.sec_fields=[];
        this.cho_sec_fields = '';
        this.projects=[];
        this.choose_project = '';
        let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
        for(let i = 0;i < stu_info.length;i++){
          this.school_year.push({label:stu_info[i].schoolYear+"--"+stu_info[i].term,value:stu_info[i].id});
        }
      },
      choose_fields(){
        this.fields = [];
        this.cho_fields='';
        this.sec_fields=[];
        this.cho_sec_fields = '';
        this.projects=[];
        this.choose_project = '';
        let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
        for(let i = 0;i < stu_info.length;i++){
          if(stu_info[i].id == this.sch_year){
            let evalu = stu_info[i].evaluation;
            this.term_location = i;
            let fields_B = [];
            for(let i = 0; i < evalu.length; i++){
              fields_B.push(evalu[i].领域);
            }
            var fields_A = fields_B.filter(function(ele,index,self){
              return self.indexOf(ele) == index;
            });
            for(let i = 0; i < fields_A.length;i++){
              this.fields.push({label:fields_A[i],value:i});
            }
          }
        }
      },
      choose_sec_fields(){
        this.sec_fields=[];
        this.cho_sec_fields = '';
        this.projects=[];
        this.choose_project = '';
        let ch_fields = this.fields[this.cho_fields].label;
        let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
        let evalu = stu_info[this.term_location].evaluation;
        let sec_fields_B = [];
        for(let i = 0;i < evalu.length;i++){
          if(evalu[i].领域 == ch_fields){
            sec_fields_B.push(evalu[i].次领域);
          }
        }
        var sec_fields_A = sec_fields_B.filter(function(ele,index,self){
          return self.indexOf(ele) == index;
        });
        for(let i = 0; i < sec_fields_A.length;i++){
          this. sec_fields.push({label:sec_fields_A[i],value:i});
        }
      },
      choose_pro(){
        this.projects=[];
        this.choose_project = '';
        let ch_pro = this.sec_fields[this.cho_sec_fields].label;
        let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
        let evalu = stu_info[this.term_location].evaluation;
        let count = 0;
        for(let i = 0;i < evalu.length;i++){
          if(evalu[i].次领域 == ch_pro){
            this.projects.push({label:evalu[i].项目,value:count});
            count++;
          }
        }
      },
      getdata(){
        this.tidata1 = [];
        this.tdata=[];
        let ch_fie = this.fields[this.cho_fields].label;
        let sec_fie = this.sec_fields[this.cho_sec_fields].label;
        let pro = this.projects[this.choose_project].label;
        let  stu_info = JSON.parse(this.$store.state.stuinfo[this.stu_id_index].Courses);
        let evalu = stu_info[this.term_location].evaluation;
        for(let i = 0;i < evalu.length;i++){
          if((evalu[i].领域 == ch_fie)&&(evalu[i].次领域 == sec_fie)&&(evalu[i].项目 == pro)){
            var information = evalu[i].长期目标;
            var title =[];
            var score = [];
            //console.log(Object.keys(information));
            for(let i in information){
              if(information[i].score != 0){
                title.push(information[i].title);
                score.push(information[i].score);
              }
            }
            this.tidata1.push({
              barGap:0,
              type:'bar',
              barWidth:16,
              data:score,
            });
            this.tidata1.push(title);
            this.tidata1.push(pro);
            // console.log(this.tidata1[0]);
          }
        }

        this.$nextTick(function () {
          this.$refs.tdata.drawLine(this.tidata1);
        });
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
                Courses[i].evaDate = this.evaDate;
                this.$http.post('/api/stu/upStuCourse', {
                  Course:Courses,
                  stuID:this.$store.state.stuinfo[0].student_id
                }, {}).then((response) => {
                  this.$router.push('/courseEvaluation')
                });
                return;
              }
            }
            for (var l = 0; ;l++)
              if(Courses[i].evaluation[l]==undefined) {
                Courses[i].evaluation[l] = this.evaluation;
                break;
              }

            Courses[i].evaDate = this.evaDate;
          }
        }

        this.$http.post('/api/stu/upStuCourse', {
          Course:Courses,
          stuID:this.$store.state.stuinfo[0].student_id
        }, {}).then((response) => {
          this.$router.push('/courseEvaluation')
        });
      }


    }
  }
</script>

<style scoped>

</style>
