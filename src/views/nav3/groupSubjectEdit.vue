<template>
  <section>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/groupSubject', query:{currentPage:this.$route.query.currentPage} }">集体学科计划</el-breadcrumb-item>
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
          <el-select v-model="tclass" placeholder="请选择" :disabled="disabled">
            <el-option
                v-for="item in class_options"
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
        <el-form-item label="更新日期">
          <el-date-picker align="left" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="disabled" v-model="updateDate"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-col>
    <div>
      <el-button  type="danger"  @click="push1()" >教学计划</el-button>
      <el-button  type="danger"  @click="push2()" >教学进度</el-button>
    </div>
    <!--        <el-form-item>-->
    <!--          <el-button   type="danger" icon="el-icon-printer"  >打印</el-button>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item>-->
    <!--          <el-button   type="danger" icon="el-icon-bottom"  >下载</el-button>-->
    <!--        </el-form-item>-->


    <el-divider></el-divider>
    <!--<el-table :data=this.teach_pla align="left"  v-if="this.judge" stripe>
          <el-table-column prop="project" label="项目"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
    <el-table :data=this.teach_pro align="left"  v-if="this.judge1" stripe>
      <el-table-column prop="week_times" label="周次"></el-table-column>
      <el-table-column prop="tea_cont" label="教学内容"></el-table-column>
      <el-table-column prop="remark2" label="备注"></el-table-column>
    </el-table>-->
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
          <el-button :disabled="disabled" type="text" @click="addTT()">
            <span>添加</span><span>目标</span>
          </el-button>
        </td>
        <td>
            <el-table
                :data="tableData"
                :stripe="true"
                style="width: 99%"
                max-height="400">
              <el-table-column type="expand">
                <template slot-scope="props"r>
                  <el-table
                      border
                      :data="props.row.table"
                      style="width: 100%">
                    <br/>
                    <br/>
                    <el-table-column
                        align='center'
                        prop="ss"
                        label="课标"
                        min-width="50%">
                    </el-table-column>
                    <el-table-column
                        prop="des"
                        label="描述"
                        v-if="false"
                        min-width="0%">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        label="描述"
                        min-width="30%">
                      <template slot-scope="s">
                        <el-input
                            :disabled="disabled"
                            type="textarea"
                            v-model="props.row.table[s.$index].des">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        min-width="10%">
                      <template slot-scope="sc">
                        <el-button
                            :disabled="disabled"
                            @click.native.prevent="deleteRow(sc.$index, props.row.table)"
                            type="text"
                            size="small">
                          <span style="color: #F56C6C;">移除</span>
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                  align='center'
                  prop="group"
                  label="组别"
                  min-width="20%">
              </el-table-column>
              <el-table-column
                  align='center'
                  prop="students"
                  label="学生"
                  min-width="60%">
              </el-table-column>
              <el-table-column
                  label="操作"
                  min-width="20%">
                <template slot-scope="scope">
                  <el-button
                      :disabled="disabled"
                      @click.native.prevent="editRow(scope)"
                      type="text"
                      size="small">
                    添加课标
                  </el-button>
                  <el-button
                          :disabled="disabled"
                          @click.native.prevent="editStus(scope)"
                          type="text"
                          size="small">
                    编辑学生
                  </el-button>
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
            <el-form :model="form">
              <el-form-item label="组名" :label-width="formLabelWidth">
                <el-input v-model="form.group" placeholder="请输入组名" style="width:400px"></el-input>
              </el-form-item>
              <el-form-item label="学生" :label-width="formLabelWidth">
                <el-select v-model="form.students" multiple clearable placeholder="请选择学生" style="width:400px">
                  <el-option
                      v-for="item in form.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="课标" :label-width="formLabelWidth">
                <el-cascader :props="props" :showAllLevels="false" :clearable="true" placeholder="请选择课标" style="width:400px" v-model="form.SS"></el-cascader>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogCancel()">取 消</el-button>
              <el-button type="danger" @click="dialogConfirm()">确 定</el-button>
            </div>
          </el-dialog>

          <el-dialog title="添加课标" :visible.sync="fddialogFormVisible" @close="fddialogCancel()">
            <el-form :model="form_add">
              <el-form-item label="课标" :label-width="formLabelWidth">
                <el-cascader :props="props" :showAllLevels="false" :clearable="true" placeholder="请选择课标" style="width:400px" v-model="form_add.fdSS"></el-cascader>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="fddialogCancel()">取 消</el-button>
              <el-button type="danger" @click="fddialogConfirm()">确 定</el-button>
            </div>
          </el-dialog>

          <el-dialog title="编辑学生" :visible.sync="stdialogFormVisible" @close="stdialogCancel()">
            <el-form :model="form">
              <el-form-item label="学生" :label-width="formLabelWidth">
                <el-select v-model="form.students" multiple clearable placeholder="请选择学生" style="width:400px">
                  <el-option
                          v-for="item in form.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="stdialogCancel()">取 消</el-button>
              <el-button type="danger" @click="stdialogConfirm()">确 定</el-button>
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

    <vue-ckeditor :readonly="disabled" v-if="this.judge1" type="classic"  v-model="teachingProgress" :editors="editors1"
                  :config='config'></vue-ckeditor>

    <el-divider></el-divider>
    <el-form :inline="true" align="center">
      <el-form-item>
        <el-button type="danger" @click="groupSP_submit()" :disabled="disabled">提交</el-button>
        <el-button type="danger" @click.native="go_back()">返回</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'

    export default {
        name: "jitxuekejihua_edit",
        components:{'vue-ckeditor': VueCkeditor.component},
        data(){
            let that = this;
            return{
                schoolYear:'',
                term:'',
                tclass:'',
                subject:'',
                teacher:'',
                createDate:'',
                updateDate:'',

                jcfx:'',   jcfx_bz:'',
                xsqkfx:'', xsqkfx_bz:'',
                jxznd:'',  jxznd_bz:'',
                zycs:'',   zycs_bz:'',
                jxmb_bz:'',

                teachingProgress:'<h1>点击以编辑内容</h1>',
                form:{
                    group: '',
                    students: [],
                    SS: [],

                    options: [],
                },
                form_add:{
                    fdSS:[],

                    row_index:'',
                },
                props:{
                    multiple: true,
                    lazy: true,
                    async lazyLoad (node, resolve) {
                        var length;
                        var node_info;
                        var show_type  = node.level;
                        console.log(show_type)
                        if (show_type == 0){
                            await that.$http.post('/api/stu/queSS_ST', {
                                show_type:0,
                                producerID:1
                            }, {}).then((response) => {
                                length = response.body.length;
                                node_info = response.body;
                            })
                        }else {
                            await that.$http.post('/api/stu/queSS', {
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
                formLabelWidth: '120px',
                caprops: { multiple: true },
                tableData:[],



                term_options: [{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options: [{value: '2017-2018', label: '2017-2018'},
                    {value: '2018-2019', label: '2018-2019'},
                    {value: '2019-2020', label: '2019-2020'},
                    {value: '2020-2021', label: '2020-2021'}],
                class_options:[],
                teacher_options:[],
                subject_options:[],


                judge:1,
                judge1:0,
                disabled:true,
                dialogFormVisible:false,
                fddialogFormVisible:false,
                stdialogFormVisible:false,


                editors1: {
                    classic: ClassicEditor,
                },
                config:{
                    language:'zh-cn',
                    ckfinder: {
                        uploadUrl: '/api/stu/picture_JiTiJH'
                    },
                },
            }
        },
        mounted(){
            console.log(this.$route.query)
            if(this.$route.query.isEdit == 1) {
                this.disabled = false;
                this.readGroupSPinfo();
            }else if (this.$route.query.isEdit == 2){
                this.disabled = true;
                this.readGroupSPinfo();
            }else {
                this.disabled = false;
                this.createDate = this.getDate();
                this.updateDate = this.getDate();
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
            readGroupSPinfo(){
                this.schoolYear=this.$store.state.groupSP[0].schoolYear;
                this.term=this.$store.state.groupSP[0].term;
                this.tclass=this.$store.state.groupSP[0].class;
                this.subject=this.$store.state.groupSP[0].subject;
                this.teacher=this.$store.state.groupSP[0].teacher;
                this.createDate=this.$store.state.groupSP[0].createDate;
                this.updateDate=this.getDate();


                this.jcfx = JSON.parse(this.$store.state.groupSP[0].teachingPlan).jcfx.content;
                this.xsqkfx = JSON.parse(this.$store.state.groupSP[0].teachingPlan).xsqkfx.content;
                this.tableData = JSON.parse(JSON.parse(this.$store.state.groupSP[0].teachingPlan).jxmb.content);
                this.jxznd = JSON.parse(this.$store.state.groupSP[0].teachingPlan).jxznd.content;
                this.zycs = JSON.parse(this.$store.state.groupSP[0].teachingPlan).zycs.content;

                this.jcfx_bz = JSON.parse(this.$store.state.groupSP[0].teachingPlan).jcfx.remark;
                this.xsqkfx_bz = JSON.parse(this.$store.state.groupSP[0].teachingPlan).xsqkfx.remark;
                this.jxznd_bz = JSON.parse(this.$store.state.groupSP[0].teachingPlan).jxznd.remark;
                this.zycs_bz = JSON.parse(this.$store.state.groupSP[0].teachingPlan).zycs.remark;
                this.jxmb_bz = JSON.parse(this.$store.state.groupSP[0].teachingPlan).jxmb.remark;


                this.teachingProgress = JSON.parse(this.$store.state.groupSP[0].teachingProgress).content;

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

            go_back(){
              this.$router.replace({path:'/groupSubject', query:{currentPage: this.$route.query.currentPage}});
            },

            groupSP_submit(){
                var teachingPlan = {
                    jcfx:{content:this.jcfx, remark:this.jcfx_bz}, xsqkfx:{content:this.xsqkfx, remark:this.xsqkfx_bz},
                    jxmb:{content:JSON.stringify(this.tableData), remark:this.jxmb_bz}, jxznd:{content:this.jxznd, remark:this.jxznd_bz}, zycs:{content:this.zycs, remark:this.zycs_bz}
                };
                var teachingProgress = {
                    content:this.teachingProgress
                };
                if(this.$route.query.isEdit == 0) {
                    this.$http.post('/api/stu/addGroupSbjPl', {
                        schoolYear: this.schoolYear,
                        term: this.term,
                        class: this.tclass,
                        subject: this.subject,
                        teacher: this.teacher,
                        createDate: this.createDate,
                        updateDate: this.updateDate,
                        teachingPlan: teachingPlan,
                        teachingProgress: teachingProgress,
                    }, {}).then((response) => {
                        console.log(response);
                        this.$router.replace({path: '/groupSubject', query:{currentPage: this.$route.query.currentPage}});
                    });
                }else {
                    this.$http.post('/api/stu/upGroupSbjPl', {
                        schoolYear: this.schoolYear,
                        term: this.term,
                        class: this.tclass,
                        subject: this.subject,
                        teacher: this.teacher,
                        createDate: this.createDate,
                        updateDate: this.updateDate,
                        teachingPlan: teachingPlan,
                        teachingProgress: teachingProgress,
                        id: this.$store.state.groupSP[0].id,
                    }, {}).then((response) => {
                        console.log(response);
                        this.$router.replace({path: '/groupSubject', query:{currentPage: this.$route.query.currentPage}});
                    })
                }
            },

            push1(){
                this.judge=1;
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




            deleteRow(index, rows) {
                rows.splice(index, 1);
            },

            async addTT(){
                await this.addTT1();
                if (arguments.length == 1)
                    this.editRow(arguments[0]);
                this.dialogFormVisible = true;
            },
            addTT1(){
                this.$http.post('/api/stu/queryClass', {
                    class_id: this.tclass,
                }, {}).then((response) => {
                    //console.log(response);
                    for (var i = 0; i < response.body.length; i++){
                        var opt = {};
                        opt.value = response.body[i].student_id + '_'+ response.body[i].name;
                        opt.label = opt.value;
                        this.form.options.push(opt);
                    }
                })
            },
            editRow(row){
                this.fddialogFormVisible = true;
                this.form_add.row_index = row.$index;
            },

            async editStus(row){
              await this.addTT1();
              this.form.students = row.row.students_info;
              this.stdialogFormVisible = true;
              this.form_add.row_index = row.$index;
            },

            dialogCancel(){
                this.dialogFormVisible = false;
                this.form.students = [];
                this.form.group = '';
                this.form.SS = [];
                this.form.options = [];
            },
            dialogConfirm(){
                var col = {};
                var col_table = [];
                col.students = '';
                col.students_info = this.form.students;
                col.group = this.form.group;
                for (var i = 0; i < this.form.students.length; i++)
                    col.students += this.form.students[i].split("_")[1] + ',';
                col.students=col.students.substring(0,col.students.length-1)

                for (var i = 0; i < this.form.SS.length; i++){
                    col_table.push({ss:this.form.SS[i][4], des:''});
                }

                col.table=col_table;
                this.tableData.push(col);
                this.dialogFormVisible = false;
                this.form.students = [];
                this.form.group = '';
                this.form.SS = [];
                this.form.options = [];

                console.log(this.form.SS)
            },

            fddialogCancel(){
                this.fddialogFormVisible = false;
                this.form_add.fdSS = [];
            },
            fddialogConfirm(){
                for (var i = 0; i < this.form_add.fdSS.length; i++) {
                    this.tableData[this.form_add.row_index].table.push({ss:this.form_add.fdSS[i][4], des:''});
                }
                this.fddialogFormVisible = false;
                this.form_add.fdSS = [];
            },

            stdialogCancel(){
                this.stdialogFormVisible = false;
                this.form.students = [];
                this.form.options = [];
            },
            stdialogConfirm(){
              var stus = '';
              for (var i = 0; i < this.form.students.length; i++)
                stus += this.form.students[i].split("_")[1] + ',';
              this.tableData[this.form_add.row_index].students = stus.substring(0,stus.length-1);
              this.tableData[this.form_add.row_index].students_info = this.form.students;
              this.stdialogFormVisible = false;
              this.form.students = [];
              this.form.options = [];
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


<!--
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

  .character-in-table{
    margin-left: 20%
  }
  .character3-in-table{
    margin-left: 6%
  }
</style>-->
