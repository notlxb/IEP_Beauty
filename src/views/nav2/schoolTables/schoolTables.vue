<!--2019.07.10开始开发目标制定功能-->
<template>
  <section>
    <el-container>
      <div id="searchModal">
        <!--确定查询方式-->
        <el-radio-group
            v-model="searchMethod"
            class="searchMethod"
            :fill=activeColor
            @change="clearText()">
          <el-radio-button :label="-1">请选择查询方式</el-radio-button>
          <el-radio-button :label="1">班级</el-radio-button>
          <el-radio-button :label="2">姓名</el-radio-button>
          <el-radio-button :label="3">学号</el-radio-button>
        </el-radio-group>
        <!--按姓名查询-->
        <el-form :inline="true" v-if="searchMethod===2">
          <el-form-item label="按姓名查询" @submit.native.prevent>
            <el-input
                placeholder="请输入学生姓名"
                v-model="SName"
                clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <!--<el-button type="primary" icon="el-icon-search" @click="searchByName()">查询-->
            <!--符合整体色调 改用红色按钮 以下同-->
            <el-button type="danger" icon="el-icon-search" @click="searchByName()">查询</el-button>
          </el-form-item>
        </el-form>

        <!--按学号查询-->
        <el-form :inline="true" v-if="searchMethod===3">
          <el-form-item label="按学号查询">
            <el-input
                placeholder="请输入学生学号"
                v-model="SId"
                clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <!--<el-button type="primary" icon="el-icon-search" @click="searchById()">-->
            <el-button type="danger" icon="el-icon-search" @click="searchById()">查询</el-button>
          </el-form-item>
        </el-form>

        <!--按班级查询-->
        <el-form :inline="true" v-if="searchMethod===1">
          <el-form-item label="按班级查询">
            <el-select v-model="classes" placeholder="下拉选择班级">
              <el-option
                  v-for="item in allClasses"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!--<el-button type="primary" icon="el-icon-search" @click="searchByClass()">查询-->
            <el-button type="danger" icon="el-icon-search" @click="searchByClass()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-container>
    <el-table
        :data="presentStudents"
        border
        style="width: 100%">
      <el-table-column
          prop="studentId"
          label="学号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="classId"
          label="班级">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="info"
              icon="el-icon-s-promotion"
              @click="viewTables(scope.$index, scope.row)">查看
          </el-button>
          <!--<router-link to="/creat_school_tables">-->
          <el-button
              size="mini"
              type="success"
              icon="el-icon-plus"
              @click="createNew(scope.$index, scope.row)">新建
          </el-button>
          <!--</router-link>-->
          <!--<router-link to="/show_list">-->
          <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <!--</router-link>-->
          <!--<el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="block" id="pagination">
      <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total=totalCount>
      </el-pagination>
    </div>
    <!--<el-button type="primary" @click="mySession()">测试</el-button>-->
  </section>
</template>

<script>/* eslint-disable */
import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown'
/*import Mock from 'mockjs'*/
import axios from 'axios/index'

export default {
    data() {
        const allStudents = [];

        /*this.mockTest()*///在渲染页面是初始时得到需要展示在前端的后端数据
        //因为初始时不需要数据展示，查询后得到数据 所以不需要渲染页面时获取数据

        return {
            allStudents,
            activeColor: '#F56C6C', //单选框填充颜色
            searchMethod: '-1', //单选框默认选择值
            search: '',
            SName: '',
            SId: '',
            classes: '',
            totalCount: 0,
            allClasses: [
                {value: '仁（1）班', label: '仁（1）班'},
                {value: '仁（2）班', label: '仁（2）班'},
                {value: '义（1）班', label: '义（1）班'},
                {value: '义（2）班', label: '义（2）班'},
                {value: '义（3）班', label: '义（3）班'},
                {value: '义（4）班', label: '义（4）班'},
                {value: '礼（1）班', label: '礼（1）班'},
                {value: '礼（2）班', label: '礼（2）班'},
                {value: '礼（3）班', label: '礼（3）班'},
                {value: '礼（4）班', label: '礼（4）班'},
                {value: '智（1）班', label: '智（1）班'},
                {value: '智（2）班', label: '智（2）班'},
                {value: '智（3）班', label: '智（3）班'},
                {value: '智（4）班', label: '智（4）班'},
                {value: '信（1）班', label: '信（1）班'},
                {value: '信（2）班', label: '信（2）班'},
                {value: '暖星班（送教）', label: '暖星班（送教）'},
                {value: '入学评估', label: '入学评估'},
                {value: '毕业班级1', label: '毕业班级1'},
            ],
            presentStudents: []
        }
    },

    components: {ElSelectDropdown},
    methods: {
        mockTest() {
            axios.get('http://dataformmock.com').then((res) => {
                console.log(res.data.data.students);
                this.allStudents = res.data.data.students;
            })
            /*axios.get('http://dataformmock.com').then(function(res){
              console.log(res.data);
            });*/
        },
        searchByName() {
            console.log('查询的姓名：' + this.SName);
            //向后端传递将要查询的名字
            axios({
                method: 'get',
                //url:'http://dataformmock.com',
                // url: 'http://localhost:8082/scheduleSet/name/student/',
                url: 'http://47.110.134.247/group2_b/scheduleSet/name/student/',
                //用params的形式传递参数而不是data 这样使得传递的参数为原本实参类型而不是json
                //Problem solved！
                params: {
                    'name': this.SName
                },
            }).then((res) => {
                //console.log("This is res.data.data",res.data.data)
                //console.log(res.data.data)
                this.allStudents = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    this.allStudents.push(res.data.data[i])
                }
                this.totalCount = this.allStudents.length;
                this.initPagination();
                //搜索时清空其他输入框
                this.SId = this.classes = ''
            })/*then((res) => {
        console.log(res.data.data)
        this.allStudents = res.data.data
        console.log(this.allStudents)
        this.totalCount = res.data.data.length
        this.initPagination()
      })*/
        },

        searchById() {
            console.log(this.SId);
            //向后端传递将要查询的id
            axios({
                method: 'get',
                //url:'http://dataformmock.com',
                // url: 'http://localhost:8082/scheduleSet/studentId/student/',
                url: 'http://47.110.134.247/group2_b/scheduleSet/studentId/student/',
                params: {
                    'studentId': this.SId
                }
            }).then((res) => {
                this.allStudents = [];
                this.allStudents.push(res.data.data);
                this.totalCount = this.allStudents.length;
                this.initPagination();
                //搜索时清空其他输入框
                this.SName = this.classes = ''
            })
        },

        searchByClass() {
            console.log('查询的班级：' + this.classes);
            //向后端传递将要查询的班级名称
            axios({
                method: 'get',
                //url:'http://dataformmock.com',
                // url: 'http://localhost:8082/scheduleSet/classId/student/',
                url: 'http://47.110.134.247/group2_b/scheduleSet/classId/student/',
                params: {
                    'classId': this.classes,
                    'pageNumber': 0,
                    'pageSize': 10
                }
            }).then((res) => {
                console.log(res.data.data);
                console.log(res.data.data.students);
                this.allStudents = res.data.data.students;
                this.totalCount = res.data.data.totalCount;
                //this.classes = ''
                this.initPagination();
                //搜索时清空其他输入框
                this.SId = this.SName = ''
            })
        },

        initPagination() {
            //在此初始化分页的第一页
            if (this.totalCount < 10) {
                this.presentStudents = this.allStudents.slice(0, this.totalCount);
            } else {
                this.presentStudents = this.allStudents.slice(0, 10);
            }
        },

        handleCurrentChange(val) {
            //该函数再分页按钮改变时触发
            console.log(`当前页: ${val}`);
            //console.log(this.presentStudents);
            let begin = (val - 1) * 10;
            let end = val * 10;
            console.log('begin is: ' + begin + ' ;end is: ' + end);
            this.presentStudents = this.allStudents.slice(begin, end);
            console.log(this.presentStudents);
        },

        viewTables(index, row) {
            console.log('跳转之前');
            console.log(index, row);
            this.$router.push({
                path: '/showSchoolTables',
                //name: 'showSchoolTables',
                // 不需要了  否则引起错误 无法正常显示课程表
                query: {
                    row: row
                }
            })
        },

        handleEdit(index, row) {
            console.log('跳转之前');
            console.log(index, row);
            this.$router.push({
                path: '/editSchoolTables',
                query: {
                    row: row
                }
            })
        },

        createNew(index, row) {
            console.log('跳转之前');
            console.log(index, row);
            this.$router.push({
                path: '/createSchoolTables',
                query: {
                    row: row
                }
            })
        },

        handleDelete(index, row) {
            console.log(index, row)
        },

        /*切换查询方式时，清空输入框*/
        clearText() {
            //console.log("Trigger detected.");
            this.SName = this.SId = this.classes = '';
        },

        mySession() {
            var sessionTest = {};
            sessionTest.id = 'Session里的id';
            sessionTest.name = 'Session里的name';
            window.sessionStorage['searchIndex'] = JSON.stringify(sessionTest);

            this.$router.push({
                path: '/test_dir',
                name: 'test_dir',
            })
        }

    }
}
</script>

<style scoped>
  /*去除容器最外层8px边框*/
  /*    * {
          padding: 0;
          margin: 0;
      }*/

  .searchMethod {
    margin-bottom: 4%;
  }

  #pagination {
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
  }


</style>
