<template>
  <section>
    <el-divider></el-divider>
    <!--列表-->
    <div class="table">
      <div style="display: inline-block;margin-bottom: 1%">
        <el-button  type="danger" @click="addStuCE()" >新增评量</el-button>
      </div>
      <div class="search-Box" style="display: inline-block;">
        <el-input  style="width: 320%"  placeholder="请输入需要查找的关键字" class="search"  v-model="search">
          <template slot="prepend">模糊搜索</template>
        </el-input>
      </div>
      <div>
        <el-table v-loading="loading" :data="tables" ref="tablesection" @select="handlesection" align="left" stripe>
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
            :total = "this.total"
            layout="total, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="新增课程评量" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="学年" label-width="15%">
          <el-select v-model="form.schoolYear" placeholder="请选择学年" width="50%">
            <el-option
                    v-for="item in form.schoolYear_options"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学期" label-width="15%">
          <el-select v-model="form.term" placeholder="请选择学期">
            <el-option
                    v-for="item in form.term_options"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程大类" label-width="15%">
          <el-select v-model="form.course_category" placeholder="请选择课程大类">
            <el-option
                    v-for="item in form.COURSE_options"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" label-width="15%">
          <el-select v-model="form.stu_class" @change="queStudents()" placeholder="请选择班级">
            <el-option
                    v-for="item in form.class_options"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生" label-width="15%">
          <el-select v-model="form.stu_id" @change="" placeholder="请选择学生" @change="selectStuName">
            <el-option
                    v-for="item in form.student_options"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>


<script>
  export default {
    data() {
      return {
        schYear:[],
        class_a:[],
        course_name:[],
        value:'',
        tempList:[],
        total:0,
        pageSize:10,
        currentPage1:1,

        search:'',
        tablesection:[],

        form:{
          schoolYear_options:[],
          COURSE_options:[],
          class_options:[],
          student_options:[],
          term_options:[
            {value: '上学期', label: '上学期'},
            {value: '下学期', label: '下学期'}
          ],

          schoolYear:'',
          course_category:'',
          stu_class:'',
          stu_id:'',
          stu_name:'',
          term:'',
        },
        dialogVisible:false,

        loading:true,
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
      await this.optionsInit();
      this.updateCourse()
    },
    methods:{
      //初始化选项
      async optionsInit(){
        this.form.schoolYear_options = [];
        this.form.COURSE_options = [];
        this.form.class_options = [];

        //初始化学年选项
        var date = new Date();
        var year = date.getFullYear();
        this.form.schoolYear_options.push({key:0, value:(year+1)+'-'+(year+2), label:(year+1)+'-'+(year+2)})
        this.form.schoolYear_options.push({key:1, value:year+'-'+(year+1), label:year+'-'+(year+1)});
        for (var i = 2; i < 7; i++){
          this.form.schoolYear_options.push({key:i, value:(year-i+1)+'-'+(year-i+2), label:(year-i+1)+'-'+(year-i+2)});
        }

        //初始化课程大类选项
        await this.$http.post('/api/stu/queCourseCategeories',{
          producerId:1
        },{}).then((response) => {
          for (var i = 0; i < response.body.length; i++)
            this.form.COURSE_options.push({key:i, value:response.body[i].label, label:response.body[i].label});
        });

        //初始化班级选项
        await this.$http.post('/api/stu/queClasstable', {
          schoolName: "苏州工业园区仁爱学校",
        }, {}).then((response) => {
          for (var i = 0; i < response.body.length; i++){
            this.form.class_options.push({key:i, value:response.body[i].className, label:response.body[i].className});
          }
        })

      },
      //获取班级学生名单
      async queStudents(){
        this.form.student_options = [];
        this.form.stu_id = '';
        await this.$http.post('/api/stu/queryClass',{
          class_id:this.form.stu_class
        },{}).then((response) => {
          console.log(response)
          for (var i = 0; i < response.body.length; i++)
            this.form.student_options.push({key:i, label:response.body[i].name, value:response.body[i].student_id});
        })
      },

      selectStuName(id){
        let stu = {};
        stu = this.form.student_options.find((item)=>{
          return item.value === id;
        });
        this.form.stu_name = stu.label;
      },

      filterHandler(value,row,column){
        const property = column['property'];
        return row[property] === value;
      },

      handlesection(val){
        this.tablesection = val;
      },

      //跳转至课程评量界面
      to_edit(stuID,schoolYear,term){
        this.$http.post('/api/stu/queryStuinfo',{
          AStuID:stuID
        },{}).then((response) => {
          this.$store.dispatch("setstuinfo", response.bodyText);
          this.$router.push({path:'/courseEdit',query:{schoolYear:schoolYear, term:term, currentPage: this.currentPage1}})
        });
      },

      //新增课程评量
      async addStuCE(){
        this.dialogVisible = true;
      },
      async dialogConfirm(){
        var Courses;
        await this.$http.post('/api/stu/queryStuinfo',{
          AStuID:this.form.stu_id
        },{}).then((response) => {
          if (response.body[0].Courses != null)
            Courses = JSON.parse(response.body[0].Courses)
          else
            Courses = [];
        });

        for (var i = 0; i < Courses.length; i++)
          if (Courses[i].term == this.form.term && Courses[i].class == this.form.stu_class && Courses[i].stuID == this.form.stu_id && Courses[i].courseName == this.form.course_category && Courses[i].schoolYear == this.form.schoolYear) {
            this.$message.error('该课程评量已存在！');
            this.dialogVisible = false;
            return;
          }

        Courses.push({
          term:this.form.term,
          class:this.form.stu_class,
          stuID:this.form.stu_id, evaDate:'',
          stuName:this.form.stu_name,
          courseName:this.form.course_category,
          evaluation:[],
          appraisal:[],
          schoolYear:this.form.schoolYear
        });
        await this.$http.post('/api/stu/upStuCourse',{
          Course:Courses,
          stuID:this.form.stu_id
        },{}).then((response) => {
          if (response.status == 200)
            this.to_edit(this.form.stu_id, this.form.schoolYear, this.form.term);
          else
            this.$message.error('错误！');
        });
        this.dialogVisible = false;
      },

      //更新课程信息
      async updateCourse(){
        await  this.$http.post('/api/stu/queCourse', {
        }, {}).then((response) => {
          this.$store.dispatch("setcourse", response.bodyText);
          // console.log(this.$store.state.course);
        });

        await this.$http.post('/api/stu/queStuCourse', {
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
          if(this.$route.query.currentPage != undefined)
            this.currentPage1 = parseInt(this.$route.query.currentPage);
          this.currentChangePage(this.currentPage1);
        });

        this.loading = false;
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
