<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/learningReport' }">学习报表</el-breadcrumb-item>
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

        <el-divider></el-divider>

        <el-collapse>
            <el-collapse-item v-for="(domain, index) in LRTable"
                              :title="domain.subject"
                              :name="domain.subject"
                              :key="domain.subject">
                <el-table
                        :data="domain.table"
                        :stripe="true">
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
                <el-button type="primary" @click="goBack()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "learningReportEdit",
        data(){
            return{
                disabled:true,
                month_options: [],
                term_options: [{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options: [{value: '2017-2018', label: '2017-2018'},
                    {value: '2018-2019', label: '2018-2019'},
                    {value: '2019-2020', label: '2019-2020'},
                    {value: '2020-2021', label: '2020-2021'}],
                class_options:[],
                stuOptions:[],


                stuName:'',
                tclass:'',
                month:'',
                term:'',
                schoolYear:'',
                LRTable:[{
                        subject:'生活数学',
                        evaluation:'认识新班级，知道名字',
                        table:[{
                            week:'1',
                            teachingTheme:'学校生活——期初评估',
                            teachingAim:'复习10以内加减法，评估20以内加减法的接受情况'
                        },{
                            week:'2',
                            teachingTheme:'学校生活——我的新班级',
                            teachingAim:'20以内进位加法的笔算'
                        },{
                            week:'3',
                            teachingTheme:'学校生活——我的好朋友',
                            teachingAim:'20以内进位加法的笔算'
                        }]
                },{
                    subject:'生活语文',
                    evaluation:'不理解好朋友的意义，但是对“朋友”有一定的反应',
                    table:[{
                        week:'1',
                        teachingTheme:'学校生活1',
                        teachingAim:'111'
                    },{
                        week:'2',
                        teachingTheme:'学校生活2',
                        teachingAim:'222'
                    },{
                        week:'3',
                        teachingTheme:'学校生活3',
                        teachingAim:'333'
                    }]
                }],
            }
        },

        mounted(){
            this.readLReport();
        },

        methods:{
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
                this.$router.replace({path: '/learningReport'});
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
</style>
