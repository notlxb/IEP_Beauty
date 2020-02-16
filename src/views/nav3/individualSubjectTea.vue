<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true"align="left" >
        <el-form-item>
          <el-button type="danger" icon="el-icon-plus" @click.native="to_edit(0,0)">新建教学</el-button>
        </el-form-item><br>
      </el-form>
    </el-col>
    <div class="table">
      <div class="search-Box">
        <el-input   placeholder="请输入需要查找的关键字" class="search"  v-model="search">
          <template slot="prepend">模糊搜索</template>
        </el-input>
      </div>
      <el-table :data="tables" align="left" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column
            prop="subject"
            column-key="subject"
            :filters="this.subject_a"
            :filter-method="filterHandler"
            label="学科"></el-table-column>
        <el-table-column
            prop="topic"
            column-key="topic"
            :filters="this.topic_a"
            :filter-method="filterHandler"
            label="课题"></el-table-column>
        <el-table-column
            prop="stuName"
            column-key="stuName"
            :filters="this.student_a"
            :filter-method="filterHandler"
            label="学生"></el-table-column>
        <el-table-column
            prop="teacher"
            column-key="teacher"
            :filters="this.teacher_a"
            :filter-method="filterHandler"
            label="任教老师"></el-table-column>
        <el-table-column prop="week" sortable label="周次"></el-table-column>
        <el-table-column prop="section" sortable label="节次"></el-table-column>
        <el-table-column label="维护">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="danger"icon="el-icon-s-tools">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="to_edit(scope.row.id,1)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native="to_edit(scope.row.id,2)">查看</el-dropdown-item>
                <el-dropdown-item @click.native="whetherDel(scope.row.id)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="paginationClass">
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
    <el-dialog
        title="提示"
        :visible.sync="this.dialogVisible"
        width="30%"
        :show-close="false">
      <span><font size="3">是否要删除这条信息？</font></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="delInfo(delID)"></el-button>
      </span>
    </el-dialog>
  </section>

</template>

<script>
    export default {
        name: "jitixuekejiaoxue",
        data(){
            return{
                student_a:[],
                subject_a:[],
                topic_a:[],
                teacher_a:[],
                tempList:[],
                total:0,
                pageSize:10,
                currentPage1:1,

                dialogVisible:false,
                delID:'',

                search:'',
            }
        },
        computed:{
            tables:function(){
                var search=this.search;
                if(search.length > 0){
                    return  this.$store.state.trainingSIlist.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.$store.state.trainingSIlist
                }else {
                    return  this.tempList.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.tempList
                }

            }
        },
        mounted(){
            this.updateTrainingSI();
        },
        methods:{
            filterHandler(value,row,column){
                const property = column['property'];
                return row[property] === value;
            },
            //删除信息
            whetherDel(ID){
                this.delID = ID;
                this.dialogVisible = true;
            },
            handleClose(){
                console.log(this.delID)
                this.dialogVisible = false;
            },
            delInfo(id) {
                this.$http.post('http://47.110.134.247/api/stu/delTrainingSbjIns',{
                    id:id
                },{}).then((response) => {
                    console.log('ok');
                });
                this.updateTrainingSI();
                this.dialogVisible = false;
            },
            //更新集体学科计划信息
            updateTrainingSI(){
                this.$http.post('http://47.110.134.247/api/stu/queTrainingSbjIns', {
                }, {}).then((response) => {
                    console.log(response)
                    this.$store.dispatch("setTrainingSIlist", response.bodyText);
                    this.total = this.$store.state.trainingSIlist.length;
                    //console.log(this.$store.state.trainingSIlist);
                    let subject_array = [];
                    let topic_array = [];
                    let studentname_array=[];
                    let teacher_array =[];
                    for(var i = 0; i <this.$store.state.trainingSIlist.length;i++){
                        var t= [];
                        t.subject = this.$store.state.trainingSIlist[i].subject;
                        subject_array.push(t.subject);
                        t.topic = this.$store.state.trainingSIlist[i].topic;
                        topic_array.push(t.topic);
                        t.stuName =this.$store.state.trainingSIlist[i].stuName;
                        studentname_array.push(t.stuName);
                        t.teacher = this.$store.state.trainingSIlist[i].teacher;
                        teacher_array.push(t.teacher);
                    }
                    let studentname_ac = studentname_array.filter(function (ele,index,self) {
                        return self.indexOf(ele) === index;
                    });

                    let subject_ac = subject_array.filter(function (ele,index,self) {
                        return self.indexOf(ele) === index;
                    });

                    let topic_ac = topic_array.filter(function (ele,index,self) {
                        return self.indexOf(ele) === index;
                    });

                    let teacher_ac = teacher_array.filter(function (ele,index,self) {
                        return self.indexOf(ele) === index;
                    });
                    for(let i = 0;i < studentname_ac.length;i++){
                        this.student_a.push({text:studentname_ac[i],value:studentname_ac[i]});
                    }
                    for(let i = 0;i < subject_ac.length;i++){
                        this.subject_a.push({text:subject_ac[i],value:subject_ac[i]});
                    }
                    for(let i = 0;i < topic_ac.length;i++){
                        this.topic_a.push({text:topic_ac[i],value:topic_ac[i]});
                    }
                    for(let i = 0;i < teacher_ac.length;i++){
                        this.teacher_a.push({text:teacher_ac[i],value:teacher_ac[i]});
                    }

                    this.currentChangePage(this.currentPage1);
                });
            },


            //跳转至个训学科计划编辑界面
            to_edit(id,isEdit){
                if (isEdit === 1 || isEdit === 2) {
                    this.$http.post('http://47.110.134.247/api/stu/queFullTrainingSbjIns', {
                        id: id
                    }, {}).then((response) => {
                        this.$store.dispatch("setTrainingSI", response.bodyText);
                        this.$router.push({path: '/indSubjectTeaEdit', query: {isEdit: isEdit},});
                    })
                }
                else {
                    this.$router.push({path: '/indSubjectTeaEdit', query: {isEdit: isEdit},});
                }
            },



            //分页
            handleSizeChange1: function(pageSize) { // 每页条数切换
                this.pageSize = pageSize;
                this.handleCurrentChange1(this.currentPage1);
            },
            handleCurrentChange1: function(currentPage) {//页码切换
                this.currentPage1 = currentPage;
                this.currentChangePage(currentPage);

            },
            //分页方法（重点）
            currentChangePage(currentPage) {
                var from = (currentPage - 1) * this.pageSize;
                var to = currentPage * this.pageSize;
                this.tempList = [];
                for (var i = from; i < to; i++) {
                    if (this.$store.state.trainingSIlist[i]) {
                        this.tempList.push(this.$store.state.trainingSIlist[i]);
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>

