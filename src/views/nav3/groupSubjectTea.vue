<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true"align="left" >
        <el-form-item>
          <el-button type="danger" icon="el-icon-plus" @click.native="to_edit(0,0)">新建教案</el-button>
        </el-form-item><br>
      </el-form>
    </el-col>
    <div class="table">
      <div class="search-Box">
        <el-input   placeholder="请输入需要查找的关键字" class="search"  v-model="search">
          <template slot="prepend">模糊搜索</template>
        </el-input>
      </div>
      <el-table v-loading="loading" :data="tables" align="left" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column
            prop="class"
            column-key="class"
            :filters="this.class_a"
            :filter-method="filterHandler"
            label="班级"></el-table-column>
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
          :total = "this.total"
          layout="total, prev, pager, next, jumper">
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
              checkPermission:localStorage.getItem('Permission')[21],
              editPermission:localStorage.getItem('Permission')[22],

                class_a:[],
                subject_a:[],
                topic_a:[],
                teacher_a:[],
                tempList:[],
                total:0,
                pageSize:10,
                currentPage1:1,

                delID:'',
                dialogVisible:false,

                search:'',

              loading:true,
            }
        },
        computed:{
            tables:function(){
                var search=this.search;
                if(search.length > 0){
                    return  this.$store.state.groupSIlist.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.$store.state.groupSIlist
                }else{
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
            this.updateGroupSI();
        },
        methods:{
            filterHandler(value,row,column){
                const property = column['property'];
                return row[property] === value;
            },
            //更新集体学科计划信息
            async updateGroupSI(){
                await this.$http.post('/api/stu/queGroupSbjIns', {
                }, {}).then((response) => {
                    console.log(response)
                    this.$store.dispatch("setGroupSIlist", response.bodyText);
                    this.total = this.$store.state.groupSIlist.length;
                    let class_array = [];
                    let subject_array = [];
                    let topic_array = [];
                    let teacher_array =[];
                    for(var i = 0; i <this.$store.state.groupSIlist.length;i++){
                        var t= [];
                        t.class =this.$store.state.groupSIlist[i].class;
                        class_array.push(t.class);
                        t.subject = this.$store.state.groupSIlist[i].subject;
                        subject_array.push(t.subject);
                        t.topic = this.$store.state.groupSIlist[i].topic;
                        topic_array.push(t.topic);
                        t.teacher = this.$store.state.groupSIlist[i].teacher;
                        teacher_array.push(t.teacher);
                    }
                    let class_ac = class_array.filter(function (ele,index,self) {
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
                    for(let i = 0;i < class_ac.length;i++){
                        this.class_a.push({text:class_ac[i],value:class_ac[i]});
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
                    if(this.$route.query.currentPage != undefined)
                      this.currentPage1 = parseInt(this.$route.query.currentPage);
                    this.currentChangePage(this.currentPage1);
                });
                this.loading = false;
            },

            //删除信息
            whetherDel(ID){
              if (this.editPermission != 1){
                this.$message.warning("暂无权限！");
                return;
              }
                this.delID = ID;
                this.dialogVisible = true;
            },
            handleClose(){
                console.log(this.delID)
                this.dialogVisible = false;
            },
            delInfo(id) {
                this.$http.post('/api/stu/delGroupSbjIns',{
                    id:id
                },{}).then((response) => {
                    console.log('ok');
                });
                this.updateGroupSI();
                this.dialogVisible = false;
            },

            //跳转至个训学科计划编辑界面
            to_edit(id,isEdit){
              if (isEdit == 0 && this.editPermission != 1){
                this.$message.warning("暂无权限！");
                return;
              }
              if (isEdit == 1 && this.editPermission != 1){
                this.$message.warning("暂无权限！");
                return;
              }
              if (isEdit == 2 && this.checkPermission != 1){
                this.$message.warning("暂无权限！");
                return;
              }
                if (isEdit == 1 || isEdit == 2) {
                    this.$http.post('/api/stu/queFullGroupSbjIns', {
                        id: id
                    }, {}).then((response) => {
                        this.$store.dispatch("setGroupSI", response.bodyText);
                        this.$router.push({path: '/groupSubjectTeaEdit', query: {isEdit: isEdit, currentPage: this.currentPage1}});
                    })
                }
                else {
                    this.$router.push({path: '/groupSubjectTeaEdit', query: {isEdit: isEdit, currentPage: this.currentPage1}});
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
                    if (this.$store.state.groupSIlist[i]) {
                        this.tempList.push(this.$store.state.groupSIlist[i]);
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>
