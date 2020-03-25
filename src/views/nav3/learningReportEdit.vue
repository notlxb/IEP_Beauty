<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/learningReport', query:{currentPage:this.$route.query.currentPage} }">学习报表</el-breadcrumb-item>
            <el-breadcrumb-item>查看|编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-container>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
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
                <el-select v-model="month" placeholder="请选择月份" :disabled="false" @change="readInfo(month)">
                    <el-option
                            v-for="item in month_options"
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
        </el-col>
        </el-container>

        <el-divider></el-divider>

        <el-collapse style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
            <el-collapse-item v-for="(domain, index) in LRTable"
                              :title="domain.subject"
                              :name="domain.subject"
                              :key="domain.subject">
                <template slot="title">
                    <div id="title">
                        {{domain.subject}}<i class="header-icon el-icon-info"></i>
                    </div>
                </template>
                <el-table
                        :data="domain.table"
                        :stripe="true"
                        style="padding: 10px;">
                    <el-table-column
                            align='center'
                            prop="week"
                            label="周次"
                            min-width="10%">
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="teachingTheme"
                            label="教学主题"
                            min-width="30%">
                    </el-table-column>
                    <el-table-column
                            align='center'
                            prop="teachingAim"
                            label="教学目标"
                            min-width="60%">
                    </el-table-column>
                </el-table>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>目标评鉴</span>
                    </div>
                    {{domain.evaluation}}
                </el-card>
            </el-collapse-item>
        </el-collapse>

        <el-divider></el-divider>

        <el-form :inline="true" align="center">
            <el-form-item>
                <el-button type="danger" @click="goBack()">返回</el-button>
                <el-button type="danger" @click="test()" >导出预览</el-button>
            </el-form-item>
        </el-form>
        <div id="file" v-show="false">
            <div>
                <p align="center" >学习报表</p>
                <p style="padding-left:300px;display: inline">学年：{{this.schoolYear}}学年</p>
                <p style="padding-left:100px;display: inline">学期：{{this.term}}</p>
                <p style="padding-left:100px;display: inline">月份：{{this.month}}月</p>
                <p>班级：{{this.tclass}}</p>
                <p>学生姓名：{{this.stuName}}</p>
            </div>
            <div>
                <table border="1" width="1000px" id="tb">

                </table>

            </div>
        </div>

    </div>
</template>

<script>
    import FileSaver from "file-saver";
    import $ from "jquery";
    import wordExport from "../../vendor/jquery.wordexport"

    export default {
        name: "learningReportEdit",
        data(){
            return{
                disabled:true,
                month_options: [],
                term_options: [{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options: [],
                class_options:[],
                stuOptions:[],


                stuName:'',
                tclass:'',
                month:'',
                term:'',
                schoolYear:'',

                LRTable:[],
                tableData: []

            }
        },

        mounted(){
            this.readLReport();
        },

        methods:{
            // init_options(){
            //     //初始化学年选项
            //     var year = new Date().getFullYear();
            //     this.schoolYear_options.push({key:0, value:(year+1)+'-'+(year+2), label:(year+1)+'-'+(year+2)});
            //     this.schoolYear_options.push({key:1, value:year+'-'+(year+1), label:year+'-'+(year+1)});
            //     for (var i = 2; ; i++)
            //         if (year-i+1 >= 2019)
            //             this.schoolYear_options.push({key:i, value:(year-i+1)+'-'+(year-i+2), label:(year-i+1)+'-'+(year-i+2)});
            //         else
            //             break;
            // },
            readLReport(){
                this.readMonths();
                this.schoolYear = this.$store.state.LReports[0].schoolYear;
                this.term = this.$store.state.LReports[0].term;
                this.month = this.month_options[0].value;
                this.readInfo(this.month_options[0].value);
                this.tclass = this.$store.state.LReports[0].class;
                this.stuName = this.$store.state.LReports[0].stuName;
            },
            readInfo(m){
                m = parseInt(m);
                if (JSON.parse(this.$store.state.LReports[0].months) != null) {
                    for (var i = 0; i < JSON.parse(this.$store.state.LReports[0].months).length; i++) {
                        if (JSON.parse(this.$store.state.LReports[0].months)[i].month == m) {
                            this.LRTable = [];
                            this.LRTable = JSON.parse(this.$store.state.LReports[0].months)[i].details;
                            return;
                        }
                        this.LRTable = [];
                    }
                }
            },

            readMonths(){
                if (JSON.parse(this.$store.state.LReports[0].months) != null)
                    for (var i = 0; i < JSON.parse(this.$store.state.LReports[0].months).length; i++)
                        this.month_options.push({value:JSON.parse(this.$store.state.LReports[0].months)[i].month, label:JSON.parse(this.$store.state.LReports[0].months)[i].month});
            },
            goBack(){
                this.$router.replace({path: '/learningReport', query:{currentPage: this.$route.query.currentPage}});
            },
            test(){
                let tableData = "<tr>";
                let str = ['学科领域','周次','教学主题','教学目标','目标评鉴'];
                for(let i = 0;i < 5;i++) {
                    tableData += "<td>" + str[i] + "</td>";
                }
                tableData += "</tr>";
                let lrtable = this.LRTable;
                for(let i = 0;i < lrtable.length;i++) {
                    let count = lrtable[i].table.length;
                    if(count === 1) count = 0;
                    if (count !== 0) {
                        for(let j = 0; j < lrtable[i].table.length; j++) {
                            tableData += "<tr>";
                            if (j === 0) {
                                tableData +=  "<td rowspan=" + count + ">" + lrtable[i].subject + "</td>";
                            }
                            tableData +=  "<td>" + lrtable[i].table[j].week + "</td>";
                            tableData +=  "<td>" + lrtable[i].table[j].teachingTheme + "</td>";
                            tableData +=  "<td>" + lrtable[i].table[j].teachingAim + "</td>";
                            if (j === 0) {
                                tableData += "<th rowspan=" + count + ">" + lrtable[i].evaluation + "</th>";
                            }
                            tableData += "</tr>";
                        }
                    }
                }
                $("#tb").html(tableData);
                let rules = "table{" +
                    "	border-collapse:collapse;" +
                    "	margin:0 auto;" +
                    "	text-align:center;" +
                    "	width: 90%;" +
                    "}" +
                    "table td,table th{" +
                    "   text-align:center;" +
                    "   border:1px solid #cad9ea;" +
                    "   color:#666;" +
                    "	height:25pt;" +
                    "	flex:1;" +
                    "}" +
                    "table thead th{" +
                    "	background-color:#C00000;" +
                    "	color:#fff;" +
                    " 	flex:1" +
                    "}" +
                    "table tr{" +
                    "	background:#fff;" +
                    "}";
                $("#file").wordExport(this.stuName+this.schoolYear+"学年-"+this.month+"月份"+"学习报表",rules);
            },
            }

    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        margin-top: 10px;
    }
    table{
        border-collapse:collapse;
        margin:0 auto;
        text-align:center;
        width: 90%;
    }
    table td,table th{
        text-align:center;
        border:1px solid #cad9ea;
        color:#666;
        height:30px;
        line-height: 30px;
        flex:1;
    }
    table thead th{
        background-color:#C00000;
        color:#fff;
        flex:1
    }
    table tr{
        background:#fff;
    }
    #title{
        align-self: center;
        font-weight: bold;
        font-size: large;
        font-family: 楷体;
        color: #000000;
        letter-spacing: 3px;
    }
    #title:hover{
        color: #1d8ce0;
    }
</style>

<!--<template>-->
<!--    <div>-->
<!--    <div id="file" v-show="false">-->
<!--        <el-table :data="tableData" border>-->
<!--            <el-table-column prop="data" label="日期" align="center"></el-table-column>-->
<!--            <el-table-column prop="name" label="日期" align="center"></el-table-column>-->
<!--            <el-table-column prop="address" label="地址" align="center"></el-table-column>-->
<!--        </el-table>-->
<!--    </div>-->
<!--        <el-button type="primary" @click="download">开始导出</el-button>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import FileSaver from "file-saver";-->
<!--    import $ from "jquery";-->
<!--    import wordExport from "../../vendor/jquery.wordexport";-->
<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                tableData:[-->
<!--                    {-->
<!--                        data:"2016-5-02",-->
<!--                        name:"wangxiansheng",-->
<!--                        address:"sdwedw"-->
<!--                    },-->
<!--                    {-->
<!--                        data:"2016-5-02",-->
<!--                        name:"wangxiansheng",-->
<!--                        address:"sdwedw"-->
<!--                    },-->
<!--                    {-->
<!--                        data:"2016-5-02",-->
<!--                        name:"wangxiansheng",-->
<!--                        address:"sdwedw"-->
<!--                    }-->
<!--                ]-->
<!--            };-->
<!--        },-->
<!--        methods:{-->
<!--            download(){-->
<!--                $("#file").wordExport('表格');-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->
