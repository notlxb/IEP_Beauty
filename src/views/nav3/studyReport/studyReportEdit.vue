<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/studyReport' }">学习报表</el-breadcrumb-item>
      <el-breadcrumb-item>查看|编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-form :inline="true"  align="left" >
      <el-form-item label="学年">
        <el-select v-model="schoolYear" placeholder="请选择" :disabled="disabled">
          <el-option
              v-for="item in schoolYear_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学期">
        <el-select v-model="term" placeholder="请选择" :disabled="disabled">
          <el-option
              v-for="item in term_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月份">
        <el-select v-model="month" placeholder="请选择月份" :disabled="disabled" @change="queryMonthDetail(month)">
          <el-option
              v-for="item in month_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执教老师">
        <el-select v-model="teacher" placeholder="请选择" :disabled="disabled">
          <el-option
              v-for="item in teacher_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="tclass" placeholder="请选择" :disabled="disabled" @change="queryClass()">
          <el-option
              v-for="item in class_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学生">
        <el-select v-model="stuName" placeholder="请选择学生" :disabled="disabled">
          <el-option
              v-for="item in stuOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <el-table
        :data="LRTable"
        :stripe="true"
        style="width: 100%;"
        max-height="400">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
              border
              :data="props.row.week_table">
            <el-table-column
                align='center'
                prop="ss"
                label="课标">
            </el-table-column>
            <el-table-column
                prop="des"
                label="描述"
                v-if="false">
            </el-table-column>
            <el-table-column
                align='center'
                label="描述">
              <template slot-scope="s">
                <el-input
                    :disabled="disabled"
                    type="textarea"
                    v-model="props.row.week_table[s.$index].des">
                </el-input>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
          align='center'
          prop="week"
          label="周次"
          style="width: 20%;">
      </el-table-column>
      <el-table-column
          align='center'
          prop="theme"
          label="教学主题"
          style="width: 80%;">
      </el-table-column>
    </el-table>

    <el-divider></el-divider>


    <h3 style="text-align: center; margin-bottom: 1%">目标评鉴</h3>

    <el-input align="left" type="textarea" :disabled="disabled" v-model="evaluation"></el-input>

    <el-divider></el-divider>

    <el-form :inline="true" align="center">
      <el-form-item>
        <el-button type="danger" @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>当前月份没有学习报表生成！</span>
      <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "xuexibaobiao_edit",
        data(){
            return{
                dialogVisible:false,
                disabled:false,
                month_options: [
                    {value: '1 ', label: '1 '},{value: '2 ', label: '2 '},{value: '3 ', label: '3 '},{value: '4 ', label: '4 '},
                    {value: '5 ', label: '5 '},{value: '6 ', label: '6 '},{value: '7 ', label: '7 '},{value: '8 ', label: '8 '},
                    {value: '9 ', label: '9 '},{value: '10', label: '10'},{value: '11', label: '11'},{value: '12', label: '12'}
                ],
                term_options: [{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options: [{value: '2017-2018', label: '2017-2018'},
                    {value: '2018-2019', label: '2018-2019'},
                    {value: '2019-2020', label: '2019-2020'},
                    {value: '2020-2021', label: '2020-2021'}],
                class_options:[],
                stuOptions:[],
                teacher_options:[],


                stuName:'',
                tclass:'',
                month:'',
                term:'',
                schoolYear:'',
                teacher:'',
                evaluation:'',
                LRTable:[],
            }
        },

        mounted(){
            this.queryClasstable();
            this.queryTeacher();
            this.readLReport();
        },

        methods:{
            readLReport(){
                this.schoolYear = this.$store.state.LReports[0].schoolYear;
                this.term = this.$store.state.LReports[0].term;
                this.month = 1;
                this.readInfo(1);
                this.teacher = this.$store.state.LReports[0].teacher;
                this.tclass = this.$store.state.LReports[0].class;
                this.stuName = this.$store.state.LReports[0].stuName;
            },
            readInfo(m){
                m = parseInt(m);
                if (this.$store.state.LReports[0].months != null) {
                    for (var i = 0; i < JSON.parse(this.$store.state.LReports[0].months).length; i++) {
                        if (JSON.parse(this.$store.state.LReports[0].months)[i].month == m) {
                            this.LRTable = [];
                            this.evaluation = '';
                            for (var j = 0; j < JSON.parse(this.$store.state.LReports[0].months)[i].details.length; j++) {
                                this.LRTable.push(JSON.parse(this.$store.state.LReports[0].months)[i].details[j]);
                            }
                            this.evaluation = JSON.parse(this.$store.state.LReports[0].months)[i].evaluation;
                            return;
                        }
                        this.LRTable = [];
                        this.evaluation = '';
                        this.dialogVisible = true;
                    }
                }
            },
            goBack(){
                this.$router.replace({path: '/studyReport'});
            },
            queryClass(){
                this.stuOptions = [];
                this.$http.post('http://47.110.134.247/api/stu/queryClass', {
                    class_id: this.tclass,
                }, {}).then((response) => {
                    for (var i = 0; i < response.body.length; i++){
                        var opt = {};
                        opt.value = response.body[i].name;
                        opt.label = opt.value;
                        this.stuOptions.push(opt);
                    }
                })
            },
            queryMonthDetail(m){
                this.readInfo(m);
            },
            queryClasstable(){
                this.class_options = [];
                this.$http.post('http://47.110.134.247/api/stu/queClasstable', {
                    schoolName: "苏州工业园区仁爱学校",
                }, {}).then((response) => {
                    for (var i = 0; i < response.body.length; i++){
                        var opt = {};
                        opt.value = response.body[i].className;
                        opt.label = response.body[i].className;
                        this.class_options.push(opt);
                    }
                })
            },
            queryTeacher(){
                this.$http.post('http://47.110.134.247/api/stu/queSchoolTeachers', {
                    school:"苏州工业园区仁爱学校"
                },{}).then((response) => {
                    console.log(response);
                    for (var i = 0; i < response.body.length; i++) {
                        this.teacher_options.push({value:response.body[i].userName, label:response.body[i].userName, id:response.body[i].id});
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
