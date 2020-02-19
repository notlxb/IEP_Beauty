<template>
  <section>
    <el-divider></el-divider>
    <!--列表-->
    <div class="table">
      <div style="display: inline-block;margin-bottom: 1%">
        <el-button  type="danger" v-show="show3" @click="Tocompare()" >评量对比</el-button>
        <el-button  type="danger" v-show="show4" @click="cancel_com()" >取消对比</el-button>
      </div>
      <div class="search-Box" style="display: inline-block;">
        <el-input  style="width: 320%"  placeholder="请输入需要查找的关键字" class="search"  v-model="search">
          <template slot="prepend">模糊搜索</template>
        </el-input>
      </div>
      <div v-show="show1">
        <el-table :data="tables" ref="tablesection" @select="handlesection" align="left" stripe>
          <!--      <el-table-column type="index" align="center"></el-table-column>-->
          <!--      <el-table-column label="多选">-->
          <!--        <template slot-scope="s">-->
          <!--          <el-checkbox @change="getStuid(s.row.stuID)"></el-checkbox>-->
          <!--        </template>-->
          <!--      </el-table-column>-->
          <el-table-column type="selection" label="选择" align="center"></el-table-column>
          <el-table-column
            :filters = this.schYear
            prop="schoolYear"
            label="学年"
            sortable
            column-key="schoolYear"
            :filter-method = "filterHandler"
          ></el-table-column>

          <el-table-column
            prop="term"
            label="学期"
            column-key="term"
            :filters="[{text:'上学期',value:'上学期'},{text:'下学期',value:'下学期'}]"
            :filter-method = "filterHandler"
            sortable></el-table-column>
          <el-table-column
            prop="class"
            label="班级"
            column-key="class"
            :filters=this.class_a
            :filter-method="filterHandler"
            sortable></el-table-column>
          <el-table-column
            prop="courseName"
            label="课程名称"
            column-key="courseName"
            :filters=this.course_name
            :filter-method="filterHandler"></el-table-column>
          <el-table-column prop="stuName" label="学生"></el-table-column>
          <el-table-column prop="stuID" label="学号" sortable></el-table-column>
          <el-table-column prop="evaDate" label="评量日期" sortable></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-dropdown >
                <el-button type="danger" icon="el-icon-s-tools">
                  操 作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu>
                  <el-dropdown-item  @click.native="to_edit(scope.row.stuID,scope.row.schoolYear,scope.row.term)">查看/编辑</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-class">
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="this.currentPage1"
            :page-size= "this.pageSize"
            :page-sizes="[2, 5, 10, 20]"
            :total = "this.total"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>

    </div>
    <div v-show="show2">
      <el-form>
        <el-form-item  ref="school_year" label="年 度">
          <el-select   v-model="sch_year" placeholder="请选择"  @change = "choose_fields()" >
            <el-option v-for="item in school_year"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item  ref="field1" label="领 域">
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
        <el-form-item  label="项 目">
          <el-select  v-model="project_value"   placeholder="请选择" @change="get_data_draw()">
            <el-option v-for="item in project"
                       :label="item.label"
                       :key="item.value"
                       :value="item.value" @click="this.change(item.value)">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div >
        <columnarchart ref="tdata" />
      </div>
    </div>

  </section>
</template>


<script>
  import columnarchart from '@/components/tools/echarts/columnar-chart'
  export default {
    components: {
      columnarchart
    },
    data() {
      return {
        //filters1:[{text:'2016/2017',value:'2016/2017'},{text:'2018/2019',value:'2018/2019'}],
        schYear:[],
        class_a:[],
        course_name:[],
        show1:true,
        show2:false,
        show3:true,
        show4:false,
        options: [
          {
            value: '选项1',
            label: '2019-2020'
          },
          {
            value: '选项2',
            label: '2018-2019'
          },
        ],
        value:'',
        tempList:[],
        total:0,
        pageSize:10,
        currentPage1:1,

        search:'',
        tablesection:[],
        dialogVisible:false,


        school_year:[],
        sch_year:'',
        field1: [],
        field_value:'',
        field_label:'',
        second_field:[],
        se_field_value:'',
        se_field_label:'',
        project:[],
        project_value:'',
        project_label:'',
        table_select_courses:[],
        tidata1:[]

      }
    },
    computed:{
      tables:function(){
        var search=this.search;
        if(search.length > 0){
          return  this.$store.state.stucourseslist.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
          return this.$store.state.stucourseslist
        }
        else {
          return  this.tempList.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
          return this.tempList
        }
      }
    },

    async mounted(){
      await  this.setStuCE();
      this.updateCourse()
    },
    methods:{

      filterHandler(value,row,column){
        const property = column['property'];
        return row[property] === value;
      },

      getStuid(stuID){
        console.log(stuID);
      },


      handlesection(val){
        this.tablesection = val;
      },
      cancel_com(){
        this.show1 = true;
        this.show2 = false;
        this.show3 = true;
        this.show4 = false;
      },

      async Tocompare() {

        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        this.show4 = true;
        var shuzu = [];
        this.table_select_courses = [];
        for (let i = 0; i < this.tablesection.length; i++) {
          shuzu.push(this.tablesection[i].stuID);
        }
        let school_year_repeat = [];
        for (let i = 0; i < shuzu.length; i++) {
          await this.$http.post('/api/stu/queryStuinfo', {
            AStuID: shuzu[i]
          }, {}).then((response) => {
            this.$store.dispatch("setstuinfo", response.bodyText);
          });
          let stu_info = JSON.parse(this.$store.state.stuinfo[0].Courses);
          this.table_select_courses.push(stu_info);
          for (let k = 0; k < stu_info.length; k++) {
            school_year_repeat.push(stu_info[k].schoolYear + "--" + stu_info[k].term);
          }
        }
        let school_year_not_repeat = school_year_repeat.filter(function (ele, index, self) {
          return self.indexOf(ele) == index;
        });
        for (let i = 0; i < school_year_not_repeat.length; i++) {
          this.school_year.push({label: school_year_not_repeat[i], value: i});
        }
        console.log(this.table_select_courses);
        this.field1_traverse();
      },
      field1_traverse(){
        for(var i=0; i<this.$store.state.course.length;i++) {
          if(this.$store.state.course[i].show_type=='1') {
            this.field1.push({label:this.$store.state.course[i].label,value:this.$store.state.course[i].id});
          }
        }
      },
      second_traverse(){
        this.termTarget={};
        this.second_field=[];
        this.se_field_value='';
        for (var i = 0; i < this.$store.state.course.length; i++) {
          if (this.$store.state.course[i].father == this.field_value) {
            this.second_field.push({
              label: this.$store.state.course[i].label,
              value: this.$store.state.course[i].id
            });
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
            this.project.push({
              label:this.$store.state.course[i].label,
              value:this.$store.state.course[i].id});
          }
        }
      },
      get_data_draw(){
        var school_year_term = (this.school_year[this.sch_year].label).split("--");
        for(let i = 0;i < this.$store.state.course.length;i++){
          if(this.$store.state.course[i].id == this.field_value){
            var first_field = this.$store.state.course[i].label;
          }else if (this.$store.state.course[i].id == this.se_field_value){
            var second_field = this.$store.state.course[i].label;
          }else if(this.$store.state.course[i].id == this.project_value){
            var third_project = this.$store.state.course[i].label;
            break;
          }
        }
        var check = 0;
        var score_all = [];
        for(let ij = 0;ij < this.table_select_courses.length;ij++) {
          let stu_info = this.table_select_courses[ij];
          console.log(stu_info);
          for (var i = 0; i < stu_info.length; i++) {
            if ((stu_info[i].schoolYear === school_year_term[0]) && (stu_info[i].term === school_year_term[1])) {
              let evalu = stu_info[i].evaluation;
              let stu_n = stu_info[i].stuName;
              console.log(evalu);
              console.log(stu_n);
              console.log(evalu.length);
              for (let j = 0; j < evalu.length; j++) {
                console.log(j);
                if ((evalu[j].领域 === first_field) && (evalu[j].次领域 === second_field) && (evalu[j].项目 === third_project)) {
                  var information = evalu[j].长期目标;
                  var title = [];
                  var score = [];
                  for (let k in information) {
                    title.push(information[k].title);
                    score.push(information[k].score);
                  }
                  score_all.push({
                    barGap: 0,
                    name: stu_n,
                    type: 'bar',
                    barWidth: 16,
                    data: score,
                  });
                }
              }
            }
          }
        }
        this.tidata1.push(score_all);
        this.tidata1.push(title);
        this.tidata1.push(third_project);
        this.$nextTick(function () {
          this.$refs.tdata.drawLine(this.tidata1);
        });
      },

      //跳转至课程评量界面
      to_edit(stuID,schoolYear,term){
        this.$http.post('/api/stu/queryStuinfo',{
          AStuID:stuID
        },{}).then((response) => {
          this.$store.dispatch("setstuinfo", response.bodyText);
          this.$router.push({path:'/courseEdit',query:{schoolYear:schoolYear, term:term}})
        });
      },

      //根据schedule表中的学生课表信息为对应学生设置课程评量
      async setStuCE(){
        var Schedule = await this.$http.post('/api/stu/queSchedule', {}, {});
        for (var i = 0; i < Schedule.body.length; i++){
          var c = Schedule.body[i];
          // console.log(c);x
          var Stu = await this.$http.post('/api/stu/queryStuinfo', {AStuID:c.student_id}, {});
          // console.log("******************");
          // console.log(i);
          //console.log(Stu);
          if (Stu.body.length == 0)
            continue;
          else if (Stu.body[0].Courses != null) {
            var isExist = false;
            for (var j = 0; j < JSON.parse(Stu.body[0].Courses).length; j++) {
              if (JSON.parse(Stu.body[0].Courses)[j].id == c.id) isExist = true;
            }
            if(!isExist){
              var courses = JSON.parse(Stu.body[0].Courses);
              var e = {};
              e.id = c.id.toString();
              e.schoolYear = c.year;
              if (c.semester == 1)
                e.term = "上学期";
              else
                e.term = "下学期";
              e.class = Stu.body[0].class_id;
              e.courseName = "义务教育课程标准";
              e.stuName = Stu.body[0].name;
              e.evaDate = "";
              e.stuID = Stu.body[0].student_id;
              e.evaluation = [];
              courses.push(e);
              console.log(courses);
              this.$http.post('/api/stu/upStuCourse', {
                Course: courses,
                stuID: Stu.body[0].student_id
              }, {})
            }
          }
          else {
            var courses = [];
            var e = {};
            e.id = c.id.toString();
            e.schoolYear = c.year;
            if (c.semester == 1)
              e.term = "上学期";
            else
              e.term = "下学期";
            e.class = Stu.body[0].class_id;
            e.courseName = "义务教育课程标准";
            e.stuName = Stu.body[0].name;
            e.evaDate = "";
            e.stuID = Stu.body[0].student_id;
            e.evaluation = [];
            courses.push(e);
            console.log(courses);
            this.$http.post('/api/stu/upStuCourse', {
              Course:courses,
              stuID:Stu.body[0].student_id
            }, {})
          }
        }
      },

      //更新课程信息
      updateCourse(){


        this.$http.post('/api/stu/queCourse', {
        }, {}).then((response) => {
          this.$store.dispatch("setcourse", response.bodyText);
          // console.log(this.$store.state.course);
        });

        this.$http.post('/api/stu/queStuCourse', {
        }, {}).then((response) => {
          this.$store.dispatch("setstucourses", null);
          this.$store.dispatch("setstucourseslist", null);
          let schoolYear_array=[];
          let class_array=[];
          let courseName_array=[];
          for (var i = 0; i < JSON.parse(response.bodyText).length; i++) {
            if (JSON.parse(response.bodyText)[i].Courses!=null) {
              for (var j = 0; j < JSON.parse(JSON.parse(response.bodyText)[i].Courses).length; j++) {
                var t = [];
                this.$store.dispatch("addstucourses", JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j]);
                t.schoolYear = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].schoolYear;
                schoolYear_array.push(t.schoolYear);
                t.term = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].term;
                t.class = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].class;
                class_array.push(t.class);
                t.courseName = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].courseName;
                courseName_array.push(t.courseName);
                t.stuName = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].stuName;
                t.evaDate = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].evaDate;
                t.stuID = JSON.parse(JSON.parse(response.bodyText)[i].Courses)[j].stuID;
                this.$store.dispatch("addstucourseslist", t);
              }
            }
          }
          let schoolYear_a = schoolYear_array.filter(function (ele,index,self) {
            return self.indexOf(ele) === index;
          });
          let class_a = class_array.filter(function (ele,index,self) {
            return self.indexOf(ele) === index;
          });
          let courseName_a = courseName_array.filter(function (ele,index,self) {
            return self.indexOf(ele) === index;
          });
          for(let i = 0;i < schoolYear_a.length;i++){
            this.schYear.push({text:schoolYear_a[i],value:schoolYear_a[i]});
          }
          for(let i = 0;i < class_a.length;i++){
            this.class_a.push({text:class_a[i],value:class_a[i]});
          }
          for(let i = 0;i < courseName_a.length;i++){
            this.course_name.push({text:courseName_a[i],value:courseName_a[i]});
          }
          this.total = this.$store.state.stucourseslist.length;
          this.currentChangePage(this.currentPage1);
        });
      },











      //分页
      handleSizeChange1: function(pageSize) { // 每页条数切换
        this.pageSize = pageSize;
        this.handleCurrentChange1(this.currentPage1);
      },
      handleCurrentChange1: function(currentPage) {//页码切换
        this.currentPage1 = currentPage;
        this.currentChangePage(currentPage);
        console.log(currentPage)

      },
      //分页方法（重点）
      currentChangePage(currentPage) {
        console.log(this.$store.state.stucourseslist)
        var from = (currentPage - 1) * this.pageSize;
        var to = currentPage * this.pageSize;
        this.tempList = [];
        for (var i = from; i < to; i++) {
          if (this.$store.state.stucourseslist[i]) {
            this.tempList.push(this.$store.state.stucourseslist[i]);
          }
        }
      },
    }
  }


</script>

<style scoped>
  .pagination-class{
    margin-top: 1%;
  }

</style>
