import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
//import Table from './views/nav1/Table.vue'
//import Form from './views/nav2/Form.vue'
//import user from './views/nav2/user.vue'
//import Page4 from './views/nav3/Page4.vue' // for vuex test
import Page6 from './views/nav1/test/Page6.vue'
import echarts from './views/charts/echarts.vue'
//二次开发
import data from './views/nav1/data.vue'
import studentManagement from './views/nav1/studentManagement.vue'
import classManagement from './views/nav1/classManagement.vue'
import schoolTables from './views/nav2/schoolTables/schoolTables.vue'
import showSchoolTables from './views/nav2/schoolTables/showSchoolTables.vue'
import createSchoolTables from './views/nav2/schoolTables/createSchoolTables.vue'
import editSchoolTables from './views/nav2/schoolTables/editSchoolTables.vue'
import courseEdit from './views/nav2/courses/courseEdit.vue'
import schoolManagement from './views/nav4/schoolManagement.vue'
import userManagement from './views/nav4/userManagement.vue'
import dataManagement from './views/nav4/dataManagement.vue'
import subjectManagement from './views/nav4/subjectManagement.vue'
import courseEvaluation from './views/nav2/courses/courseEvaluation.vue'
import iepMeeting from './views/nav2/IEP/iep_meeting.vue'
import iepMeetingEdit from './views/nav2/IEP/iepmeeting_edit.vue'
import iepMeetingCreate from './views/nav2/IEP/iepmeeting_create.vue'
import newContact from './views/nav1/ecoAssessment/newContact.vue'
import devTarget from './views/nav1/ecoAssessment/developTarget.vue'
import funcTarget from './views/nav1/ecoAssessment/functionTarget.vue'
import growTarget from './views/nav1/ecoAssessment/growTarget.vue'
import createAssess from './views/nav1/ecoAssessment/Create.vue'
import CheckNEdit from './views/nav1/ecoAssessment/CheckNEdit.vue';
import teaTheme from './views/nav3/longShortGoal/teaTheme.vue'
import teaThemeEdit from './views/nav3/longShortGoal/teaThemeEdit.vue'
import indSubjectTea from './views/nav3/individualSubjectTea.vue'
import indSubjectTeaEdit from './views/nav3/individualSubjectTeaEdit.vue'
import indSubject from './views/nav3/individualSubject.vue'
import indSubjectEdit from './views/nav3/individualSubjectEdit.vue'
import groupSubject from './views/nav3/groupSubject.vue'
import groupSubjectEdit from './views/nav3/groupSubjectEdit.vue'
import groupSubjectTea from './views/nav3/groupSubjectTea.vue'
import groupSubjectTeaEdit from './views/nav3/groupSubjectTeaEdit.vue'
import studyReport from './views/nav3/studyReport/studyReport.vue'
import studyReportEdit from './views/nav3/studyReport/studyReportEdit.vue'
import learningReport from './views/nav3/learningReport.vue'
import learningReportEdit from './views/nav3/learningReportEdit.vue'
import research from './views/nav1/research.vue'
import analysis from './views/nav1/analysis.vue'



let routes = [
    {
        path: '/login',
        component: Login,
        name: '登录',
        authority: [1, 1, 1, 1, 1],
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '404',
        authority: [1, 1, 1, 1, 1],
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '多元评估',
        iconCls: 'fa fa-list-alt',//图标样式class
        authority: [1, 1, 1, 1, 1],
        children: [
            {path: '/main', component: Main, name: '主页', authority: [1, 1, 1, 1, 1], hidden: true},
            {path: '/data', component: data, name: '指标选择', authority: [1, 1, 1, 1, 1],},
            /*{path: '/table', component: Table, name: '生态评量', authority: [1, 1, 1, 1, 1], hidden: true},*/
            {path: '/page6', component: Page6, name: '指标选择test', authority: [1, 1, 1, 1, 1], hidden: true},
            {path: '/studentManagement', component: studentManagement, authority: [1, 1, 1, 1, 1], name: '学生管理'},
            {path: '/classManagement', component: classManagement, authority: [1, 1, 1, 1, 1], name: '班级管理'},
            {path: '/newContact', component: newContact, name: '生态评量', authority: [1, 1, 1, 1, 1]},
            {path: '/checkNEdit', component: CheckNEdit, name: '查询/编辑', authority: [1, 1, 1, 1, 1], hidden: true},
            {
                path: '/checkNEdit/devTarget',
                component: devTarget,
                name: '发展性指标',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/funcTarget',
                component: funcTarget,
                name: '功能性指标',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/checkNEdit/growTarget',
                component: growTarget,
                name: '成长性指标',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {path: '/createAssess', component: createAssess, name: '创建学生', authority: [1, 1, 1, 1, 1], hidden: true},
            {path: '/research', component: research, name: '问卷填写', authority: [1, 1, 1, 1, 1]},
            {path: '/analysis', component: analysis, name: '问卷分析', authority: [1, 1, 1, 1, 1]},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '课程管理',
        iconCls: 'fa fa-list-alt',
        authority: [1, 1, 1, 1, 1],
        children: [
            {
                path: '/schoolTables',
                component: schoolTables,
                name: '课程表主页',
                authority: [1, 1, 1, 1, 1],
            },
            {
                path: '/showSchoolTables',
                component: showSchoolTables,
                name: '展示课程表',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/createSchoolTables',
                component: createSchoolTables,
                name: '创建课程表',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/editSchoolTables',
                component: editSchoolTables,
                name: '修改课程表',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/courseEdit',
                component: courseEdit,
                name: '课程设置',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/courseEvaluation',
                component: courseEvaluation,
                name: '课程评量',
                authority: [1, 1, 1, 1, 1],
            },
            {
                path: '/iepMeeting',
                component: iepMeeting,
                name: 'IEP会议',
                authority: [1, 1, 1, 1, 1],
            },
            {
                path: '/iepMeetingEdit',
                component: iepMeetingEdit,
                name: 'IEP编辑',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
            {
                path: '/iepMeetingCreate',
                component: iepMeetingCreate,
                name: 'IEP新建',
                authority: [1, 1, 1, 1, 1],
                hidden: true
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '教学实施',
        iconCls: 'fa fa-list-alt',
        // leaf: true,//只有一个节点
        authority: [1, 1, 1, 1, 1],
        children: [
            /*{
                path: '/page4', component: Page4, name: '页面4',
                goon: true,
                authority: [1, 1, 1, 1, 1],
                hidden: true,
                children: [
                    //{path: '/form', component: Form, name: 'Form'},
                    //{path: '/user', component: user, name: '列表'},
                ],
            },*/
            {path: '/teaTheme', component: teaTheme, name: '教学主题', authority: [1, 1, 1, 1, 1]},
            {path: '/teaThemeEdit', component: teaThemeEdit, name: '教学主题编辑', authority: [1, 1, 1, 1, 1], hidden:true},
            {path:'/teachingPlan', name:'教学计划', goon:true, authority: [1, 1, 1, 1, 1], children: [],},
            {path: '/indSubject', component: indSubject, name: '个训学科计划', authority: [1, 1, 1, 1, 1]},
            {path: '/indSubjectTea', component: indSubjectTea, name: '个训学科教学', authority: [1, 1, 1, 1, 1]},
            {path: '/indSubjectTeaEdit', component: indSubjectTeaEdit, name: '个训学科教学编辑', authority: [1, 1, 1, 1, 1], hidden:true},
            {path: '/groupSubjectTea', component: groupSubjectTea, name: '集体学科教学', authority: [1, 1, 1, 1, 1]},
            {path: '/groupSubjectTeaEdit', component: groupSubjectTeaEdit, name: '集体学科教学编辑', authority: [1, 1, 1, 1, 1], hidden:true},
            {path: '/indSubjectEdit', component: indSubjectEdit, name: '个训学科计划编辑', authority: [1, 1, 1, 1, 1], hidden:true},
            {path: '/groupSubject', component: groupSubject, name: '集体学科计划', authority: [1, 1, 1, 1, 1]},
            {path: '/groupSubjectEdit', component: groupSubjectEdit, name: '集体学科计划编辑', authority: [1, 1, 1, 1, 1], hidden:true},
            {path: '/learningReport', component: learningReport, name: '学习报表', authority: [1, 1, 1, 1, 1]},
            {path: '/learningReportEdit', component: learningReportEdit, name: '学习报表编辑', authority: [1, 1, 1, 1, 1], hidden:true},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        authority: [1, 1, 1, 1, 0],
        iconCls: 'fa fa-bar-chart',
        children: [
            {path: '/echarts', component: echarts, name: '图标', authority: [1, 1, 1, 1, 1], hidden: true},
            {path: '/schoolManagement', component: schoolManagement, name: '学校管理', authority: [1, 1, 1, 1, 0],},
            {path: '/userManagement', component: userManagement, name: '用户管理', authority: [1, 1, 1, 1, 0],},
            {path: '/dataManagement', component: dataManagement, name: '指标管理', authority: [1, 1, 1, 1, 0],},
            {path: '/subjectManagement', component: subjectManagement, name: '课标管理', authority: [1, 1, 1, 1, 0],},

        ]
    },
    {
        path: '*',
        authority: [1, 1, 1, 1, 1],
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;
