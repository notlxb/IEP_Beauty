<template>
  <section>
    <el-container>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/indSubjectTea'}">个训学科教学</el-breadcrumb-item>
        <el-breadcrumb-item>查看|编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </el-container>
    <el-divider></el-divider>
    <el-container>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
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
          <el-form-item label="学科">
            <el-select v-model="subject" placeholder="请选择" :disabled="disabled">
              <el-option
                  v-for="item in subject_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!--        <el-form-item label="任教老师">-->
          <!--          <el-input align="left" :disabled="disabled" v-model="teacher"></el-input>-->
          <!--        </el-form-item>-->
          <el-form-item label="任教老师">
            <el-select v-model="teacher" placeholder="请选择" :disabled="disabled">
              <el-option
                  v-for="item in teacher_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="制定日期">
            <el-date-picker align="left" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="disabled" v-model="createDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="周次">
            <el-select v-model="week" placeholder="请选择" :disabled="disabled">
              <el-option
                  v-for="item in week_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="节次">
            <el-input align="left"  :disabled="disabled" v-model="section"></el-input>
          </el-form-item>
          <el-form-item label="课题">
            <el-input align="left"  :disabled="disabled" v-model="topic"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-container>
    <el-divider></el-divider>

    <vue-ckeditor type="classic"  v-model="content" :editors="editors1"
                  :config='config' :readonly="tmdisabled"></vue-ckeditor>

    <el-divider></el-divider>
    <el-form :inline="true" align="center">
      <el-form-item>
        <el-button type="danger" @click.native="gx_submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'
    export default {
        name: "gexunxuekejiaoxue_edit",
        components:{'vue-ckeditor': VueCkeditor.component},
        data(){
            let that = this;
            return{
                schoolYear:'',
                term:'',
                tclass:'',
                stuName:'',
                subject:'',
                teacher:'',
                createDate:'',
                week:'',
                section:'',
                topic:'',
                content:'<h1>点击以编辑内容</h1>',

                term_options: [{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options: [{value: '2017-2018', label: '2017-2018'},
                    {value: '2018-2019', label: '2018-2019'},
                    {value: '2019-2020', label: '2019-2020'},
                    {value: '2020-2021', label: '2020-2021'}],
                week_options: [{value: '第1周' , label: '第1周' },{value: '第2周', label: '第2周'},{value: '第3周', label: '第3周'},{value: '第4周', label: '第4周'},{value: '第5周', label: '第5周'},
                    {value: '第6周' , label: '第6周' },{value: '第7周', label: '第7周'},{value: '第8周', label: '第8周'},{value: '第9周', label: '第9周'},{value: '第10周', label: '第10周'},
                    {value: '第11周', label: '第11周'},{value: '第12周', label: '第12周'},{value: '第13周', label: '第13周'},{value: '第14周', label: '第14周'},{value: '第15周', label: '第15周'},
                    {value: '第16周', label: '第16周'},{value: '第17周', label: '第17周'},{value: '第18周', label: '第18周'},{value: '第19周', label: '第19周'},{value: '第20周', label: '第20周'},
                    {value: '第21周', label: '第21周'}],
                class_options:[],
                teacher_options:[],
                stuOptions:[],
                subject_options:[],

                disabled:true,
                tmdisabled:false,



                editors1: {
                  classic: ClassicEditor,
                },
                config:{
                  language:'zh-cn',
                  ckfinder: {
                    uploadUrl: '/api/stu/picture_GeXunJX'
                  },
                },
            }
        },
        mounted(){
            if(this.$route.query.isEdit == 1) {
                this.disabled = false;
                this.tmdisabled = false;
                this.readTrainingSI();
            }else if(this.$route.query.isEdit == 2) {
                this.disabled = true;
                this.tmdisabled = true;
                this.readTrainingSI();
            } else {
                this.disabled = false;
                this.tmdisabled = false;
                this.createDate = this.getDate();
                this.$http.post('/api/stu/queSchoolTeachers', {
                    school:"苏州工业园区仁爱学校"
                },{}).then((response) => {
                    console.log(response);
                    for (var i = 0; i < response.body.length; i++) {
                        this.teacher_options.push({value:response.body[i].userName, label:response.body[i].userName, id:response.body[i].id});
                    }
                });
                this.querySubject();
                this.queryClasstable();
            }
        },
        methods:{

            readTrainingSI(){
                this.schoolYear = this.$store.state.trainingSI[0].schoolYear;
                this.term = this.$store.state.trainingSI[0].term;
                this.tclass = this.$store.state.trainingSI[0].class;
                this.stuName = this.$store.state.trainingSI[0].stuName;
                this.subject = this.$store.state.trainingSI[0].subject;
                this.teacher = this.$store.state.trainingSI[0].teacher;
                this.createDate = this.$store.state.trainingSI[0].createDate;
                this.week = this.$store.state.trainingSI[0].week;
                this.section = this.$store.state.trainingSI[0].section;
                this.topic = this.$store.state.trainingSI[0].topic;
                this.content = JSON.parse(this.$store.state.trainingSI[0].content).content;
                this.$http.post('/api/stu/queSchoolTeachers', {
                    school:"苏州工业园区仁爱学校"
                },{}).then((response) => {
                    console.log(response);
                    for (var i = 0; i < response.body.length; i++) {
                        this.teacher_options.push({value:response.body[i].userName, label:response.body[i].userName, id:response.body[i].id});
                    }
                });
                this.querySubject();
                this.queryClasstable();
            },

            queryClass(){
                this.stuOptions = [];
                this.$http.post('/api/stu/queryClass', {
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

            queryClasstable(){
                this.class_options = [];
                this.$http.post('/api/stu/queClasstable', {
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

            querySubject(){
                this.subject_options = [];
                this.$http.post('/api/stu/queSubject', {}, {}).then((response) => {
                    for (var i = 0; i < response.body.length; i++){
                        var opt = {};
                        opt.value = response.body[i].subjectName;
                        opt.label = response.body[i].subjectName;
                        this.subject_options.push(opt);
                    }
                })
            },

            gx_submit(){
                var c = {content:this.content};
                if(this.$route.query.isEdit == 1) {
                    this.$http.post('/api/stu/upTrainingSbjIns',{
                        schoolYear:this.schoolYear,
                        term:this.term,
                        class:this.tclass,
                        stuName:this.stuName,
                        subject:this.subject,
                        teacher:this.teacher,
                        createDate:this.createDate,
                        week:this.week,
                        section:this.section,
                        topic:this.topic,
                        content:c,
                        id:this.$store.state.trainingSI[0].id,
                    },{}).then((response)=>{
                        console.log(response);
                    })
                    console.log('success!');
                    this.$router.replace({path:'/indSubject'});
                }else {
                    this.$http.post('/api/stu/addTrainingSbjIns',{
                        schoolYear:this.schoolYear,
                        term:this.term,
                        class:this.tclass,
                        stuName:this.stuName,
                        subject:this.subject,
                        teacher:this.teacher,
                        createDate:this.createDate,
                        week:this.week,
                        section:this.section,
                        topic:this.topic,
                        content:c,
                    },{}).then((response)=>{
                        console.log(response);
                    });
                    console.log('success!');
                    this.$router.replace({path:'/indSubject'});
                }
            },



            getDate() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
            getUEContent(){
                let msr = this.$refs.ue.getUEContent();
                console.log(msg)
            }

        },
    }
</script>

<style scoped>
  table.hovertable {
    font-family: verdana,arial,sans-serif;
    font-size:17px;
    color:#333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
  }
  table.hovertable th {
    background-color:#c3dde0;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #a9c6c9;
  }
  table.hovertable tr {
    background-color:#d4e3e5;
  }
  table.hovertable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #a9c6c9;
  }
  .components-container{
    clear: both;

  }
  .editor-container{
    clear: both;

  }
</style>
