<template>
    <section>
        <el-divider></el-divider>
        <div class="table">
            <div class="search-Box">
                <el-input placeholder="请输入需要查找的关键字" class="search" v-model="search">
                    <template slot="prepend">模糊搜索</template>
                </el-input>
            </div>
            <el-table v-loading="loading" :data="tables" align="left" stripe>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="schoolYear" label="学年"></el-table-column>
                <el-table-column prop="term" label="学期"></el-table-column>
                <el-table-column prop="stuID" label="学号"></el-table-column>
                <el-table-column prop="stuName" label="学生"></el-table-column>
                <el-table-column prop="date" label="分析时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="danger" icon="el-icon-s-tools">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu>
                                <el-dropdown-item @click.native="to_edit(scope.row.id,1)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="to_edit(scope.row.id,2)">查看</el-dropdown-item>
                                <el-dropdown-item @click.native="whetherDel(scope.row.id,scope.row.stuName,scope.row.stuID)">删除</el-dropdown-item>
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
            <span><font size="3">是否要删除ID为</font><font size="4"><i><strong>{{delID}}</strong></i></font> <font size="3">
            ，学号为</font><font size="4"><i><strong>{{delStuID}}</strong></i></font> <font size="3">的</font><font size="4"><i><strong>{{delName}}</strong></i></font>
            <font size="3">同学的分析信息？</font></span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delAnalysis">确认删除</el-button>
          </span>
        </el-dialog>
    </section>
</template>

<script>
    export default {
       data(){
           return{
               dialogVisible:false,
               delID:0,
               delName:'null',
               delStuID:'null',

               search:'',
               tempList:[],
               total:0,
               pageSize:10,
               currentPage1:1,

               loading:true,
           }
       },
        computed:{
            tables:function(){
                var search=this.search;
                if(search.length > 0){
                    return  this.$store.state.iepmeetinglist.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.$store.state.iepmeetinglist
                }
                else{
                    return  this.tempList.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                    return this.tempList
                }
            }
        },
        mounted() {
           this.updateAnalysis();
        },
        methods:{
           //跳转至课程评量界面
           to_edit(id,isEdit){

           },



            //更新评估分析信息
            updateAnalysis(){

            },


            //删除评估信息
            delAnalysis() {

            },
            whetherDel(ID,Name,stuID){
                this.delID = ID;
                this.delName = Name;
                this.delStuID = stuID;
                this.dialogVisible = true;
            },
            handleClose(){
                console.log(this.delID)
                this.dialogVisible = false;
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
                console.log(this.$store.state.iepmeetinglist)
                var from = (currentPage - 1) * this.pageSize;
                var to = currentPage * this.pageSize;
                this.tempList = [];
                for (var i = from; i < to; i++) {
                    if (this.$store.state.iepmeetinglist[i]) {
                        this.tempList.push(this.$store.state.iepmeetinglist[i]);
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>
