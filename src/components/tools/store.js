import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  // 1. state
  state:{
    schooltables:[],          //学校指标
    stuNNS:[],                //生态评量页面学生信息列表
    stuinfo:[],               //单个学生完整信息
    course:[],                //课程信息
    stucourses:[],            //单个学生所选课程信息
    stucourseslist:[],        //课程评量页面列表信息
    iepmeeting:[],            //单个iep会议信息
    iepmeetinglist:[],        //iep会议列表信息
    groupSP:[],               //单个集体学科计划信息
    groupSPlist:[],           //集体学科计划列表信息
    trainingSP:[],            //单个个训科学计划信息
    trainingSPlist:[],        //个训学科计划列表信息
    teachingTheme:[],         //单个教学主题信息
    teachingThemeList:[],     //教学主题列表信息
    groupSI:[],               //单个集体学科教学信息
    groupSIlist:[],           //集体学科教学列表信息
    trainingSI:[],            //单个个训学科教学信息
    trainingSIlist:[],        //个训学科教学列表信息
    LReports:[],              //单个学习报表信息
    LReportslist:[],          //学习报表列表信息
  },

  // // 2. getters
  getters:{
    // 参数列表state指的是state数据
    getschooltables(state){
      return state.schooltables;
    },

    getstuNNS(state){
      return state.stuNNS;
    },

    getstuinfo(state) {
      return state.stuinfo;
    },

    getcourse(state) {
      return state.course;
    },

    getstucourses(state) {
      return state.stucourses;
    },

    getstucourseslist(state) {
      return state.stucourseslist;
    },

    getiepmeeting(state) {
      return state.iepmeeting;
    },

    getiepmeetinglist(state) {
      return state.iepmeetinglist;
    },

    getgroupSP(state) {
      return state.groupSP;
    },
    getgroupSPlist(state) {
      return state.groupSPlist;
    },

    gettrainingSP(state) {
      return state.trainingSP;
    },
    gettrainingSPlist(state) {
      return state.trainingSPlist;
    },

    getteachingTheme(state) {
      return state.teachingTheme;
    },
    getteachingThemeList(state) {
      return state.teachingThemeList;
    },

    getgroupSI(state) {
      return state.groupSI;
    },
    getgroupSIlist(state) {
      return state.groupSIlist;
    },

    gettrainingSI(state) {
      return state.trainingSI;
    },
    gettrainingSIlist(state) {
      return state.trainingSIlist;
    },

    getLReports(state) {
      return state.LReports;
    },
    getLReportslist(state) {
      return state.LReportslist;
    },
  },
  // 3. actions
  // 通常跟api接口打交道
  actions:{
    // 设置城市信息
    // 参数列表：{commit, state}
    // state指的是state数据
    // commit调用mutations的方法
    // name就是调用此方法时要传的参数
    setschooltables(ctx, name){
      // 跟后台打交道
      // 调用mutaions里面的方法
      ctx.commit("setschooltables", name);
    },

    setstuNNS(ctx, name){
      ctx.commit("setstuNNS",name);
    },

    setstuinfo(ctx, name) {
      ctx.commit("setstuinfo",name);
    },

    setcourse(ctx, name) {
      ctx.commit("setcourse",name);
    },

    setstucourses(ctx, name) {
      ctx.commit("setstucourses",name);
    },
    addstucourses(ctx, name) {
      ctx.commit("addstucourses",name);
    },

    setstucourseslist(ctx, name) {
      ctx.commit("setstucourseslist",name);
    },
    addstucourseslist(ctx, name) {
      ctx.commit("addstucourseslist",name);
    },

    setiepmeeting(ctx, name) {
      ctx.commit("setiepmeeting",name);
    },

    setiepmeetinglist(ctx, name) {
      ctx.commit("setiepmeetinglist",name);
    },

    setgroupSP(ctx, name) {
      ctx.commit("setgroupSP",name);
    },
    setgroupSPlist(ctx, name) {
      ctx.commit("setgroupSPlist",name);
    },

    setTrainingSP(ctx, name) {
      ctx.commit("setTrainingSP",name);
    },
    setTrainingSPlist(ctx, name) {
      ctx.commit("setTrainingSPlist",name);
    },

    setTeachingTheme(ctx, name) {
      ctx.commit("setTeachingTheme",name);
    },
    setTeachingThemeList(ctx, name) {
      ctx.commit("setTeachingThemeList",name);
    },

    setGroupSI(ctx, name) {
      ctx.commit("setGroupSI",name);
    },
    setGroupSIlist(ctx, name) {
      ctx.commit("setGroupSIlist",name);
    },

    setTrainingSI(ctx, name) {
      ctx.commit("setTrainingSI",name);
    },
    setTrainingSIlist(ctx, name) {
      ctx.commit("setTrainingSIlist",name);
    },

    setLReports(ctx, name) {
      ctx.commit("setLReports",name);
    },
    setLReportslist(ctx, name) {
      ctx.commit("setLReportslist",name);
    },
  },
  // 4. mutations
  mutations:{
    // state指的是state的数据
    // name传递过来的数据
    setschooltables(state, name){
      state.schooltables = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.schooltables.push(obj[key]);
      }
    },

    setstuNNS(state, name){
      state.stuNNS = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.stuNNS.push(obj[key]);
      }
      state.stuNNS.reverse();
    },

    setstuinfo(state, name) {
      state.stuinfo = [];
      const obj = JSON.parse(name);
      for(let key in obj) {
        state.stuinfo.push(obj[key]);
      }
    },

    setcourse(state, name) {
      state.course = [];
      const obj = JSON.parse(name);
      for(let key in obj) {
        state.course.push(obj[key]);
      }
    },

    setstucourses(state, name) {
      state.stucourses = [];
      const obj = JSON.parse(name);
      for(let key in obj) {
        state.stucourses.push(obj[key]);
      }
    },
    addstucourses(state, name) {
      state.stucourses.push(name);
    },

    setstucourseslist(state, name) {
      state.stucourseslist = [];
      const obj = JSON.parse(name);
      for(let key in obj) {
        state.stucourseslist.push(obj[key]);
      }
    },
    addstucourseslist(state, name) {
      state.stucourseslist.push(name);
    },

    setiepmeeting(state, name){
      state.iepmeeting = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.iepmeeting.push(obj[key]);
      }
    },
    setiepmeetinglist(state, name){
      state.iepmeetinglist = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.iepmeetinglist.push(obj[key]);
      }
      state.iepmeetinglist.reverse();
    },


    setgroupSP(state, name){
      state.groupSP = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.groupSP.push(obj[key]);
      }
    },
    setgroupSPlist(state, name){
      state.groupSPlist = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.groupSPlist.push(obj[key]);
      }
      state.groupSPlist.reverse();
    },

    setTrainingSP(state, name){
      state.trainingSP = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.trainingSP.push(obj[key]);
      }
    },
    setTrainingSPlist(state, name){
      state.trainingSPlist = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.trainingSPlist.push(obj[key]);
      }
      state.trainingSPlist.reverse();
    },

    setTeachingTheme(state, name){
      state.teachingTheme = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.teachingTheme.push(obj[key]);
      }
    },
    setTeachingThemeList(state, name){
      state.teachingThemeList = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.teachingThemeList.push(obj[key]);
      }
      state.teachingThemeList.reverse();
    },


    setGroupSI(state, name){
      state.groupSI = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.groupSI.push(obj[key]);
      }
    },
    setGroupSIlist(state, name){
      state.groupSIlist = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.groupSIlist.push(obj[key]);
      }
      state.groupSIlist.reverse();
    },


    setTrainingSI(state, name){
      state.trainingSI = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.trainingSI.push(obj[key]);
      }
    },
    setTrainingSIlist(state, name){
      state.trainingSIlist = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.trainingSIlist.push(obj[key]);
      }
      state.trainingSIlist.reverse();
    },

    setLReports(state, name){
      state.LReports = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.LReports.push(obj[key]);
      }
    },
    setLReportslist(state, name){
      state.LReportslist = [];
      const obj = JSON.parse(name);
      for (let key in obj) {
        state.LReportslist.push(obj[key]);
      }
      state.LReportslist.reverse();
    },

  }
});

export default store;
