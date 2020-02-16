<template>
  <section>
    <el-col :span="24" class="toolbar" >
          <el-button type="danger" icon="el-icon-plus"  @click.native="to_edit(0,0)">新建计划</el-button>
    </el-col>
    <div class="table">
      <div class="search-Box">
        <el-input   placeholder="请输入需要查找的关键字" class="search"  v-model="search">
          <template slot="prepend">模糊搜索</template>
        </el-input>
      </div>
      <el-table :data="tables" align="left" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="schoolYear" label="学年"></el-table-column>
        <el-table-column prop="term" label="学期"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>
        <el-table-column prop="subject" label="学科"></el-table-column>
        <el-table-column prop="teacher" label="任教老师"></el-table-column>
        <el-table-column prop="createDate" label="制定日期"></el-table-column>
        <el-table-column prop="updateDate" label="更新日期"></el-table-column>
        <el-table-column label="维护">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="danger" icon="el-icon-s-tools">
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
      <span>是否要删除这条信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="delInfo(delID)"></el-button>
      </span>
    </el-dialog>
  </section>

</template>

<script>
    export default {
        name: "jitixuekejihua",
        data(){
            return{
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
              return  this.$store.state.groupSPlist.filter(function(dataNews){
                return Object.keys(dataNews).some(function(key){
                  return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                })
              })
              return this.$store.state.groupSPlist
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
        async mounted(){
            this.updateGroupSP();
        },
        methods:{
            //更新集体学科计划信息
            updateGroupSP(){
                this.$http.post('http://47.110.134.247/api/stu/queGroupSbjPlan', {
                }, {}).then((response) => {
                    console.log(response);
                    this.$store.dispatch("setgroupSPlist", response.bodyText);
                    this.total = this.$store.state.groupSPlist.length;
                    this.currentChangePage(this.currentPage1);
                });
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
                this.$http.post('http://47.110.134.247/api/stu/delGroupSbjPl',{
                    id:id
                },{}).then((response) => {
                    console.log('ok');
                });
                this.updateGroupSP();
                this.dialogVisible = false;
            },

            //跳转至集体学科计划编辑界面
            to_edit(id,isEdit){

                if (isEdit === 1 || isEdit === 2) {
                    this.$http.post('http://47.110.134.247/api/stu/queFullGroupSbjPl', {
                        id: id
                    }, {}).then((response) => {
                        this.$store.dispatch("setgroupSP", response.bodyText);
                        this.$router.push({path: '/groupSubjectEdit', query: {isEdit: isEdit},});
                    })
                }
                else {
                    this.$router.push({path: '/groupSubjectEdit', query: {isEdit: isEdit},});
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
                    if (this.$store.state.groupSPlist[i]) {
                        this.tempList.push(this.$store.state.groupSPlist[i]);
                    }
                }
            },
        },

    }
</script>

<style scoped>
  .paginationClass{
   margin-top: 1%;
  }
</style>
