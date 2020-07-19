<template>
  <section>
    <el-divider></el-divider>
    <!--列表-->
    <div class="table">
      <div class="search-Box" style="display: inline-block;">
        <el-input  style="width: 320%"  placeholder="请输入需要查找的关键字" class="search"  v-model="search">
          <template slot="prepend">模糊搜索</template>
        </el-input>
      </div>
      <div>
        <el-table v-loading="loading" :data="tables" ref="tablesection" @select="handlesection" align="left" stripe>
          <el-table-column prop="student_id" label="学号"></el-table-column>
          <el-table-column prop="class_id" label="班级"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-dropdown >
                <el-button type="danger" icon="el-icon-s-tools">
                  操 作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu>
                  <el-dropdown-item  @click.native="viewAllEval(scope.row.student_id)">进入评量</el-dropdown-item>
                  <el-dropdown-item  @click.native="viewAllAna(scope.row.student_id)">评量分析</el-dropdown-item>
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
  </section>
</template>


<script>
  export default {
    data() {
      return {
        tempList:[],
        total:0,
        pageSize:10,
        currentPage1:1,

        search:'',
        tablesection:[],

        loading:true,
      }
    },
    computed:{
      tables:function(){
        var search=this.search;
        if(search.length > 0){
          return  this.$store.state.stuNNS.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
          // return this.$store.state.stuNNS
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
      await this.updateCourse();
      console.log(this.$store.state.stuNNS)
    },
    methods:{
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

      //跳转至学生的评量列表界面
      viewAllEval(stuID){
        this.$router.push({path:'/stuEvalList',query:{stuID: stuID, currentPage: this.currentPage1}})
      },
      //跳转至学生的评量分析列表界面
      viewAllAna(stuID){
        this.$router.push({path:'/evaluationAnalysis',query:{stuID: stuID, currentPage: this.currentPage1}})
      },

      //更新课程信息
      async updateCourse(){
        await this.$http.post('/api/stu/queStuWithCourse',{
        },{}).then((response) => {
          this.$store.dispatch("setstuNNS", response.bodyText);
          this.total = this.$store.state.stuNNS.length;
          if(this.$route.query.currentPage != undefined)
            this.currentPage1 = parseInt(this.$route.query.currentPage);
          this.currentChangePage(this.currentPage1);
          // console.log(this.tempList)
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
        var from = (currentPage - 1) * this.pageSize;
        var to = currentPage * this.pageSize;
        this.tempList = [];
        for (var i = from; i < to; i++) {
          if (this.$store.state.stuNNS[i]) {
            this.tempList.push(this.$store.state.stuNNS[i]);
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
