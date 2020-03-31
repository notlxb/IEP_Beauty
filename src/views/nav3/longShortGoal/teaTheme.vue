<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true"align="left" >
        <el-form-item>
          <el-button type="danger" icon="el-icon-plus"  @click.native="to_edit(0,0)">新建目标</el-button>
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
        <el-table-column prop="schoolYear" label="学年"></el-table-column>
        <el-table-column prop="term" label="学期"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>
        <el-table-column prop="course" label="课程"></el-table-column>
        <el-table-column prop="month" label="月份"></el-table-column>
        <el-table-column prop="mainTeacher" label="执教教师"></el-table-column>
        <el-table-column label="维护">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="danger"icon="el-icon-s-tools">
                操 作<i class="el-icon-arrow-down el-icon--right"></i>
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
        <el-button type="danger" @click="handleClose">取 消</el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="delInfo(delID)"></el-button>
      </span>
    </el-dialog>
  </section>

</template>

<script>
    export default {
        name: "jiaoxuezhuti",
        data(){
            return{
              checkPermission:localStorage.getItem('Permission')[19],
              editPermission:localStorage.getItem('Permission')[20],

                tempList:[],
                total:0,
                pageSize:10,
                currentPage1:1,

                dialogVisible:false,
                delID:'',

                search:'',

              loading:true,
            }
        },
        computed:{
            tables:function(){
                var search=this.search;
                if(search.length > 0){
                    return  this.$store.state.teachingThemeList.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.$store.state.teachingThemeList
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
            this.updateTeachingTheme();
        },
        methods:{
            //更新集体学科计划信息
            async updateTeachingTheme(){
                await this.$http.post('/api/stu/queTeachingTheme', {
                }, {}).then((response) => {
                    console.log(response)
                    this.$store.dispatch("setTeachingThemeList", response.bodyText);
                    this.total = this.$store.state.teachingThemeList.length;
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
                this.$http.post('/api/stu/delTeachingTheme',{
                    id:id
                },{}).then((response) => {
                    console.log('ok');
                });
                this.updateTeachingTheme();
                this.dialogVisible = false;
            },

            //跳转至集体学科计划编辑界面
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
                    this.$http.post('/api/stu/queFullTeachingTheme', {
                        id: id
                    }, {}).then((response) => {
                        this.$store.dispatch("setTeachingTheme", response.bodyText);
                        this.$router.push({path: '/teaThemeEdit', query: {isEdit: isEdit, currentPage: this.currentPage1},});
                    })
                }
                else {
                    this.$router.push({path: '/teaThemeEdit', query: {isEdit: isEdit, currentPage: this.currentPage1},});
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
                    if (this.$store.state.teachingThemeList[i]) {
                        this.tempList.push(this.$store.state.teachingThemeList[i]);
                    }
                }
              console.log(this.tempList)
            },
        },

    }
</script>

<style scoped>

</style>
