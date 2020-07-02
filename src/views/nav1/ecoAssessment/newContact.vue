<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="stu" >
      <el-form-item>
        <el-button type="danger" icon="el-icon-edit" v-on:click="jmp2create">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" icon="el-icon-top" v-on:click="export2Excel">信息导出</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <div class="table">
      <div class="search-Box">
        <el-input   placeholder="请输入需要查找的关键字" class="search"  v-model="search">
          <template slot="prepend">模糊搜索</template>
        </el-input>
      </div>
      <el-table v-loading="loading" :data="tables" align="left" stripe>
        <el-table-column prop="student_id" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="Sex" label="性别"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="danger"icon="el-icon-s-tools">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="findStuinfo(scope.row.student_id,1)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native="findStuinfo(scope.row.student_id,2)">查看</el-dropdown-item>
                <el-dropdown-item @click.native="whetherDel(scope.row.student_id,scope.row.name)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--工具条-->
    <div class="paginationClass">
      <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="this.currentPage1"
          :page-size= "this.pageSize"
          :total = "this.total"
          layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="this.dialogVisible"
        width="30%"
        :show-close="false">
      <span><font size="3">是否要删除学生</font><font size="4"><i><strong>{{delName}}</strong></i></font> <font size="3">的所有信息？</font></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="delStuinfo(delID)"></el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
    export default {
        name: "NewContact",
        data() {
            return {
                checkPermission:localStorage.getItem('Permission')[6],
                editPermission:localStorage.getItem('Permission')[7],

                dialogVisible:false,
                delID:'',
                delName:'null',

                search: '',  //搜索

                stu: {
                    name: ''
                },
                data1:'',
                targetIni:{},
                allTargetIni:{},
                options: [
                    '仁班(1)', '仁班(2)', '义班(1)', '义班(2)',
                ],

                total:0,
                pageSize:10,
                currentPage1:1,
                tempList:[],
                tableData:[],

              loading:true,
            }
        },
        computed:{
            tables:function(){
                var search=this.search;
                if(search.length > 0){
                    return  this.$store.state.stuNNS.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    });
                    return this.$store.state.stuNNS
                }
                else {
                    return  this.tempList.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    });
                    return this.tempList
                }

            }
        },
        mounted(){
            this.updatestuNNS();
            console.log(this.checkPermission)
        },
        methods:{
            //页面刷新
            async updatestuNNS(){
                await this.$http.post('/api/stu/querySch',{
                },{}).then((response) => {
                    this.$store.dispatch("setschooltables", response.bodyText);
                    // console.log(this.$store.state.schooltables);
                });

                await this.$http.post('/api/stu/queStuNNS',{
                },{}).then((response) => {
                    this.$store.dispatch("setstuNNS", response.bodyText);
                    this.total = this.$store.state.stuNNS.length;
                    if(this.$route.query.currentPage != undefined)
                      this.currentPage1 = parseInt(this.$route.query.currentPage);
                    this.currentChangePage(this.currentPage1);
                    // console.log(this.tempList)
                });

                this.loading = false;
            },

            //获取学校选项
            jmp2create() {
              if (this.editPermission != 1){
                this.$message.warning("暂无权限！");
                return;
              }
                this.$router.replace({path:'/createAssess', query: {currentPage: this.currentPage1}});
            },

            //删除学生信息
            delStuinfo(id) {
                this.$http.post('/api/stu/delStu',{
                    dStuID:id
                },{}).then((response) => {
                    console.log('ok');
                });
                this.$http.post('/api/stu/queStuNNS',{
                },{}).then((response) => {
                    this.$store.dispatch("setstuNNS", response.bodyText);
                    this.currentChangePage(this.currentPage1);
                    this.delID = 0;
                    this.dialogVisible = false;
                    // console.log(this.$store.state.stuNNS);
                });
            },
            //初始化生态评量5张附表的信息
            async iniFuBiao(stuID){
              var MPH;
              var SP;
              var SOH;
              var AS1;
              var AS2;
              await this.$http.post('/api/stu/queMPH',{
                stuID:stuID
              },{}).then((response) => {
                MPH = response.body;
              });
              await this.$http.post('/api/stu/queSP',{
                stuID:stuID
              },{}).then((response) => {
                SP = response.body;
              });
              await this.$http.post('/api/stu/queSOH',{
                stuID:stuID
              },{}).then((response) => {
                SOH = response.body;
              });
              await this.$http.post('/api/stu/queAS1',{
                stuID:stuID
              },{}).then((response) => {
                AS1 = response.body;
              });
              await this.$http.post('/api/stu/queAS2',{
                stuID:stuID
              },{}).then((response) => {
                AS2 = response.body;
              });

              if(MPH.length == 0)
                await this.$http.post('/api/stu/addMPH',{
                  stuID:stuID
                },{})
              if(SP.length == 0)
                await this.$http.post('/api/stu/addSP',{
                  stuID:stuID
                },{})
              if(SOH.length == 0)
                await this.$http.post('/api/stu/addSOH',{
                  stuID:stuID
                },{})
              if(AS1.length == 0)
                await this.$http.post('/api/stu/addAS1',{
                  stuID:stuID
                },{})
              if(AS2.length == 0)
                await this.$http.post('/api/stu/addAS2',{
                  stuID:stuID
                },{})
            },
            //查询指定学生所有信息
            findStuinfo(AStuID, isEdit) {
              if (isEdit == 2 && this.checkPermission != 1){
                this.$message.warning("暂无权限！");
                return;
              }
              if (isEdit == 1 && this.editPermission != 1){
                this.$message.warning("暂无权限！");
                return;
              }
                this.iniFuBiao(AStuID);
                this.$http.post('/api/stu/queryStuinfo',{
                    AStuID:AStuID
                },{}).then((response) => {
                    // console.log(JSON.parse(response.bodyText)[0].IsTargetInitialized);
                    if(JSON.parse(response.bodyText)[0].IsTargetInitialized === 0){
                        this.addTarget('医学诊断', AStuID);
                        this.addTarget('家庭基础信息（家长自评）', AStuID);
                        this.addTarget('专项评估', AStuID);
                        this.$http.post('/api/stu/setIni1',{
                            StuID:AStuID
                        },{}).then((response) => {});
                        this.$http.post('/api/stu/ATIini',{
                            ATI:this.allTargetIni,
                            ATIID:AStuID
                        },{}).then((response) => {
                            this.$http.post('/api/stu/queryStuinfo',{
                                AStuID:AStuID
                            },{}).then((response) => {
                                this.$store.dispatch("setstuinfo", response.bodyText);
                                //console.log(isEdit);
                                this.$router.push({path:'/checkNEdit', query:{isEdit: isEdit, currentPage: this.currentPage1},})
                              return;
                            });
                        });
                    }
                    else {
                        this.$http.post('/api/stu/queryStuinfo',{
                            AStuID:AStuID
                        },{}).then((response) => {
                            this.$store.dispatch("setstuinfo", response.bodyText);
                            // console.log(this.$store.state.stuinfo[0]);
                            this.$router.push({path:'/checkNEdit', query:{isEdit: isEdit, currentPage: this.currentPage1}})
                        });
                    }
                });
            },





            addTarget(targetName, AStuID){
                this.targetIni = {};
                for(var i = 0;i < this.$store.state.schooltables.length; i++)
                {
                    if(this.$store.state.schooltables[i].target_description === targetName) //查找对应的target_description
                    {
                        this.data1=i;     //将查找到的下标i赋值给变量data1
                        this.bli();    //执行遍历函数
                    }
                }
                // console.log(this.targetIni);

                switch (targetName) {
                    case '医学诊断':
                        var ini = {诊断证书:null, 残疾证:null};
                        this.$http.post('/api/stu/MDini',{
                            MD:ini,
                            MDID:AStuID
                        },{}).then((response) => {});
                        break;

                    case '家庭基础信息（家长自评）':
                        this.$http.post('/api/stu/HBIini',{
                            HBI:this.targetIni,
                            HBIID:AStuID
                        },{}).then((response) => {});
                        break;

                    case '专项评估':
                        this.$http.post('/api/stu/Eini',{
                            E:this.targetIni,
                            EID:AStuID
                        },{}).then((response) => {});
                        break;

                    default:
                        break;
                }
            },

            bli() {
                var i = parseInt(this.data1); //将string类型的data1转成int型，并赋值给i
                if(!this.$store.state.schooltables[i].target_show_type) //检查下标为i的schooltable[i]是否为空
                {
                    var s = this.$store.state.schooltables[i].target_children;  //将schooltables[i]的target_children字符串赋值给s
                    var shuzu=[];     //用来存放childrenID中的数
                    var str1 = s.substring(1,s.length-1); //截取字符串s,例如s的内容为[1,2,3],截取s使得str1为1,2,3
                    shuzu = str1.split(",");   //以","为界，将str1转变为数组，并赋值给str2
                    let shuzu_id = [];
                    for(let j = 0;j < shuzu.length;j++) {
                        for (let i = 0; i < this.$store.state.schooltables.length; i++) {
                            if(this.$store.state.schooltables[i].target_id ===  parseInt(shuzu[j])) {
                                shuzu_id.push(i);
                            }
                        }
                    }
                    shuzu = shuzu_id;
                    for (var j = 0; j < shuzu.length ; j++)
                    {
                        var c = shuzu[j]; //将字符串转为Int型

                        if (this.$store.state.schooltables[c].target_show_type === 'text')
                        {
                            var des = {description:'null',age:'null'};
                            this.targetIni[this.$store.state.schooltables[c].target_description]= des;
                            this.allTargetIni[this.$store.state.schooltables[c].target_description]=des;
                        }
                        else
                        {
                            this.data1 = c;
                            this.bli();
                        }
                    }
                }
                else //如果下标为i的schooltable[i]不为空，则生成text文本框
                {
                    var des = {description:'null',age:'null'};
                    this.targetIni[this.$store.state.schooltables[c].target_description]= des;
                    this.allTargetIni[this.$store.state.schooltables[c].target_description]= des;
                }
            },



            //分页
            handleSizeChange1: function(pageSize) { // 每页条数切换
                this.pageSize = pageSize;
                this.handleCurrentChange1(this.currentPage1);
            },
            handleCurrentChange1: function(currentPage) {//页码切换
                this.currentPage1 = currentPage;
                this.currentChangePage(currentPage);
                // console.log(currentPage)
            },
            //分页方法（重点）
            currentChangePage(currentPage) {
                // console.log(this.$store.state.stuNNS);
                var from = (currentPage - 1) * this.pageSize;
                var to = currentPage * this.pageSize;
                this.tempList = [];
                for (var i = from; i < to; i++) {
                    if (this.$store.state.stuNNS[i]) {
                        this.tempList.push(this.$store.state.stuNNS[i]);
                    }
                }
            },



            whetherDel(ID,Name){
                if (this.editPermission != 1){
                  this.$message.warning("暂无权限！");
                  return;
                }
                this.delID = ID;
                this.delName = Name;
                this.dialogVisible = true;
            },
            handleClose(){
                console.log(this.delID)
                this.dialogVisible = false;
            },
            /*export2Excel() {
              require.ensure([], () => {
                const {export_json_to_excel} = require('../../vendor/Export2Excel')
                const tHeader = ['学生姓名', '学籍号', '性别', '身份证号', '出生日期', '籍贯', '（省、市）户籍地址', '居住地址']
                const filterVal = ['Name', 'StuID', 'Sex', 'ID', 'Birthday', 'Origin', 'PermanentAddress', 'HomeAddress']
                this.tableData=[];
                for(var i = 0 ; i < this.$store.state.stuNNS.length ; i++)
                {
                  this.tableData.push({'Name': this.$store.state.stuNNS[i].Name,
                    'StuID': this.$store.state.stuNNS[i].StuID,
                    'Sex': this.$store.state.stuNNS[i].Sex,
                    'ID': this.$store.state.stuNNS[i].ID,
                    'Birthday': this.$store.state.stuNNS[i].Birthday,
                    'Origin': this.$store.state.stuNNS[i].Origin,
                    'PermanentAddress': this.$store.state.stuNNS[i].PermanentAddress,
                    'HomeAddress': this.$store.state.stuNNS[i].HomeAddress})
                }
                const list = this.tableData  // 把data里的tableData存到list
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '学生基本信息')
              })
            },

            formatJson(filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => v[j]))
            },*/

//引入字段过滤器时间过滤
            export2Excel(){
                this.tableData=[];
                for(var i = 0 ; i < this.$store.state.stuNNS.length ; i++)
                {
                    var birthday = new Date(this.$store.state.stuNNS[i].Birthday.replace(/-/g,"/"));
                    var d = new Date();
                    var age = d.getFullYear()-birthday.getFullYear()-(d.getMonth()<birthday.getMonth() || (d.getMonth() == birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0 );
                    var array = [ ];
                    var str1;
                    var str2;
                    var disable;
                    disable = this.$store.state.stuNNS[i].Disability_type;
                    // console.log(disable)
                    str1 = disable.substring(10, disable.length - 2);
                    //console.log(str1)
                    // console.log(str1.length)
                    /*array = [ ];
                    for(var i = 0 ; i*8 < str1.length ; i++)
                    {
                      str2 = str1.substring(1+i*8,1+i*8+4);
                      array.push(str2)
                    }
                    var str4 = "";
                    for(var i = 0 ; i < array.length ; i++) {
                      if (array.length > 1) {
                        str4 = array[i] + "," + str4
                      } else {
                        str4 = array[i] + str4;
                      }
                    }*/
                    this.tableData.push({
                        'sort':i+1,
                        'Name': this.$store.state.stuNNS[i].Name,
                        'Sex': this.$store.state.stuNNS[i].Sex,
                        'age':age,
                        'LastSchool_name':this.$store.state.stuNNS[i].LastSchool_name,
                        'ID': this.$store.state.stuNNS[i].ID,
                        'DisabilityCertificate_number':this.$store.state.stuNNS[i].DisabilityCertificate_number,
                        'Disability_type':str1,
                        'Disability_level':this.$store.state.stuNNS[i].Disability_level,
                        'PermanentAddress': this.$store.state.stuNNS[i].PermanentAddress,
                        'HomeAddress': this.$store.state.stuNNS[i].HomeAddress,
                        'EmergencyContact1_tele':this.$store.state.stuNNS[i].EmergencyContact1_tele,
                        'EmergencyContact1_tel':this.$store.state.stuNNS[i].EmergencyContact1_tel,}
                    )
                }
                var excelDatas = [
                    {
                        tHeader : ["序号", "姓名","性别" ,"年龄(周岁)", "就读学校", "身份证号","残疾证号","残疾类别","残疾等级","户籍地址","现住地址","电话号码","手机号码"], // sheet表一头部
                        filterVal: ["sort", "Name","Sex" ,"age", " LastSchool_name","ID","DisabilityCertificate_number" ,"Disability_type","Disability_level","PermanentAddress","HomeAddress","EmergencyContact1_tele","EmergencyContact1_tel"], // 表一的数据字段
                        tableDatas: this.tableData, // 表一的整体json数据
                        sheetName: "学生信息表"// 表一的sheet名字
                    },
                ]
                this.json2excel(excelDatas, "数据报表", true, "xlsx")
            },
            // tableJson 导出数据 ; filenames导出表的名字; autowidth表格宽度自动 true or false; bookTypes xlsx & csv & txt
            json2excel (tableJson, filenames, autowidth, bookTypes) {
                var that = this
//这个是引用插件
                import("@/vendor/Export2Excel").then(excel => {
                    var tHeader = [];
                    var dataArr = [];
                    var sheetnames = [];
                    for (var i in tableJson) {
                        tHeader.push(tableJson[i].tHeader);
                        dataArr.push(that.formatJson(tableJson[i].filterVal, tableJson[i].tableDatas));
                        sheetnames.push(tableJson[i].sheetName);
                    }
                    excel.export_json_to_excel2({
                        header: tHeader,
                        data: dataArr,
                        sheetname: sheetnames,
                        filename: filenames,
                        autoWidth: autowidth,
                        bookType: bookTypes
                    })
                })
            },
            // 数据过滤，时间过滤
            formatJson (filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === "timestamp") {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
        }


    }
</script>

<style scoped>
  .paginationClass{
    margin-top: 1%;
  }
</style>
