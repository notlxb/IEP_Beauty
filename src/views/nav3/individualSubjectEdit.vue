<template>
  <section>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/indSubject' }">个训学科计划</el-breadcrumb-item>
      <el-breadcrumb-item>查看|编辑</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
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
          <el-select v-model="tclass" placeholder="请选择" :disabled="disabled"  @change="queryClass()">
            <el-option
                v-for="item in class_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生">
          <el-select v-model="stuName" placeholder="请选择学生">
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
        <el-form-item label="任教老师">
          <el-select v-model="teacher" placeholder="请选择">
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
        <el-form-item label="更新日期">
          <el-date-picker align="left" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="disabled" v-model="updateDate"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-col>
    <div>
      <el-button  type="danger"  @click="push1()" >教学计划</el-button>
      <el-button  type="danger"  @click="push2()" >教学进度</el-button>
    </div>
    <el-divider></el-divider>
    <table v-if="this.judge"  class="hovertable" width="100%" border="1"  cellpadding="0" cellspacing="0" >
      <thead >
      <tr >
        <th style="width: 5%;">项目</th>
        <th style="width: 70%;">内容</th>
        <th style="width: 25%;">备注</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <span class="character-in-table">教材</span><span class="character-in-table">分析</span>
        </td>
        <td>
          <el-input :disabled="disabled" type="textarea" :autosize="{ minRows: 5}" v-model="jcfx"></el-input>
        </td>
        <td>
          <el-input :disabled="disabled" type="textarea" :autosize="{ minRows: 5}" v-model="jcfx_bz"></el-input>
        </td>
      </tr>
      </tbody>
      <tbody>
      <tr>
        <td>
          <span class="character3-in-table">学生情</span><span class="character3-in-table">况分析</span>
        </td>
        <td>
          <el-input :disabled="disabled" type="textarea" :autosize="{ minRows: 5}" v-model="xsqkfx"></el-input>
        </td>
        <td>
          <el-input :disabled="disabled" type="textarea" :autosize="{ minRows: 5}" v-model="xsqkfx_bz"></el-input>
        </td>
      </tr>
      </tbody>
      <tbody>
      <tr>
        <td>
          <span class="character-in-table">教学</span><span class="character-in-table">目标</span>
          <el-button :disabled="disabled" type="text" size="small" @click="dialogFormVisible = true">添加目标</el-button>
        </td>
        <td>
          <el-table
              :data="tableData"
              :stripe="true"
              border
              style="width: 100%;"
              max-height="400">
            <el-table-column
                align='center'
                fixed
                prop="ss"
                label="课标"
                width="100">
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
                    v-model="tableData[s.$index].des">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
              <template slot-scope="scope">
                <el-button
                    :disabled="disabled"
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </td>
        <td>
          <el-input :disabled="disabled" type="textarea" :autosize="{ minRows: 5}" v-model="jxmb_bz"></el-input>
          <el-dialog title="目标概况" :visible.sync="dialogFormVisible" @close="dialogCancel()">
            <el-form>
              <el-form-item label="课标" :label-width="formLabelWidth">
                <el-cascader :props="props" :showAllLevels="false" :clearable="true" placeholder="请选择课标" style="width:400px" v-model="jxmb_opts"></el-cascader>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogCancel()">取 消</el-button>
              <el-button type="danger" @click="dialogConfirm()">确 定</el-button>
            </div>
          </el-dialog>
        </td>
      </tr>
      </tbody>
      <tbody>
      <tr>
        <td>
          <span class="character3-in-table">教学重</span><span class="character-in-table">难点</span>
        </td>
        <td>
          <el-input :disabled="disabled" type="textarea" :autosize="{ minRows: 5}" v-model="jxznd"></el-input>
        </td>
        <td>
          <el-input :disabled="disabled" type="textarea" :autosize="{ minRows: 5}" v-model="jxznd_bz"></el-input>
        </td>
      </tr>
      </tbody>
      <tbody>
      <tr>
        <td>
          <span class="character-in-table">主要</span><span class="character-in-table">措施</span>
        </td>
        <td>
          <el-input :disabled="disabled" type="textarea" :autosize="{ minRows: 5}" v-model="zycs"></el-input>
        </td>
        <td>
          <el-input :disabled="disabled" type="textarea" :autosize="{ minRows: 5}" v-model="zycs_bz"></el-input>
        </td>
      </tr>
      </tbody>
    </table>

    <!--    <vue-ckeditor v-if="this.judge1" type="classic"  v-model="teachingProgress" :editors="editors1"-->
    <!--                  :config='config' :readonly="disabled"></vue-ckeditor>-->
    <tinymce-editor v-if="this.judge1"
                    ref="editor"
                    v-model="teachingProgress"
                    :disabled="disabled">
    </tinymce-editor>
    <el-divider></el-divider>
    <el-form :inline="true" align="center">
      <el-form-item>
        <el-button type="danger" @click="trainingSP_submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
    import TinymceEditor from '@/components/tools/tinymce/tinymce-editor'

    export default {
        name: "jitxuekejihua_edit",
        components:{'vue-ckeditor': VueCkeditor.component, TinymceEditor},
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
                updateDate:'',

                jcfx:'',   jcfx_bz:'',
                xsqkfx:'', xsqkfx_bz:'',
                jxmb_opts:[], jxmb_bz:'',
                jxznd:'',  jxznd_bz:'',
                zycs:'',   zycs_bz:'',

                teachingProgress:'',


                term_options: [{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options: [{value: '2017-2018', label: '2017-2018'},
                    {value: '2018-2019', label: '2018-2019'},
                    {value: '2019-2020', label: '2019-2020'},
                    {value: '2020-2021', label: '2020-2021'}],
                class_options:[],
                stuOptions:[],
                teacher_options:[],
                subject_options:[],

                tableData:[],
                dialogFormVisible:false,
                formLabelWidth: '120px',
                props:{
                    multiple: true,
                    lazy: true,
                    async lazyLoad (node, resolve) {
                        var length;
                        var node_info;
                        var show_type  = node.level;
                        console.log(show_type)
                        if (show_type == 0){
                            await that.$http.post('http://47.110.134.247/api/stu/queSS_ST', {
                                show_type:0,
                                producerID:1
                            }, {}).then((response) => {
                                length = response.body.length;
                                node_info = response.body;
                            })
                        }else {
                            await that.$http.post('http://47.110.134.247/api/stu/queSS', {
                                show_type:show_type,
                                father:node.data.id,
                                producerID:1
                            }, {}).then((response) => {
                                length = response.body.length;
                                node_info = response.body;
                            })
                        }
                        setTimeout(() => {
                            var id = 0;
                            console.log(node_info)
                            const nodes = Array.from({ length: length })
                                .map(item => ({
                                    id:node_info[id].id,
                                    value: node_info[id].label,
                                    label: node_info[id++].label,
                                    leaf: show_type >= 4
                                }));
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(nodes);
                        }, 1000);
                    }
                },



                judge:1,
                judge1:0,
                disabled:true,

                editors1: {
                    classic: ClassicEditor,
                },
                config:{
                    language:'zh-cn',
                    ckfinder: {
                        uploadUrl: 'http://47.110.134.247/api/stu/picture_GeXunJH'
                    },
                },
            }
        },
        mounted(){
            if(this.$route.query.isEdit == 1) {
                this.disabled = false;
                this.readTrainingSPinfo();
            }else if (this.$route.query.isEdit == 2){
                this.disabled = true;
                this.readTrainingSPinfo();
            }else {
                this.disabled = false;
                this.createDate = this.getDate();
                this.updateDate = this.getDate();
                this.$http.post('http://47.110.134.247/api/stu/queSchoolTeachers', {
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
            readTrainingSPinfo(){
                this.schoolYear=this.$store.state.trainingSP[0].schoolYear;
                this.term=this.$store.state.trainingSP[0].term;
                this.tclass=this.$store.state.trainingSP[0].class;
                this.stuName=this.$store.state.trainingSP[0].stuName;
                this.subject=this.$store.state.trainingSP[0].subject;
                this.teacher=this.$store.state.trainingSP[0].teacher;
                this.createDate=this.$store.state.trainingSP[0].createDate;
                this.updateDate=this.getDate();

                this.jcfx = JSON.parse(this.$store.state.trainingSP[0].teachingPlan).jcfx.content;
                this.xsqkfx = JSON.parse(this.$store.state.trainingSP[0].teachingPlan).xsqkfx.content;
                this.tableData = JSON.parse(JSON.parse(this.$store.state.trainingSP[0].teachingPlan).jxmb.content);
                this.jxznd = JSON.parse(this.$store.state.trainingSP[0].teachingPlan).jxznd.content;
                this.zycs = JSON.parse(this.$store.state.trainingSP[0].teachingPlan).zycs.content;

                this.jcfx_bz = JSON.parse(this.$store.state.trainingSP[0].teachingPlan).jcfx.remark;
                this.xsqkfx_bz = JSON.parse(this.$store.state.trainingSP[0].teachingPlan).xsqkfx.remark;
                this.jxznd_bz = JSON.parse(this.$store.state.trainingSP[0].teachingPlan).jxznd.remark;
                this.zycs_bz = JSON.parse(this.$store.state.trainingSP[0].teachingPlan).zycs.remark;
                this.jxmb_bz = JSON.parse(this.$store.state.trainingSP[0].teachingPlan).jxmb.remark;


                this.teachingProgress = JSON.parse(this.$store.state.trainingSP[0].teachingProgress).content;

                this.$http.post('http://47.110.134.247/api/stu/queSchoolTeachers', {
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

            querySubject(){
                this.subject_options = [];
                this.$http.post('http://47.110.134.247/api/stu/queSubject', {}, {}).then((response) => {
                    for (var i = 0; i < response.body.length; i++){
                        var opt = {};
                        opt.value = response.body[i].subjectName;
                        opt.label = response.body[i].subjectName;
                        this.subject_options.push(opt);
                    }
                })
            },

            trainingSP_submit(){
                var teachingPlan = {
                    jcfx:{content:this.jcfx, remark:this.jcfx_bz}, xsqkfx:{content:this.xsqkfx, remark:this.xsqkfx_bz},
                    jxmb:{content:JSON.stringify(this.tableData), remark:this.jxmb_bz}, jxznd:{content:this.jxznd, remark:this.jxznd_bz}, zycs:{content:this.zycs, remark:this.zycs_bz}
                };
                var teachingProgress = {
                    content:this.teachingProgress
                };
                if(this.$route.query.isEdit == 0) {
                    this.$http.post('http://47.110.134.247/api/stu/addTrainingSbjPl', {
                        schoolYear: this.schoolYear,
                        term: this.term,
                        class: this.tclass,
                        stuName:this.stuName,
                        subject: this.subject,
                        teacher: this.teacher,
                        createDate: this.createDate,
                        updateDate: this.updateDate,
                        teachingPlan: teachingPlan,
                        teachingProgress: teachingProgress,
                    }, {}).then((response) => {
                        console.log(response);
                        this.$router.replace({path: '/indSubject'});
                    });
                }else {
                    this.$http.post('http://47.110.134.247/api/stu/upTrainingSbjPl', {
                        schoolYear: this.schoolYear,
                        term: this.term,
                        class: this.tclass,
                        stuName:this.stuName,
                        subject: this.subject,
                        teacher: this.teacher,
                        createDate: this.createDate,
                        updateDate: this.updateDate,
                        teachingPlan: teachingPlan,
                        teachingProgress: teachingProgress,
                        id: this.$store.state.trainingSP[0].id,
                    }, {}).then((response) => {
                        console.log(response);
                        this.$router.replace({path: '/indSubject'});
                    })
                }
            },

            push1(){
                this.judge = 1;
                this.judge1=0;
            },
            push2(){
                this.judge1=1;
                this.judge=0;
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

            deleteRow(index, rows) {
                rows.splice(index, 1);
            },

            dialogCancel(){
                this.dialogFormVisible = false;
                this.jxmb_opts = [];
            },
            dialogConfirm(){
                for (var i = 0; i < this.jxmb_opts.length; i++){
                    this.tableData.push({ss:this.jxmb_opts[i][4], des:''});
                }
                this.dialogFormVisible = false;
                this.jxmb_opts = [];
            },
        }
    }
</script>

<style scoped>
  table.hovertable {
    font-family: verdana,arial,sans-serif;
    font-size:15px;
    color:#333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
  }
  table.hovertable th {
    /*background-color:#c3dde0;*//*表头填充色*/
    border-width: 3px;
    padding: 8px;
    border-style: solid;
    border-color: #e7e9ee;/*表头边框线颜色*/
  }
  table.hovertable tr {
    /*background-color:#d4e3e5;*//*表格填充色*/
  }
  table.hovertable td {
    border-width: 3px;
    padding: 8px;
    border-style: solid;
    border-color: #e7e9ee;
  }

  .character-in-table{
    margin-left: 20%
  }
  .character3-in-table{
    margin-left: 6%
  }


</style>
