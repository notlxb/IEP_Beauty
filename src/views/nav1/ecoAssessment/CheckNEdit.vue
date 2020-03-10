<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <section id="data1">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newContact' , query:{currentPage:this.$route.query.currentPage}}">生态评量</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/growTarget', query:{currentPage:this.$route.query.currentPage}}">医学诊断</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/devTarget', query:{currentPage:this.$route.query.currentPage}}">家庭基础信息（家长自评）</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/funcTarget', query:{currentPage:this.$route.query.currentPage}}">专项评估</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="center"><strong>学生基本信息</strong></el-divider>
    <el-form :inline="true" align="left" ref="form":model="getstu">
      <el-form-item label="学生姓名">
        <el-input v-model="getstu.name"></el-input>
      </el-form-item>
      <el-form-item label="学籍号">
        <el-input v-model="getstu.StuID" ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <input v-model="getstu.sex" type="radio" name="stu_sex" value="男">男
        <input v-model="getstu.sex" type="radio" name="stu_sex" value="女">女<br />
      </el-form-item><br>
      <el-form-item label="身份证号">
        <el-input v-model="getstu.ID" ></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="getstu.Birthday" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="getstu.Origin" ></el-input>
      </el-form-item><br>
      <el-form-item label="(省、市)户籍地址">
        <el-input v-model="getstu.PermanentAddress" ></el-input>
      </el-form-item>
      <el-form-item label="居住地址">
        <el-input v-model="getstu.HomeAddress" ></el-input> <br>
      </el-form-item> <br>
      受教育经历:
      <br>
      <br>
      <el-form-item label="学校(结构)名称">
        <el-input v-model="getstu.GraduatedSchool_name" ></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="getstu.GraduatedSchool_address" ></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="right"></el-divider>
    <el-form  :inline="true" align="left"  ref="form" :model="getstu" >
      <template style="width:200px; height:200px;float:left;">
        <el-form-item label="残疾类型">
          <input type="checkbox" v-model="getstu.Disability_type"  name="item405"  value="视力残疾"/>视力残疾
          <input type="checkbox" v-model="getstu.Disability_type" name="item405" value="听力残疾"/>听力残疾
          <input type="checkbox" v-model="getstu.Disability_type" name="item405"  value="智力残疾"/>智力残疾
          <input type="checkbox" v-model="getstu.Disability_type" name="item405" value="言语残疾"/>言语残疾
          <input type="checkbox" v-model="getstu.Disability_type" name="item405" value="肢体残疾"/>肢体残疾
          <input type="checkbox" v-model="getstu.Disability_type" name="item405"  value="精神残疾"/>精神残疾
          <input type="checkbox" v-model="getstu.Disability_type" name="item405"  value="多重残疾"/>多重残疾
          <input type="checkbox" v-model="getstu.Disability_type" name="item405"  value="学习困难"/>学习困难
          <input type="checkbox" v-model="getstu.Disability_type" name="item405"  value="其他"/>其他
        </el-form-item>
      </template>
      <template style="width:200px; height:200px;float:left;">
        <el-form-item label="教育安置方式">
          <input type="checkbox" v-model="getstu.EducationalSetting"  value="随班就读"/>随班就读
          <input type="checkbox" v-model="getstu.EducationalSetting"  value="公办特殊学校"/>公办特殊学校
          <input type="checkbox" v-model="getstu.EducationalSetting"  value="民办特殊学校"/>民办特殊学校
          <input type="checkbox" v-model="getstu.EducationalSetting"  value="送教上门"/>送教上门
          <input type="checkbox" v-model="getstu.EducationalSetting"  value="其他"/>其他
          <el-form-item label="详情（补充）">
            <el-input v-model="getstu.Class" placeholder="学校/班级/所属地区/补充"></el-input>
          </el-form-item>
        </el-form-item>
      </template><br>
      <template style="width:200px; height:200px;float:left;">
        <el-form-item label="伴随障碍或特殊疾病">
          <input type="checkbox" v-model="getstu.SpecialIllnessOrOthers" name="item408" value="视力"/>视力
          <input type="checkbox" v-model="getstu.SpecialIllnessOrOthers" name="item408" value="听力"/>听力
          <input type="checkbox" v-model="getstu.SpecialIllnessOrOthers" name="item408" value="智力"/>智力
          <input type="checkbox" v-model="getstu.SpecialIllnessOrOthers" name="item408" value="肢体"/>肢体
          <input type="checkbox" v-model="getstu.SpecialIllnessOrOthers" name="item408" value="情绪"/>情绪
          <input type="checkbox" v-model="getstu.SpecialIllnessOrOthers" name="item408" value="心脏"/>心脏
          <input type="checkbox" v-model="getstu.SpecialIllnessOrOthers" name="item408" value="其他（器官/疾病）"/>其他（器官/疾病）
        </el-form-item>
      </template><br>
      <el-form-item label="家庭成员">
        <input type="checkbox" v-model="getstu.FamilyMember" name="item409" value="父亲"/>父亲
        <input type="checkbox" v-model="getstu.FamilyMember" name="item409" value="母亲"/>母亲
        <input type="checkbox" v-model="getstu.FamilyMember" name="item409" value="祖父"/>祖父
        <input type="checkbox" v-model="getstu.FamilyMember" name="item409" value="祖母"/>祖母
        <input type="checkbox" v-model="getstu.FamilyMember" name="item409" value="外公"/>外公
        <input type="checkbox" v-model="getstu.FamilyMember" name="item409" value="外婆"/>外婆<br>
        <input type="checkbox" v-on:click="changeFMVisible(0)" v-model="getstu.FamilyMember" name="item409" value="兄"/>兄<br>
        <el-container v-if="obro_visible">
          <el-input size="small" placeholder="几人" style="width: 100px" v-model="getstu.FamilyMember_obro"></el-input><br>
        </el-container>
        <input type="checkbox" v-on:click="changeFMVisible(1)" v-model="getstu.FamilyMember" name="item409" value="弟"/>弟<br>
        <el-container v-if="ybro_visible">
          <el-input size="small" placeholder="几人" style="width: 100px" v-model="getstu.FamilyMember_ybro"></el-input><br>
        </el-container>
        <input type="checkbox" v-on:click="changeFMVisible(2)" v-model="getstu.FamilyMember" name="item409" value="姐"/>姐<br>
        <el-container v-if="osis_visible">
          <el-input size="small" placeholder="几人" style="width: 100px" v-model="getstu.FamilyMember_osis"></el-input><br>
        </el-container>
        <input type="checkbox" v-on:click="changeFMVisible(3)" v-model="getstu.FamilyMember" name="item409" value="妹"/>妹<br>
        <el-container v-if="ysis_visible">
          <el-input size="small" placeholder="几人" style="width: 100px" v-model="getstu.FamilyMember_ysis"></el-input><br>
        </el-container>
        <el-form-item label="同住">
          <el-input v-model="getstu.FamilyMember_livetogether"></el-input>
        </el-form-item>
      </el-form-item><br>
      <template style="width:200px; height:200px;float:left;">
        <el-form-item label="学生主要照顾人">
          <input type="checkbox"  v-model="getstu.MainCaregiver" name="stu_mainCaregiver" value="父亲">父亲
          <input type="checkbox"  v-model="getstu.MainCaregiver" name="stu_mainCaregiver" value="母亲">母亲
          <input type="checkbox"  v-model="getstu.MainCaregiver" name="stu_mainCaregiver" value="祖父">祖父
          <input type="checkbox"  v-model="getstu.MainCaregiver" name="stu_mainCaregiver" value="祖母">祖母
          <input type="checkbox"  v-model="getstu.MainCaregiver" name="stu_mainCaregiver" value="外公">外公
          <input type="checkbox"  v-model="getstu.MainCaregiver" name="stu_mainCaregiver" value="外婆">外婆
          <input type="checkbox"  v-model="getstu.MainCaregiver" name="stu_mainCaregiver" value="兄弟姐妹">兄弟姐妹
          <input type="checkbox"  v-model="getstu.MainCaregiver" name="stu_mainCaregiver" value="阿姨">阿姨
        </el-form-item>
      </template><br>
    </el-form>
    <el-form>
      <el-form  :inline="true" align="left"  ref="form" :model="getstu" >
        <template style="width:200px; height:200px;float:left;">
          <el-form-item label="家长现状">
            <input type="checkbox" v-model="getstu.ParentsPS" name="item410" value="本地居民（汉族）"/>本地居民（汉族）
            <input type="checkbox" v-model="getstu.ParentsPS"  name="item410" value="低收入户"/>低收入户
            <input type="checkbox" v-model="getstu.ParentsPS"  name="item410" value="持残疾证"/>持残疾证
            <input type="checkbox" v-model="getstu.ParentsPS"  name="item410" value="华侨"/>华侨
            <input type="checkbox" v-model="getstu.ParentsPS"  name="item410" value="引进人才"/>引进人才
            <input type="checkbox" v-model="getstu.ParentsPS"  name="item410" value="外籍"/>外籍
            <input type="checkbox" v-model="getstu.ParentsPS"   name="item410" value="其他"/>其他(如军人/支边/港澳）
          </el-form-item>
        </template>
        <template style="width:500px; height:400px;float:left;">
          <el-form v-model="getstu.ParentsPS_proofMaterials">
            <el-form-item label="家庭状况材料证明" :label-width="formLabelWidth">
              <el-upload
                  ref="upload"
                  action="#"
                  accept="image/png,image/gif,image/jpg,image/jpeg"
                  list-type="picture-card"
                  :limit=limitNum
                  :auto-upload="false"
                  :on-exceed="handleExceed"
                  :before-upload="handleBeforeUpload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="50%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="uploadFile">立即上传</el-button>
            </el-form-item>
          </el-form>
        </template><br>
        <template style="width:200px; height:200px;float:left;">
          <el-form-item label="亲属现状">
            <input type="radio" v-model="getstu.RelativesPS" name="item1" value="双亲" onclick="inputq.style.display='none'">双亲
            <input type="radio" v-model="getstu.RelativesPS" name="item1" value="单亲（离婚或丧偶）" onclick="inputq.style.display='none'" >单亲（离婚或丧偶）
            <input type="radio" v-model="getstu.RelativesPS" name="item1" value="失亲（无双亲）" onclick="inputq.style.display='none'" >失亲（无双亲）
            <input type="radio" v-model="getstu.RelativesPS" name="item1" value="重组" onclick="inputq.style.display='none'">重组
            <input type="radio"  name="item1" value=""onclick="inputq.style.display='inline-block';inputq.value=''">其他
            <input type="text" v-model="getstu.RelativesPS" id="inputq" class="form-control" style="display:none;width:60px; height:20px;" value="" name=""placeholder="其他">
          </el-form-item>
        </template><br>
      </el-form>
      <el-divider content-position="center"></el-divider>
    </el-form>
    <el-form  :inline="true" align="left"  ref="form" :model="getstu" >
      <template style="width:200px; height:200px;float:left;">
        <el-form-item label="家庭气氛">
          <input v-model="getstu.FamilyEnvironment" type="radio" name="item7" value="非常和谐" onclick="t4.value='';t4.style.display='none'">非常和谐
          <input v-model="getstu.FamilyEnvironment" type="radio" name="item7" value="和谐" onclick="t4.value='';t4.style.display='none'">和谐
          <input v-model="getstu.FamilyEnvironment" type="radio" name="item7" value="普通" onclick="t4.value='';t4.style.display='none'">普通
          <input v-model="getstu.FamilyEnvironment" type="radio" name="item7" value="不和谐" onclick="t4.value='';t4.style.display='none'">不和谐
          <input v-model="getstu.FamilyEnvironment" type="radio" name="item7" value="很不和谐" onclick="t4.value='';t4.style.display='none'">很不和谐
          <input type="radio"  name="item7" value=""  onclick="t4.style.display='inline-block';t4.value=''">其他
          <input v-model="getstu.FamilyEnvironment" id="t4" type="text" class="form-control" style="display:none;width: 50px;height: 10px" placeholder="其他"></input>
        </el-form-item>
      </template><br>
      <template style="width:200px; height:200px;float:left;">
        <el-form-item label="父母管教方式">
          <input v-model="getstu.FamilyAttitude2Stu" type="radio" name="item8" value="民主" onclick="t5.value='';t5.style.display='none'">民主
          <input v-model="getstu.FamilyAttitude2Stu" type="radio" name="item8" value="权威" onclick="t5.value='';t5.style.display='none'">权威
          <input v-model="getstu.FamilyAttitude2Stu" type="radio" name="item8" value="放任" onclick="t5.value='';t5.style.display='none'">放任
          <input type="radio"  name="item8" value=""  onclick="t5.style.display='inline-block';t5.value=''">其他
          <input v-model="getstu.FamilyAttitude2Stu" id="t5" type="text" class="form-control" style="display:none;width: 50px;height: 10px" placeholder="其他"></input>
        </el-form-item>
      </template><br>
      <el-form-item>
        <table  class="gridtable"  >
          <caption style="font-size:16px"><b>紧急联络人</b></caption>
          <thead >
          <tr >
            <th style="text-align: center;font-size:medium">关系</th>
            <th style="text-align: center;font-size:medium">姓名</th>
            <th style="text-align: center;font-size:medium">出生日期</th>
            <th style="text-align: center;font-size:medium">教育程度</th>
            <th style="text-align: center;font-size:medium">工作单位（职业）</th>
            <th style="text-align: center;font-size:medium">健康状况（健康；患病（病名）；慢性病（病名）；遗传病（病名））</th>
            <th style="text-align: center;font-size:medium">手机</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><el-input v-model="getstu.EmergencyContact1_rela"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact1_name"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact1_birth"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact1_degree"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact1_job"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact1_health"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact1_tel"></el-input></td>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <td><el-input v-model="getstu.EmergencyContact2_rela"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact2_name"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact2_birth"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact2_degree"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact2_job"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact2_health"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact2_tel"></el-input></td>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <td><el-input v-model="getstu.EmergencyContact3_rela"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact3_name"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact3_birth"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact3_degree"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact3_job"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact3_health"></el-input></td>
            <td><el-input v-model="getstu.EmergencyContact3_tel"></el-input></td>
          </tr>
          </tbody>
        </table>
      </el-form-item>
      <template style="width:200px; height:200px;float:left;">
        <el-form-item label="惯用语言">
          <input v-model="getstu.UsualLanguage" type="radio" name="item5" value="普通话" onclick="t2.value='';t2.style.display='none'">普通话
          <input v-model="getstu.UsualLanguage" type="radio" name="item5" value="方言" onclick="t2.value='';t2.style.display='none'">方言
          <input v-model="getstu.UsualLanguage" type="radio" name="item5" value="英语" onclick="t2.value='';t2.style.display='none'">英语
          <input type="radio"  name="item5" value=""  onclick="t2.style.display='inline-block';t2.value=''">其他
          <input v-model="getstu.UsualLanguage" id="t2" type="text" class="form-control" style="display:none;width: 50px;height: 10px" placeholder="其他"></input>
        </el-form-item>
      </template><br>
      <el-divider content-position="center"></el-divider>

    </el-form>
    <el-form :inline="true" align="center">
      <el-button type="danger" v-on:click="updateStuinfo">确认修改</el-button>
      <el-button type="danger" @click.native="go_back()">返回</el-button>
    </el-form>
  </section>

</template>


<script>
    export default {
        name: "CheckNEdit",
        data() {
            return {
                obro_visible:false,
                ybro_visible:false,
                osis_visible:false,
                ysis_visible:false,
                dialogImageUrl: '',
                dialogVisible: false,
                formLabelWidth: '80px',
                limitNum: 1,
                getstu: {
                    name: '',
                    StuID: '',
                    sex: '',
                    Birthday: '',
                    ID: '',
                    Origin: '',
                    PermanentAddress: '',
                    HomeAddress: '',
                    GraduatedSchool_name: '',
                    GraduatedSchool_address: '',
                    LastSchool_name: '',
                    LastSchool_address: '',
                    DisabilityCertificate_issueDate: '',
                    DisabilityCertificate_number: '',
                    DisabilityCertificate_validity: '',
                    Disability_type: [],
                    Disability_level: '',
                    EducationalSetting: [],
                    Class: '',
                    SpecialIllnessOrOthers: [],
                    MainCaregiver: [],
                    ParentsPS: [],
                    ParentsPS_proofMaterials: { },
                    StuResident: '',
                    SojournRela: '',
                    EmergencyContact1_name: '',
                    EmergencyContact1_rela: '',
                    EmergencyContact1_birth: '',
                    EmergencyContact1_degree: '',
                    EmergencyContact1_job: '',
                    EmergencyContact1_health: '',
                    EmergencyContact1_tel:'',
                    EmergencyContact2_name: '',
                    EmergencyContact2_rela: '',
                    EmergencyContact2_birth: '',
                    EmergencyContact2_degree: '',
                    EmergencyContact2_job: '',
                    EmergencyContact2_health: '',
                    EmergencyContact2_tel:'',
                    EmergencyContact3_name: '',
                    EmergencyContact3_rela: '',
                    EmergencyContact3_birth: '',
                    EmergencyContact3_degree: '',
                    EmergencyContact3_job: '',
                    EmergencyContact3_health: '',
                    EmergencyContact3_tel:'',
                    FamilyFinancialSituation: '',
                    ParentsMarriageSituation: '',
                    UsualLanguage: '',
                    ResidentialEnvironment: '',
                    FamilyEnvironment: '',
                    IQ: '',
                    WorkChance1_name: '',
                    WorkChance1_address: '',
                    WorkChance1_tel: '',
                    WorkChance1_jobDescription: '',
                    WorkChance1_transport: '',
                    WorkChance2_name: '',
                    WorkChance2_address: '',
                    WorkChance2_tel: '',
                    WorkChance2_jobDescription: '',
                    WorkChance2_transport: '',
                    WorkChance3_name: '',
                    WorkChance3_address: '',
                    WorkChance3_tel: '',
                    WorkChance3_jobDescription: '',
                    WorkChance3_transport: '',
                    WorkChance4_name: '',
                    WorkChance4_address: '',
                    WorkChance4_tel: '',
                    WorkChance4_jobDescription: '',
                    WorkChance4_transport: '',
                    WorkChance5_name: '',
                    WorkChance5_address: '',
                    WorkChance5_tel: '',
                    WorkChance5_jobDescription: '',
                    WorkChance5_transport: '',
                    FamilyMember: [],
                    FamilyMember_obro:'',
                    FamilyMember_ybro:'',
                    FamilyMember_osis:'',
                    FamilyMember_ysis:'',
                    FamilyMember_livetogether:'',
                    RelProject: [],
                    RelativesPS: '',
                    FamilyAttitude2Stu: '',
                    SleepPattern: '',
                    LivingHabit: '',
                },
                class_options:[],
            }
        },

        mounted:function(){
            this.readStuinfo();
        },

        methods: {
            export2Excel() {
                require.ensure([], () => {
                    const {export_json_to_excel} = require('@/vendor/Export2Excel');
                    const tHeader = ['学生姓名', '学籍号', '性别', '身份证号', '出生日期', '籍贯', '（省、市）户籍地址', '居住地址'];
                    const filterVal = ['Name', 'StuID', 'Sex', 'ID', 'Birthday', 'Origin', 'PermanentAddress', 'HomeAddress'];
                    this.tableData=[];
                    for(var i = 0 ; i < this.$store.state.stuinfo.length ; i++)
                    {
                        this.tableData.push({'Name': this.$store.state.stuinfo[i].Name,
                            'StuID': this.$store.state.stuinfo[i].StuID,
                            'Sex': this.$store.state.stuinfo[i].Sex,
                            'ID': this.$store.state.stuinfo[i].ID,
                            'Birthday': this.$store.state.stuinfo[i].Birthday,
                            'Origin': this.$store.state.stuinfo[i].Origin,
                            'PermanentAddress': this.$store.state.stuinfo[i].PermanentAddress,
                            'HomeAddress': this.$store.state.stuinfo[i].HomeAddress})
                    }
                    const list = this.tableData  // 把data里的tableData存到list
                    const data = this.formatJson(filterVal, list)
                    var s = this.getstu.StuID + this.getstu.name + '基本信息'
                    export_json_to_excel(tHeader, data, s)
                })
            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },


            readStuinfo:function(){
                this.getstu.name=this.$store.state.stuinfo[0].name;
                this.getstu.StuID=this.$store.state.stuinfo[0].student_id;
                this.getstu.sex=this.$store.state.stuinfo[0].Sex;
                this.getstu.Birthday=this.$store.state.stuinfo[0].Birthday;
                this.getstu.ID=this.$store.state.stuinfo[0].IdNum;
                this.getstu.Origin=this.$store.state.stuinfo[0].Origin;
                this.getstu.PermanentAddress=this.$store.state.stuinfo[0].PermanentAddress;
                this.getstu.HomeAddress=this.$store.state.stuinfo[0].HomeAddress;
                this.getstu.GraduatedSchool_name=this.$store.state.stuinfo[0].GraduatedSchool_name;
                this.getstu.GraduatedSchool_address=this.$store.state.stuinfo[0].GraduatedSchool_address;
                this.getstu.LastSchool_name=this.$store.state.stuinfo[0].LastSchool_name;
                this.getstu.LastSchool_address=this.$store.state.stuinfo[0].LastSchool_address;
                this.getstu.DisabilityCertificate_issueDate=this.$store.state.stuinfo[0].DisabilityCertificate_issueDate;
                this.getstu.DisabilityCertificate_number=this.$store.state.stuinfo[0].DisabilityCertificate_number;
                this.getstu.DisabilityCertificate_validity=this.$store.state.stuinfo[0].DisabilityCertificate_validity;
                this.getstu.Disability_type=JSON.parse(this.$store.state.stuinfo[0].Disability_type).残疾类型;
                this.getstu.Disability_level=this.$store.state.stuinfo[0].Disability_level;
                this.getstu.EducationalSetting=JSON.parse(this.$store.state.stuinfo[0].EducationalSetting).教育安置方式;
                this.getstu.Class=this.$store.state.stuinfo[0].class_id;
                this.getstu.SpecialIllnessOrOthers=JSON.parse(this.$store.state.stuinfo[0].SpecialIllnessOrOthers).伴随障碍或疾病;
                this.getstu.MainCaregiver=JSON.parse(this.$store.state.stuinfo[0].MainCaregiver).主要照顾人;
                this.getstu.ParentsPS=JSON.parse(this.$store.state.stuinfo[0].ParentsPS).家长现状;
                // this.getstu.ParentsPS_proofMaterials=this.$store.state.stuinfo[0].ParentsPS_proofMaterials;
                this.getstu.StuResident=this.$store.state.stuinfo[0].StuResident;
                this.getstu.SojournRela=this.$store.state.stuinfo[0].SojournRela;
                this.getstu.EmergencyContact1_name=this.$store.state.stuinfo[0].EmergencyContact1_name;
                this.getstu.EmergencyContact1_rela=this.$store.state.stuinfo[0].EmergencyContact1_rela;
                this.getstu.EmergencyContact1_birth=this.$store.state.stuinfo[0].EmergencyContact1_birth;
                this.getstu.EmergencyContact1_degree=this.$store.state.stuinfo[0].EmergencyContact1_degree;
                this.getstu.EmergencyContact1_job=this.$store.state.stuinfo[0].EmergencyContact1_job;
                this.getstu.EmergencyContact1_health=this.$store.state.stuinfo[0].EmergencyContact1_health;
                this.getstu.EmergencyContact1_tel=this.$store.state.stuinfo[0].EmergencyContact1_tel;
                this.getstu.EmergencyContact2_name=this.$store.state.stuinfo[0].EmergencyContact2_name;
                this.getstu.EmergencyContact2_rela=this.$store.state.stuinfo[0].EmergencyContact2_rela;
                this.getstu.EmergencyContact2_birth=this.$store.state.stuinfo[0].EmergencyContact2_birth;
                this.getstu.EmergencyContact2_degree=this.$store.state.stuinfo[0].EmergencyContact2_degree;
                this.getstu.EmergencyContact2_job=this.$store.state.stuinfo[0].EmergencyContact2_job;
                this.getstu.EmergencyContact2_health=this.$store.state.stuinfo[0].EmergencyContact2_health;
                this.getstu.EmergencyContact2_tel=this.$store.state.stuinfo[0].EmergencyContact2_tel;
                this.getstu.EmergencyContact3_name=this.$store.state.stuinfo[0].EmergencyContact3_name;
                this.getstu.EmergencyContact3_rela=this.$store.state.stuinfo[0].EmergencyContact3_rela;
                this.getstu.EmergencyContact3_birth=this.$store.state.stuinfo[0].EmergencyContact3_birth;
                this.getstu.EmergencyContact3_degree=this.$store.state.stuinfo[0].EmergencyContact3_degree;
                this.getstu.EmergencyContact3_job=this.$store.state.stuinfo[0].EmergencyContact3_job;
                this.getstu.EmergencyContact3_health=this.$store.state.stuinfo[0].EmergencyContact3_health;
                this.getstu.EmergencyContact3_tel=this.$store.state.stuinfo[0].EmergencyContact3_tel;
                this.getstu.FamilyFinancialSituation=this.$store.state.stuinfo[0].FamilyFinancialSituation;
                this.getstu.ParentsMarriageSituation=this.$store.state.stuinfo[0].ParentsMarriageSituation;
                this.getstu.UsualLanguage=this.$store.state.stuinfo[0].UsualLanguage;
                this.getstu.ResidentialEnvironment=this.$store.state.stuinfo[0].ResidentialEnvironment;
                this.getstu.FamilyEnvironment=this.$store.state.stuinfo[0].FamilyEnvironment;
                this.getstu.IQ=this.$store.state.stuinfo[0].IQ;
                this.getstu.WorkChance1_name=this.$store.state.stuinfo[0].WorkChance1_name;
                this.getstu.WorkChance1_address=this.$store.state.stuinfo[0].WorkChance1_address;
                this.getstu.WorkChance1_tel=this.$store.state.stuinfo[0].WorkChance1_tel;
                this.getstu.WorkChance1_jobDescription=this.$store.state.stuinfo[0].WorkChance1_jobDescription;
                this.getstu.WorkChance1_transport=this.$store.state.stuinfo[0].WorkChance1_transport;
                this.getstu.WorkChance2_name=this.$store.state.stuinfo[0].WorkChance2_name;
                this.getstu.WorkChance2_address=this.$store.state.stuinfo[0].WorkChance2_address;
                this.getstu.WorkChance2_tel=this.$store.state.stuinfo[0].WorkChance2_tel;
                this.getstu.WorkChance2_jobDescription=this.$store.state.stuinfo[0].WorkChance2_jobDescription;
                this.getstu.WorkChance2_transport=this.$store.state.stuinfo[0].WorkChance2_transport;
                this.getstu.WorkChance3_name=this.$store.state.stuinfo[0].WorkChance3_name;
                this.getstu.WorkChance3_address=this.$store.state.stuinfo[0].WorkChance3_address;
                this.getstu.WorkChance3_tel=this.$store.state.stuinfo[0].WorkChance3_tel;
                this.getstu.WorkChance3_jobDescription=this.$store.state.stuinfo[0].WorkChance3_jobDescription;
                this.getstu.WorkChance3_transport=this.$store.state.stuinfo[0].WorkChance3_transport;
                this.getstu.WorkChance4_name=this.$store.state.stuinfo[0].WorkChance4_name;
                this.getstu.WorkChance4_address=this.$store.state.stuinfo[0].WorkChance4_address;
                this.getstu.WorkChance4_tel=this.$store.state.stuinfo[0].WorkChance4_tel;
                this.getstu.WorkChance4_jobDescription=this.$store.state.stuinfo[0].WorkChance4_jobDescription;
                this.getstu.WorkChance4_transport=this.$store.state.stuinfo[0].WorkChance4_transport;
                this.getstu.WorkChance5_name=this.$store.state.stuinfo[0].WorkChance5_name;
                this.getstu.WorkChance5_address=this.$store.state.stuinfo[0].WorkChance5_address;
                this.getstu.WorkChance5_tel=this.$store.state.stuinfo[0].WorkChance5_tel;
                this.getstu.WorkChance5_jobDescription=this.$store.state.stuinfo[0].WorkChance5_jobDescription;
                this.getstu.WorkChance5_transport=this.$store.state.stuinfo[0].WorkChance5_transport;
                this.getstu.FamilyMember=JSON.parse(this.$store.state.stuinfo[0].FamilyMember).家庭成员;
                this.getstu.FamilyMember_obro=this.$store.state.stuinfo[0].FamilyMember_obro;
                this.getstu.FamilyMember_ybro=this.$store.state.stuinfo[0].FamilyMember_ybro;
                this.getstu.FamilyMember_osis=this.$store.state.stuinfo[0].FamilyMember_osis;
                this.getstu.FamilyMember_ysis=this.$store.state.stuinfo[0].FamilyMember_ysis;
                this.getstu.FamilyMember_livetogether=this.$store.state.stuinfo[0].FamilyMember_livetogether;
                this.getstu.RelProject=JSON.parse(this.$store.state.stuinfo[0].Relproject).相关专业需求;
                this.getstu.RelativesPS=this.$store.state.stuinfo[0].RelativesPS;
                this.getstu.FamilyAttitude2Stu=this.$store.state.stuinfo[0].FamilyAttitude2Stu;
                this.getstu.SleepPattern=this.$store.state.stuinfo[0].SleepPattern;
                this.getstu.LivingHabit=this.$store.state.stuinfo[0].LivingHabit;

                if (this.getstu.FamilyMember_obro.length != 0)
                    this.obro_visible = true;
                if (this.getstu.FamilyMember_ybro.length != 0)
                    this.ybro_visible = true;
                if (this.getstu.FamilyMember_osis.length != 0)
                    this.osis_visible = true;
                if (this.getstu.FamilyMember_ysis.length != 0)
                    this.ysis_visible = true;
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

            handleBeforeUpload(file){
                console.log('before')
                if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
                    this.$notify.warning({
                        title: '警告',
                        message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
                    })
                }
                let size = file.size / 1024 / 1024 / 2
                if(size > 2) {
                    this.$notify.warning({
                        title: '警告',
                        message: '图片大小必须小于2M'
                    })
                }
            },

            go_back(){
              this.$router.replace({path:'/newContact', query:{currentPage: this.$route.query.currentPage}});
            },

            updateStuinfo() {
                var StuID = this.getstu.StuID;
                var StuClass = this.getstu.Class;
                var Name = this.getstu.name;
                var Sex = this.getstu.sex;
                var Birthday = this.getstu.Birthday;
                var ID = this.getstu.ID;
                var Origin = this.getstu.Origin;
                var PermanentAddress = this.getstu.PermanentAddress;
                var HomeAddress = this.getstu.HomeAddress;
                var GraduatedSchool_name = this.getstu.GraduatedSchool_name;
                var GraduatedSchool_address = this.getstu.GraduatedSchool_address;
                var LastSchool_name = this.getstu.LastSchool_name;
                var LastSchool_address = this.getstu.LastSchool_address;
                var DisabilityCertificate_issueDate = this.getstu.DisabilityCertificate_issueDate;
                var DisabilityCertificate_number = this.getstu.DisabilityCertificate_number;
                var DisabilityCertificate_validity = this.getstu.DisabilityCertificate_validity;
                var Disability_type = {残疾类型:this.getstu.Disability_type};
                var Disability_level = this.getstu.Disability_level;
                var EducationalSetting = {教育安置方式:this.getstu.EducationalSetting};
                var SpecialIllnessOrOthers = {伴随障碍或疾病:this.getstu.SpecialIllnessOrOthers};
                var MainCaregiver = {主要照顾人:this.getstu.MainCaregiver};
                var ParentsPS = {家长现状:this.getstu.ParentsPS};
                // var ParentsPS_proofMaterials = this.getstu.ParentsPS_proofMaterials;
                var RelativesPS = this.getstu.RelativesPS;
                var StuResident = this.getstu.StuResident;
                var SojournRela = this.getstu.SojournRela;
                var EmergencyContact1_name = this.getstu.EmergencyContact1_name;
                var EmergencyContact1_rela = this.getstu.EmergencyContact1_rela;
                var EmergencyContact1_birth = this.getstu.EmergencyContact1_birth;
                var EmergencyContact1_degree = this.getstu.EmergencyContact1_degree;
                var EmergencyContact1_job = this.getstu.EmergencyContact1_job;
                var EmergencyContact1_health = this.getstu.EmergencyContact1_health;
                var EmergencyContact1_tel = this.getstu.EmergencyContact1_tel;
                var EmergencyContact2_name = this.getstu.EmergencyContact2_name;
                var EmergencyContact2_rela = this.getstu.EmergencyContact2_rela;
                var EmergencyContact2_birth = this.getstu.EmergencyContact2_birth;
                var EmergencyContact2_degree = this.getstu.EmergencyContact2_degree;
                var EmergencyContact2_job = this.getstu.EmergencyContact2_job;
                var EmergencyContact2_health = this.getstu.EmergencyContact2_health;
                var EmergencyContact2_tel = this.getstu.EmergencyContact2_tel;
                var EmergencyContact3_name = this.getstu.EmergencyContact3_name;
                var EmergencyContact3_rela = this.getstu.EmergencyContact3_rela;
                var EmergencyContact3_birth = this.getstu.EmergencyContact3_birth;
                var EmergencyContact3_degree = this.getstu.EmergencyContact3_degree;
                var EmergencyContact3_job = this.getstu.EmergencyContact3_job;
                var EmergencyContact3_health = this.getstu.EmergencyContact3_health;
                var EmergencyContact3_tel = this.getstu.EmergencyContact3_tel;
                var FamilyFinancialSituation = this.getstu.FamilyFinancialSituation;
                var ParentsMarriageSituation = this.getstu.ParentsMarriageSituation;
                var UsualLanguage = this.getstu.UsualLanguage;
                var ResidentialEnvironment = this.getstu.ResidentialEnvironment;
                var FamilyEnvironment = this.getstu.FamilyEnvironment;
                var FamilyAttitude2Stu = this.getstu.FamilyAttitude2Stu;
                var SleepPattern = this.getstu.SleepPattern;
                var LivingHabit = this.getstu.LivingHabit;
                var IQ = this.getstu.IQ;
                var FamilyMember = {家庭成员:this.getstu.FamilyMember};
                var FamilyMember_obro = this.getstu.FamilyMember_obro;
                var FamilyMember_ybro = this.getstu.FamilyMember_ybro;
                var FamilyMember_osis = this.getstu.FamilyMember_osis;
                var FamilyMember_ysis = this.getstu.FamilyMember_ysis;
                var FamilyMember_livetogether = this.getstu.FamilyMember_livetogether;
                var WorkChance1_name =this.getstu.WorkChance1_name;
                var WorkChance1_address = this.getstu.WorkChance1_address;
                var WorkChance1_tel = this.getstu.WorkChance1_tel;
                var WorkChance1_jobDescription = this.getstu.WorkChance1_jobDescription;
                var WorkChance1_transport = this.getstu.WorkChance1_transport;
                var WorkChance2_name =this.getstu.WorkChance2_name;
                var WorkChance2_address = this.getstu.WorkChance2_address;
                var WorkChance2_tel = this.getstu.WorkChance2_tel;
                var WorkChance2_jobDescription = this.getstu.WorkChance2_jobDescription;
                var WorkChance2_transport = this.getstu.WorkChance2_transport;
                var WorkChance3_name =this.getstu.WorkChance3_name;
                var WorkChance3_address = this.getstu.WorkChance3_address;
                var WorkChance3_tel = this.getstu.WorkChance3_tel;
                var WorkChance3_jobDescription = this.getstu.WorkChance3_jobDescription;
                var WorkChance3_transport = this.getstu.WorkChance3_transport;
                var WorkChance4_name =this.getstu.WorkChance4_name;
                var WorkChance4_address = this.getstu.WorkChance4_address;
                var WorkChance4_tel = this.getstu.WorkChance4_tel;
                var WorkChance4_jobDescription = this.getstu.WorkChance4_jobDescription;
                var WorkChance4_transport = this.getstu.WorkChance4_transport;
                var WorkChance5_name =this.getstu.WorkChance5_name;
                var WorkChance5_address = this.getstu.WorkChance5_address;
                var WorkChance5_tel = this.getstu.WorkChance5_tel;
                var WorkChance5_jobDescription = this.getstu.WorkChance5_jobDescription;
                var WorkChance5_transport = this.getstu.WorkChance5_transport;
                var RelProject = {相关专业需求:this.getstu.RelProject};
                this.$http.post('/api/stu/upStu',{
                    sStuID:StuID,
                    sClass:StuClass,
                    sName:Name,
                    sSex:Sex,
                    sBirthday:Birthday,
                    sID:ID,
                    sOrigin:Origin,
                    sPermanentAddress:PermanentAddress,
                    sHomeAddress:HomeAddress,
                    sGraduatedSchool_name:GraduatedSchool_name,
                    sGraduatedSchool_address:GraduatedSchool_address,
                    sLastSchool_name:LastSchool_name,
                    sLastSchool_address:LastSchool_address,
                    sDisabilityCertificate_issueDate:DisabilityCertificate_issueDate,
                    sDisabilityCertificate_number:DisabilityCertificate_number,
                    sDisabilityCertificate_validity:DisabilityCertificate_validity,
                    sDisability_type:Disability_type,
                    sDisability_level:Disability_level,
                    sEducationalSetting:EducationalSetting,
                    sSpecialIllnessOrOthers:SpecialIllnessOrOthers,
                    sMainCaregiver:MainCaregiver,
                    sParentsPS:ParentsPS,
                    // sParentsPS_proofMaterials:ParentsPS_proofMaterials,
                    sRelativesPS:RelativesPS,
                    sStuResident:StuResident,
                    sSojournRela:SojournRela,
                    sEmergencyContact1_name:EmergencyContact1_name,
                    sEmergencyContact1_rela:EmergencyContact1_rela,
                    sEmergencyContact1_birth:EmergencyContact1_birth,
                    sEmergencyContact1_degree:EmergencyContact1_degree,
                    sEmergencyContact1_job:EmergencyContact1_job,
                    sEmergencyContact1_health:EmergencyContact1_health,
                    sEmergencyContact1_tel:EmergencyContact1_tel,
                    sEmergencyContact2_name:EmergencyContact2_name,
                    sEmergencyContact2_rela:EmergencyContact2_rela,
                    sEmergencyContact2_birth:EmergencyContact2_birth,
                    sEmergencyContact2_degree:EmergencyContact2_degree,
                    sEmergencyContact2_job:EmergencyContact2_job,
                    sEmergencyContact2_health:EmergencyContact2_health,
                    sEmergencyContact2_tel:EmergencyContact2_tel,
                    sEmergencyContact3_name:EmergencyContact3_name,
                    sEmergencyContact3_rela:EmergencyContact3_rela,
                    sEmergencyContact3_birth:EmergencyContact3_birth,
                    sEmergencyContact3_degree:EmergencyContact3_degree,
                    sEmergencyContact3_job:EmergencyContact3_job,
                    sEmergencyContact3_health:EmergencyContact3_health,
                    sEmergencyContact3_tel:EmergencyContact3_tel,
                    sFamilyFinancialSituation:FamilyFinancialSituation,
                    sParentsMarriageSituation:ParentsMarriageSituation,
                    sUsualLanguage:UsualLanguage,
                    sResidentialEnvironment:ResidentialEnvironment,
                    sFamilyEnvironment:FamilyEnvironment,
                    sFamilyAttitude2Stu:FamilyAttitude2Stu,
                    sSleepPattern:SleepPattern,
                    sLivingHabit:LivingHabit,
                    sIQ:IQ,
                    sFamilyMember:FamilyMember,
                    sFamilyMember_obro:FamilyMember_obro,
                    sFamilyMember_ybro:FamilyMember_ybro,
                    sFamilyMember_osis:FamilyMember_osis,
                    sFamilyMember_ysis:FamilyMember_ysis,
                    sFamilyMember_livetogether:FamilyMember_livetogether,
                    sWorkChance1_name:WorkChance1_name,
                    sWorkChance1_address:WorkChance1_address,
                    sWorkChance1_tel:WorkChance1_tel,
                    sWorkChance1_jobDescription:WorkChance1_jobDescription,
                    sWorkChance1_transport:WorkChance1_transport,
                    sWorkChance2_name:WorkChance2_name,
                    sWorkChance2_address:WorkChance2_address,
                    sWorkChance2_tel:WorkChance2_tel,
                    sWorkChance2_jobDescription:WorkChance2_jobDescription,
                    sWorkChance2_transport:WorkChance2_transport,
                    sWorkChance3_name:WorkChance3_name,
                    sWorkChance3_address:WorkChance3_address,
                    sWorkChance3_tel:WorkChance3_tel,
                    sWorkChance3_jobDescription:WorkChance3_jobDescription,
                    sWorkChance3_transport:WorkChance3_transport,
                    sWorkChance4_name:WorkChance4_name,
                    sWorkChance4_address:WorkChance4_address,
                    sWorkChance4_tel:WorkChance4_tel,
                    sWorkChance4_jobDescription:WorkChance4_jobDescription,
                    sWorkChance4_transport:WorkChance4_transport,
                    sWorkChance5_name:WorkChance5_name,
                    sWorkChance5_address:WorkChance5_address,
                    sWorkChance5_tel:WorkChance5_tel,
                    sWorkChance5_jobDescription:WorkChance5_jobDescription,
                    sWorkChance5_transport:WorkChance5_transport,
                    sRelProject:RelProject,
                    ssid:this.$store.state.stuinfo[0].id,
                },{}).then((response)=>{
                    console.log(response);
                });
                console.log('submit!');
                this.$http.post('/api/stu/queStuNNS',{
                },{}).then((response) => {
                    this.$store.dispatch("setstuNNS", response.bodyText);
                    console.log(this.$store.state.stuNNS);
                    this.$router.replace({path:'/newContact', query:{currentPage: this.$route.query.currentPage}})
                });
            },


            // 文件超出个数限制时的钩子
            handleExceed(files, fileList) {

            },
            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 点击文件列表中已上传的文件时的钩子
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                console.log(file.url);
            },
            uploadFile() {
                this.$refs.upload.submit()
            },

            changeFMVisible(f){
                switch (f) {
                    case 0:
                        this.obro_visible = !this.obro_visible;
                        this.getstu.FamilyMember_obro = '';
                        break;
                    case 1:
                        this.ybro_visible = !this.ybro_visible;
                        this.getstu.FamilyMember_ybro = '';
                        break;
                    case 2:
                        this.osis_visible = !this.osis_visible;
                        this.getstu.FamilyMember_osis = '';
                        break;
                    case 3:
                        this.ysis_visible = !this.ysis_visible;
                        this.getstu.FamilyMember_ysis = '';
                        break;
                    default:
                        break;
                }
            },
        }
    }

</script>

<style type="text/css">
  table.gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
  }
  table.gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
  }
  table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
  }
  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  }
  .form-control:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
  }
  .form-control::-moz-placeholder {
    color: #999;
    opacity: 1;
  }
  .form-control:-ms-input-placeholder {
    color: #999;
  }
  .form-control::-webkit-input-placeholder {
    color: #999;
  }
  .form-control::-ms-expand {
    background-color: transparent;
    border: 0;
  }
  .form-control[disabled],
  .form-control[readonly],
  fieldset[disabled] .form-control {
    background-color: #eeeeee;
    opacity: 1;
  }
  .form-control[disabled],
  fieldset[disabled] .form-control {
    cursor: not-allowed;
  }
</style>
