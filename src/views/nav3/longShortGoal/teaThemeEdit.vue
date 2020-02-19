<template>
  <section>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/teaTheme' }">长短期目标</el-breadcrumb-item>
      <el-breadcrumb-item>查看|编辑</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-container>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true"  align="left" >
          <el-form-item label="课程">
            <el-input align="left" :disabled="disabled1" v-model="course"></el-input>
          </el-form-item>
          <el-form-item label="主题名称" v-if="false">
            <el-input align="left" :disabled="disabled" v-model="theme"></el-input>
          </el-form-item>
          <el-form-item label="学年">
            <el-select v-model="schoolYear" placeholder="请选择" :disabled="disabled1">
              <el-option
                      v-for="item in schoolYear_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学期">
            <el-select v-model="term" placeholder="请选择" :disabled="disabled1">
              <el-option
                      v-for="item in term_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="月份">
            <el-select v-model="month" placeholder="请选择月份" :disabled="disabled1">
              <el-option
                      v-for="item in month_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执教老师（主）">
            <el-select v-model="mainTeacher" placeholder="请选择" :disabled="disabled">
              <el-option
                      v-for="item in teacher_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执教老师（辅）">
            <el-input align="left"  :disabled="disabled" v-model="aidTeacher"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-select v-model="tclass" placeholder="请选择" :disabled="disabled1">
              <el-option
                      v-for="item in class_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间安排">
            <el-date-picker align="left" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始日期" :disabled="disabled" v-model="beginTime"></el-date-picker>
            <el-date-picker align="left" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束日期" :disabled="disabled" v-model="finishTime"></el-date-picker>
          </el-form-item>
        </el-form>
        <el-form :inline="true"  align="left">
          <p>教学主题</p>
          <div>
            <el-table
                    :data="teachingAim"
                    style="width: 100%">
              <el-table-column
                      align='left'
                      label="周次"
                      prop="w"
                      v-if="false">
              </el-table-column>
              <el-table-column
                      align='left'
                      label="周次">
                <template slot-scope="s">
                  <el-input
                          :disabled="disabled"
                          @change.native.prevent="HIChange(s.$index)"
                          v-model="teachingAim[s.$index].w">
                    <template slot="prepend">第</template>
                    <template slot="append">周</template>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                      align='center'
                      label="描述"
                      prop="des"
                      v-if="false">
              </el-table-column>
              <el-table-column
                      align='center'
                      label="描述">
                <template slot-scope="s">
                  <el-input
                          :disabled="disabled"
                          type="textarea"
                          v-model="teachingAim[s.$index].des">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                      align='center'>
                <template slot="header" slot-scope="slot">
                  <el-button type="primary" v-on:click="addTeachingAim()">添加</el-button>
                </template>
                <template slot-scope="a">
                  <el-button
                          @click.native.prevent="deleteRow(a.$index, teachingAim)"
                          type="text"
                          size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </el-col>
    </el-container>
    <el-divider></el-divider>
    <div>
      <el-button  type="primary"  @click="push1()" >详情</el-button>
      <el-button  type="primary"  @click="push2()" >教学流程</el-button>
      <el-divider></el-divider>
    </div>

    <el-container v-if="this.judge">
      <el-header>
        <p v-if="this.judge">教学目标</p>
      </el-header>
      <el-collapse v-if="this.judge">
        <el-collapse-item v-for="(domain, index) in jxmb"
                          :title="domain.title"
                          :name="domain.w"
                          :key="domain.w">
          <el-button
                  :disabled="disabled"
                  @click.native.prevent="addGroup(index)"
                  type="text"
                  size="medium">
            添加组
          </el-button>
          <el-table
                  :data="domain.table"
                  :stripe="true"
                  max-height="400">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                        border
                        :data="props.row.table">
                  <el-table-column
                          align='center'
                          prop="st"
                          label="学生"
                          width="200">
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
                              v-model="props.row.table[s.$index].des">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                  <el-table-column-->
                  <!--                          align="center"-->
                  <!--                          label="操作">-->
                  <!--                    <template slot-scope="x">-->
                  <!--                      <el-button-->
                  <!--                              :disabled="disabled"-->
                  <!--                              @click.native.prevent="deleteRow1(x.$index, jxmb[index].table[props.$index].table)"-->
                  <!--                              type="text"-->
                  <!--                              size="small">-->
                  <!--                        移除-->
                  <!--                      </el-button>-->
                  <!--                    </template>-->
                  <!--                  </el-table-column>-->
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
                    align='center'
                    prop="group"
                    label="组别"
                    style="width: 10%;">
            </el-table-column>
            <el-table-column
                    align='center'
                    prop="students"
                    label="学生"
                    style="width: 80%;">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
                    style="width: 10%;">
              <template slot-scope="x">
                <el-button
                        :disabled="disabled"
                        @click.native.prevent="editStus(index, x.$index)"
                        type="text"
                        size="small">
                  编辑学生
                </el-button>
                <el-button
                        :disabled="disabled"
                        @click.native.prevent="deleteRow1(x.$index, jxmb[index].table)"
                        type="text"
                        size="small">
                  移除该组
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <el-divider></el-divider>
    </el-container>

    <el-dialog title="添加组" :visible.sync="dialogFormVisible" @close="dialogCancel()">
      <el-form>
        <el-form-item label="组" :label-width="formLabelWidth">
          <el-select v-model="groups" multiple clearable placeholder="请选择组" style="width:400px">
            <el-option
                    v-for="item in groupOpts"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel()">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加学生评鉴" :visible.sync="PJDialogFormVisible" @close="dialogCancel1()">
      <el-form>
        <el-form-item label="学生" :label-width="formLabelWidth">
          <el-select v-model="PJStu" multiple clearable placeholder="请选择学生" style="width:400px">
            <el-option
                    v-for="item in PJOpts"
                    :key="item.key"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel1()">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm1()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="学生编辑" :visible.sync="form.stdialogFormVisible" @close="stdialogCancel()">
      <el-form>
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
        <el-button type="primary" @click="stdialogConfirm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-container v-if="this.judge">
      <el-header>
        <p>目标评鉴</p>
      </el-header>
      <div>
        <el-table
                :data="mbpj"
                style="width: 100%">
          <el-table-column
                  align='left'
                  label="学生"
                  prop="stu">
          </el-table-column>
          <el-table-column
                  align='center'
                  label="评鉴"
                  prop="eval"
                  v-if="false">
          </el-table-column>
          <el-table-column
                  align='center'
                  label="评鉴">
            <template slot-scope="s">
              <el-input
                      :disabled="disabled"
                      type="textarea"
                      v-model="mbpj[s.$index].eval">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
                  align='center'>
            <template slot="header" slot-scope="slot">
              <el-button type="primary" @click="addPJ(1)">添加</el-button>
            </template>
            <template slot-scope="z">
              <el-button
                      :disabled="disabled"
                      @click.native.prevent="deleteRow1(z.$index, mbpj)"
                      type="text"
                      size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-divider></el-divider>
    </el-container>


    <el-container v-if="this.judge1">
      <el-header>
        <p>重难点</p>
      </el-header>
      <vue-ckeditor :readonly="disabled" type="classic"  v-model="znd" height="300" width="700" :editors="editors1" :config='config'></vue-ckeditor>
      <el-divider></el-divider>
    </el-container>

    <el-container v-if="this.judge1">
      <el-header>
        <p>始活动</p>
      </el-header>
      <vue-ckeditor :readonly="disabled" type="classic"  v-model="shd" height="300" width="700" :editors="editors1" :config='config'></vue-ckeditor>
      <el-divider></el-divider>
    </el-container>

    <el-container v-if="this.judge1">
      <el-header>
        <p>主活动</p>
      </el-header>
      <vue-ckeditor :readonly="disabled" type="classic"  v-model="zhd" height="300" width="700" :editors="editors1" :config='config'></vue-ckeditor>
      <el-divider></el-divider>
    </el-container>

    <el-container v-if="this.judge1">
      <el-header>
        <p>整理活动</p>
      </el-header>
      <vue-ckeditor :readonly="disabled" type="classic"  v-model="zlhd" height="300" width="700" :editors="editors1" :config='config'></vue-ckeditor>
      <el-divider></el-divider>
    </el-container>

    <el-container v-if="this.judge1">
      <el-header>
        <p>课后反思</p>
      </el-header>
      <vue-ckeditor :readonly="disabled" type="classic"  v-model="khfs" height="300" width="700" :editors="editors1" :config='config'></vue-ckeditor>
      <el-divider></el-divider>
    </el-container>

    <el-form :inline="true" align="center">
      <el-form-item>
        <el-button type="danger" @click="teachingTheme_submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import VueCkeditor from 'vue-ckeditor5'
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
  export default {
    name: "jiaoxuezhuti_edit",
    components:{'vue-ckeditor': VueCkeditor.component},
    data(){
      return{
        course:'',
        theme:'',
        schoolYear:'',
        term:'',
        month:'',
        mainTeacher:'',
        aidTeacher:'',
        tclass:'',
        beginTime:'',
        finishTime:'',

        teachingAim:[],
        jxmb:[],
        groups:[],
        groupOpts:[],
        dialogFormVisible:false,
        formLabelWidth:'120px',
        index:'',

        mbpj:[],
        PJStu:[],
        PJOpts:[],
        PJDialogFormVisible:false,

        form:{
          stdialogFormVisible:false,

          week_index:'',
          group_index:'',

          students:[],
          options:[],
        },


        znd:'',
        shd:'',
        zhd:'',
        zlhd:'',
        khfs:'',


        judge:1,
        judge1:0,
        disabled:true,
        disabled1:true,

        month_options: [
          {value: '1 ', label: '1 '},{value: '2 ', label: '2 '},{value: '3 ', label: '3 '},{value: '4 ', label: '4 '},
          {value: '5 ', label: '5 '},{value: '6 ', label: '6 '},{value: '7 ', label: '7 '},{value: '8 ', label: '8 '},
          {value: '9 ', label: '9 '},{value: '10', label: '10'},{value: '11', label: '11'},{value: '12', label: '12'}
        ],
        class_options:[],
        teacher_options:[],
        term_options: [{value: '上学期', label: '上学期'},
          {value: '下学期', label: '下学期'}],
        schoolYear_options: [{value: '2017-2018', label: '2017-2018'},
          {value: '2018-2019', label: '2018-2019'},
          {value: '2019-2020', label: '2019-2020'},
          {value: '2020-2021', label: '2020-2021'}],




        editors1: {
          classic: ClassicEditor,
        },
        config:{
          language:'zh-cn',
          ckfinder: {
            uploadUrl: 'http://47.110.134.247/api/stu/picture_JXZhuTi'
          },
        },
      }
    },
    mounted(){
      if(this.$route.query.isEdit == 1) {
        this.disabled = false;
        this.disabled1 = true;
        this.readTrainingSPinfo();
      }else if (this.$route.query.isEdit == 2){
        this.disabled = true;
        this.disabled1 = true;
        this.readTrainingSPinfo();
      }else {
        this.disabled = false;
        this.disabled1 = false;
        this.queryClasstable();
        this.queryTeacher();
      }
    },
    methods:{
      readTrainingSPinfo(){
        this.schoolYear=this.$store.state.teachingTheme[0].schoolYear;
        this.term=this.$store.state.teachingTheme[0].term;
        this.tclass=this.$store.state.teachingTheme[0].class;
        this.course=this.$store.state.teachingTheme[0].course;
        this.theme=this.$store.state.teachingTheme[0].theme;
        this.month=this.$store.state.teachingTheme[0].month;
        this.mainTeacher=this.$store.state.teachingTheme[0].mainTeacher;
        this.aidTeacher=this.$store.state.teachingTheme[0].aidTeacher;
        this.beginTime=JSON.parse(this.$store.state.teachingTheme[0].timeArrange).beginTime;
        this.finishTime=JSON.parse(this.$store.state.teachingTheme[0].timeArrange).finishTime;

        this.teachingAim=JSON.parse(this.$store.state.teachingTheme[0].teachingAim).content;

        this.jxmb=JSON.parse(JSON.parse(this.$store.state.teachingTheme[0].details).jxmb);
        this.mbpj=JSON.parse(JSON.parse(this.$store.state.teachingTheme[0].details).mbpj);

        this.znd=JSON.parse(this.$store.state.teachingTheme[0].teachingProcess).znd;
        this.shd=JSON.parse(this.$store.state.teachingTheme[0].teachingProcess).shd;
        this.zhd=JSON.parse(this.$store.state.teachingTheme[0].teachingProcess).zhd;
        this.zlhd=JSON.parse(this.$store.state.teachingTheme[0].teachingProcess).zlhd;
        this.khfs=JSON.parse(this.$store.state.teachingTheme[0].teachingProcess).khfs;

        this.queryClasstable();
        this.queryTeacher();
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

      async teachingTheme_submit(){
        //this.addPJ(0);
        // console.log(this.jxmb);
        console.log(this.mbpj);
        // console.log(this.teachingAim);
        var timeArrange = {
          beginTime:this.beginTime, finishTime:this.finishTime
        };
        var TA = {
          content:this.teachingAim
        };
        var details = {
          jxmb:JSON.stringify(this.jxmb), mbpj:JSON.stringify(this.mbpj)
        };
        var teachingProcess = {
          znd:this.znd, shd:this.shd, zhd:this.zhd, zlhd:this.zlhd, khfs:this.khfs
        };
        if(this.$route.query.isEdit == 0) {
          await this.$http.post('http://47.110.134.247/api/stu/addTeachingTheme', {
            course:this.course,
            theme:this.theme,
            schoolYear:this.schoolYear,
            term: this.term,
            month:this.month,
            mainTeacher:this.mainTeacher,
            aidTeacher:this.aidTeacher,
            class:this.tclass,
            timeArrange:timeArrange,
            teachingAim:TA,
            details:details,
            teachingProcess:teachingProcess,
          }, {}).then((response) => {
            console.log(response);
          });
          this.editLearningReports();
        }else {
          await this.$http.post('http://47.110.134.247/api/stu/upTeachingTheme', {
            course:this.course,
            theme:this.theme,
            schoolYear:this.schoolYear,
            term: this.term,
            month:this.month,
            mainTeacher:this.mainTeacher,
            aidTeacher:this.aidTeacher,
            class:this.tclass,
            timeArrange:timeArrange,
            teachingAim:TA,
            details:details,
            teachingProcess:teachingProcess,
            id: this.$store.state.teachingTheme[0].id,
          }, {}).then((response) => {
            console.log(response);
          })
          this.editLearningReports();
        }
        this.$router.replace({path: '/teaTheme'});
      },

      async editLearningReports(){
        for (var i = 0; i < this.mbpj.length; i++){
          var newLR = {};
          var se = {};
          se.table = [];
          se.subject = this.course;
          se.evaluation = this.mbpj[i].eval;
          for (var m = 0; m < this.jxmb.length; m++){
            for (var n = 0; n < this.jxmb[m].table.length; n++){
              for (var x = 0; x < this.jxmb[m].table[n].table.length; x++){
                if (this.jxmb[m].table[n].table[x].st == this.mbpj[i].stu)
                  se.table.push({week:this.jxmb[m].w, teachingTheme:this.teachingAim[m].des, teachingAim:this.jxmb[m].table[n].table[x].des});
              }
            }
          }
          var flag = 'inexistent';
          await this.$http.post('http://47.110.134.247/api/stu/queExistLR',{
            schoolYear:this.schoolYear,
            term:this.term,
            tclass:this.tclass,
            stuInfo:this.mbpj[i].stu,
          }, {}).then((response) => {
            var LR = response.body;
            if (LR.length > 0){
              newLR.schoolYear = LR[0].schoolYear;
              newLR.term = LR[0].term;
              newLR.tclass = LR[0].class;
              newLR.stuInfo = LR[0].stuInfo;
              newLR.stuName = LR[0].stuName;
              newLR.id = LR[0].id;
              newLR.months = [];
            }
            if (LR.length > 0 && JSON.parse(LR[0].months).length > 0){
              newLR.months = JSON.parse(LR[0].months);
              console.log(JSON.parse(LR[0].months))
              for (var j = 0; j < JSON.parse(LR[0].months).length; j++){
                if (JSON.parse(LR[0].months)[j].month == this.month) {
                  flag = 'month_exist';
                  for (var k = 0; k < JSON.parse(LR[0].months)[j].details.length; k++){
                    if (JSON.parse(LR[0].months)[j].details[k].subject == se.subject) {
                      flag = 'subject_exist'
                      newLR.months[j].details[k] = se;
                      break;
                    }
                  }
                  if (flag == 'subject_exist')
                    break;
                  newLR.months[j].details.push(se)
                  break;
                }
                if (j+1 == JSON.parse(LR[0].months).length) {
                  flag = 'LR_exist';
                  newLR.months.push({month:this.month, details:[se]});
                  break;
                }
              }
            }
          })

          if (flag == 'LR_exist' || flag == 'subject_exist' || flag == 'month_exist'){
            console.log(newLR.stuName+':'+flag);
            flag = 'inexistent';
            await this.$http.post('http://47.110.134.247/api/stu/upLearningReports',{
              schoolYear:newLR.schoolYear,
              term:newLR.term,
              class:newLR.tclass,
              stuName:newLR.stuName,
              stuInfo:newLR.stuInfo,
              months:newLR.months,
              id:newLR.id
            }, {}).then((response) => {
              console.log(response);
            });
            continue;
          }else if (flag = 'inexistent') {
            newLR.schoolYear = this.schoolYear;
            newLR.term = this.term;
            newLR.tclass = this.tclass;
            newLR.stuInfo = this.mbpj[i].stu;
            newLR.stuName = this.mbpj[i].stu.split("_")[1];
            newLR.months = [];
            newLR.months.push({month:this.month, details:[se]});
            console.log(newLR.stuName+':'+flag);

            await this.$http.post('http://47.110.134.247/api/stu/addLearningReports',{
              schoolYear:newLR.schoolYear,
              term:newLR.term,
              class:newLR.tclass,
              stuName:newLR.stuName,
              stuInfo:newLR.stuInfo,
              months:newLR.months,
            }, {}).then((response) => {
              console.log(response);
            });
            continue;
          }
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

      deleteRow(index, rows) {
        this.jxmb.splice(index,1);
        rows.splice(index, 1);
      },
      deleteRow1(index, rows) {
        rows.splice(index, 1);
      },

      async editStus(week, group) {
        await this.$http.post('http://47.110.134.247/api/stu/queryClass', {
          class_id: this.tclass,
        }, {}).then((response) => {
          for (var i = 0; i < response.body.length; i++){
            var opt = {};
            opt.value = response.body[i].student_id + '_'+ response.body[i].name;
            opt.label = opt.value;
            this.form.options.push(opt);
          }
        });

        this.form.week_index = week;
        this.form.group_index = group;
        this.form.students = this.jxmb[this.form.week_index].table[this.form.group_index].students_info;
        this.form.stdialogFormVisible = true;
      },

      HIChange(index){
        this.jxmb[index].w = this.teachingAim[index].w;
        this.jxmb[index].title = '第'+this.jxmb[index].w+'周';
      },

      addTeachingAim(){
        var week;
        if (this.teachingAim.length == 0) {
          this.teachingAim.push({des: '', w: 1});
          this.jxmb.push({w: 1, title: '第1周', table:[]});
        }
        else {
          week = this.teachingAim.length + 1;
          this.teachingAim.push({des:'', w:week});
          this.jxmb.push({w: week, title:'第'+week+'周', table:[]});
        }

        console.log(this.jxmb);
      },

      async addGroup(index){
        this.index = index;
        var tableData = [];
        await this.$http.post('http://47.110.134.247/api/stu/queClassGSP', {
          class_id:this.tclass,
          term:this.term
        }, {}).then((response) => {
          for (var i = 0; i < response.body.length; i++){
            var jx = JSON.parse(JSON.parse(response.body[i].teachingPlan).jxmb.content);
            for (var j = 0; j < jx.length; j++){
              tableData.push(jx[j])
            }
          }
        });

        this.groupOpts = [];

        for (var i = 0; i < tableData.length; i++)
          this.groupOpts.push({value:tableData[i].group, label:tableData[i].group+'('+tableData[i].students+')', key:tableData[i].group, table:tableData[i]})

        //console.log(this.groupOpts)
        this.dialogFormVisible = true;
      },

      dialogConfirm(){
        for (var i = 0; i < this.groups.length; i++) {
          for (var j = 0; j < this.groupOpts.length; j++)
            if (this.groups[i] == this.groupOpts[j].value) {
              this.groupOpts[j].table.table=[];
              for (var k = 0; k < this.groupOpts[j].table.students_info.length; k++)
                this.groupOpts[j].table.table.push({st:this.groupOpts[j].table.students_info[k], des:''});
              this.jxmb[this.index].table.push(this.groupOpts[j].table);
            }
        }
        this.dialogFormVisible = false;
        this.groupOpts = [];
        this.groups = [];
      },
      dialogCancel(){
        this.dialogFormVisible = false;
        this.groupOpts = [];
        this.groups = [];
      },

      addPJ(isDiaShow){
        if (this.mbpj.length >= 1 && isDiaShow == 1)
          for (var i = 0; i < this.mbpj.length; i++)
            this.PJStu.push(this.mbpj[i].stu);
        var index = [];
        for (var i = 0; i < this.jxmb.length; i++)
          for (var j = 0; j < this.jxmb[i].table.length; j++)
            for (var k = 0; k < this.jxmb[i].table[j].students_info.length; k++)
              index.push({value:this.jxmb[i].table[j].students_info[k], label:this.jxmb[i].table[j].students_info[k]});

        var isExist = false;

        for (var i = 0; i < index.length; i++) {
          for (var j = 0; j < this.PJOpts.length; j++)
            if (index[i].value == this.PJOpts[j].value)
              isExist = true
          if(!isExist)
            this.PJOpts.push(index[i]);
          isExist = false;
        }

        if (isDiaShow == 1)
          this.PJDialogFormVisible = true;
      },

      dialogConfirm1(){
        var flag = false;
        for (var i = 0; i < this.PJStu.length; i++){
          for (var j = 0; j < this.mbpj.length; j++)
            if (this.mbpj[j].stu == this.PJStu[i]){
              flag = true;
              break;
            }
          if (!flag)
            this.mbpj.push({stu: this.PJStu[i], eval: ''});
          flag = false;
        }
        this.PJDialogFormVisible = false;
        this.PJOpts = [];
        this.PJStu = [];
      },
      dialogCancel1(){
        this.PJDialogFormVisible = false;
        this.PJOpts = [];
        this.PJStu = [];
      },

      stdialogCancel(){
        this.form.stdialogFormVisible = false;
        this.form.students = [];
        this.form.options = [];
        this.form.group_index = '';
        this.form.week_index = '';
      },
      stdialogConfirm(){
        this.form.stdialogFormVisible = false;

        this.jxmb[this.form.week_index].table[this.form.group_index].students_info = this.form.students;
        var stus = '';
        for (var i = 0; i < this.form.students.length; i++)
          stus += this.form.students[i].split("_")[1] + ',';
        this.jxmb[this.form.week_index].table[this.form.group_index].students = stus.substring(0,stus.length-1);

        var t = [];
        var flag = -1;
        for (var i = 0; i < this.form.students.length; i++) {
          for (var j = 0; j < this.jxmb[this.form.week_index].table[this.form.group_index].table.length; j++)
            if (this.form.students[i] == this.jxmb[this.form.week_index].table[this.form.group_index].table[j].st)
              flag = j;
          if (flag != -1){
            t.push({
              st: this.form.students[i],
              des: this.jxmb[this.form.week_index].table[this.form.group_index].table[flag].des
            });
            flag = -1;
          } else {
            t.push({
              st: this.form.students[i],
              des: ''
            });
          }
        }

        this.jxmb[this.form.week_index].table[this.form.group_index].table = t;

        this.form.students = [];
        this.form.options = [];
        this.form.group_index = '';
        this.form.week_index = '';
      },

      queryTeacher(){
        this.$http.post('http://47.110.134.247/api/stu/queSchoolTeachers', {
          school:"苏州工业园区仁爱学校"
        },{}).then((response) => {
          //console.log(response);
          for (var i = 0; i < response.body.length; i++) {
            this.teacher_options.push({value:response.body[i].userName, label:response.body[i].userName, id:response.body[i].id});
          }
        });
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
</style>

