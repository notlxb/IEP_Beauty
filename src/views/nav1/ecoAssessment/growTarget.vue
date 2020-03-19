<template>
  <section id="t1">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newContact', query:{currentPage:this.$route.query.currentPage} }">生态评量</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">学生信息</el-breadcrumb-item>
      <el-breadcrumb-item>医学诊断</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/devTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">家庭基础信息（家长自评）</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/funcTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">专项评估</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="center"></el-divider>

    <el-card style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)">
      <div slot="header" class="cardTitle" align="center">
              <span>
                诊断证书
              </span><i class="header-icon el-icon-info"></i>
      </div>
      <vue-ckeditor type="classic" :editors="editors1" v-model="ZDZS" :config='config'></vue-ckeditor>
    </el-card>

    <br/>

    <el-card style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)">
      <div slot="header" class="cardTitle" align="center">
              <span>
                残疾证
              </span><i class="header-icon el-icon-info"></i>
      </div>
      <vue-ckeditor type="classic" :editors="editors1" v-model="CJZ" :config='config'></vue-ckeditor>
    </el-card>

    <el-divider content-position="center"></el-divider>
    <el-form align="center">
      <el-button type="danger" @click="submitForm()">提交</el-button>
      <el-button type="danger" @click.native="go_back()">返回</el-button>
    </el-form>
  </section>
</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'
    export default {
        name: "grow_target",
        components: {'vue-ckeditor': VueCkeditor.component},
        data() {
            return{
                ATI:{},
                ZDZS:'',
                CJZ:'',
                data1:'',
                data2:'',
                data3:[],
                formData: {
                    domains: [],
                },

                relevanceID:{},



                editors1: {
                    classic: ClassicEditor,
                },
                config:{
                    language:'zh-cn',
                    placeholder:'点击此处编辑',
                    ckfinder: {
                        uploadUrl: '/api/stu/picture_ZhenDuan'
                    },
                },
            };
        },

        mounted(){
            this.ATI = JSON.parse(this.$store.state.stuinfo[0].AllTargetInfo);
            this.ZDZS = JSON.parse(this.$store.state.stuinfo[0].MedicalDiagnosis).诊断证书;
            this.CJZ = JSON.parse(this.$store.state.stuinfo[0].MedicalDiagnosis).残疾证;
            // this.addDomain1();
            console.log(this.MedicalDiagnosis)
        },

        methods: {
            // bianli:function() {
            //   var i = parseInt(this.data1); //将string类型的data1转成int型，并赋值给i
            //
            //   if(!this.$store.state.schooltables[i].showType) //检查下标为i的schooltable[i]是否为空
            //   {
            //     var s = this.$store.state.schooltables[i].childrenID;  //将schooltables[i]的childrenID字符串赋值给s
            //     var shuzu=[];     //用来存放childrenID中的数
            //     var str1 = s.substring(1,s.length-1); //截取字符串s,例如s的内容为[1,2,3],截取s使得str1为1,2,3
            //     shuzu = str1.split(",");   //以","为界，将str1转变为数组，并赋值给str2
            //
            //     console.log(shuzu);
            //     for (var j = 0; j < shuzu.length ; j++)
            //     {
            //       var c = parseInt(shuzu[j]); //将字符串转为Int型
            //       if (this.$store.state.schooltables[c-1].showType == 'text')
            //       {
            //         this.data3.push(this.$store.state.schooltables[c-1].describeDataForm); //将describeDataForm赋值给data3数组
            //         this.formData.domains.push({
            //           value: this.MedicalDiagnosis[this.$store.state.schooltables[c-1].describeDataForm].description,
            //           key: this.$store.state.schooltables[c-1].describeDataForm,
            //           age: this.MedicalDiagnosis[this.$store.state.schooltables[c-1].describeDataForm].age
            //         });
            //         if(JSON.parse(this.$store.state.schooltables[c-1].relevanceID).length > 0){
            //           this.relevanceID[this.$store.state.schooltables[c-1].describeDataForm] = this.$store.state.schooltables[c-1].relevanceID;
            //         }
            //       }
            //       else
            //       {
            //         this.data1 = c-1;
            //         //console.log(data1)
            //         this.bianli();
            //       }
            //     }
            //   }
            //   else //如果下标为i的schooltable[i]不为空，则生成text文本框
            //   {
            //     this.data3.push(this.$store.state.schooltables[i].describeDataForm)//将describeDataForm赋值给data3数组
            //     this.formData.domains.push({
            //       value: this.MedicalDiagnosis[this.$store.state.schooltables[i].describeDataForm].description,
            //       key: this.$store.state.schooltables[i].describeDataForm,
            //       age: this.MedicalDiagnosis[this.$store.state.schooltables[i].describeDataForm].age
            //     });
            //     if(JSON.parse(this.$store.state.schooltables[i].relevanceID).length > 0){
            //       this.relevanceID[this.$store.state.schooltables[i].describeDataForm] = this.$store.state.schooltables[i].relevanceID;
            //     }
            //   }
            // },
            //
            // /*增加表单项*/
            // addDomain1(){
            //
            //   for(var i = 0;i < this.$store.state.schooltables.length; i++)
            //   {
            //     if(this.$store.state.schooltables[i].describeDataForm == '医学诊断') //查找对应的describeDataForm
            //     {
            //       this.data1=i;     //将查找到的下标i赋值给变量data1
            //       this.bianli();    //执行遍历函数
            //     }
            //   }
            // },









          go_back(){
            this.$router.replace({path:'/checkNEdit', query:{currentPage: this.$route.query.currentPage}});
          },

            /*提交表单*/
            submitForm(formName) {
                // for (var i = 0; i < this.formData.domains.length; i++){
                //   this.MedicalDiagnosis[this.formData.domains[i].key].description = this.formData.domains[i].value;
                //   this.ATI[this.formData.domains[i].key].description = this.formData.domains[i].value;
                // }
                var MD = {诊断证书:this.ZDZS, 残疾证:this.CJZ};
                this.$http.post('/api/stu/MDini',{
                    MD:MD,
                    MDID:this.$store.state.stuinfo[0].student_id
                },{}).then((response) => {});
                this.$http.post('/api/stu/ATIini',{
                    ATI:this.ATI,
                    ATIID:this.$store.state.stuinfo[0].student_id
                },{}).then((response) => {});
                console.log(this.MedicalDiagnosis);


                this.$http.post('/api/stu/queryStuinfo',{
                    AStuID:this.$store.state.stuinfo[0].student_id
                },{}).then((response) => {
                    this.$store.dispatch("setstuinfo", response.bodyText);
                    this.$router.replace({path:'/checkNEdit', query:{currentPage: this.$route.query.currentPage}})
                });
            },

















            // open1(key) {
            //   for (var i in this.relevanceID){
            //     if (key == i){
            //       var s = "";
            //       for (var j = 0; j < JSON.parse(this.relevanceID[i]).length; j++){
            //         var describeDataForm = this.$store.state.schooltables[JSON.parse(this.relevanceID[i])[j]-1].describeDataForm;
            //         s += '<strong><i>'+describeDataForm +':'+'</i></strong>'+'<br/>';
            //         s += JSON.parse(this.$store.state.stuinfo[0].AllTargetInfo)[describeDataForm].description+'<br/>';
            //       }
            //       this.$notify({
            //         title: '关联信息',
            //         duration: 0,
            //         showClose: false,
            //         dangerouslyUseHTMLString: true,
            //         message: s,
            //       });
            //     }
            //   }
            // },
            // close1(){
            //   this.$notify.closeAll();
            // }

        }
    }
</script>

<style scoped>
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
  .gcs-checkbox {
    display: none;
  }
  .gcs-checkbox+label {
    background-color: white;
    border-radius: 0px;
    border: 1px solid #d3d3d3;
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    vertical-align: bottom;
    line-height: 20px;
  }
  .gcs-checkbox+label:hover {
    cursor: pointer;
    border: 1px solid #2783FB;
  }
  .gcs-checkbox:checked+label {
    background-color: #eee;
    background: #2783FB;
  }
  .gcs-checkbox:checked+label:after {
    content: "\2714";
    color: white;
  }
  /*单选按钮*/
  .gcs-radio {
    display: none;
  }
  .gcs-radio+label {
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    text-align: center;
    vertical-align: bottom;
    border: 1px solid gray;
    border-radius: 50%;
  }
  .gcs-radio+label:hover {
    border: 1px solid #2783FB;
    cursor: pointer;
  }
  .gcs-radio:checked+label {
    background: #2783FB;
    border: 1px solid #2783FB;
  }
  .gcs-radio:checked+label:after {
    content: "\2022";
    font-size: 35px;
    color: white;
  }
  .form-dynamic{
    width: 650px;
    background: #fff;
    padding: 20px;
    padding-top: 40px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-align: left;
  }
  .el-input{
    width: 95%;
  }
  .remove-item{
    color: red;
  }
  .submit-btn{
    text-align: center;
    margin-left: -60px;
  }
  .el-form{
    color: #333;
    margin-outside: 0px;
    margin: 0;
  }
  .certificate-upload{
    margin-bottom: 2%;
  }
  .cardTitle{
    align-self: center;
    font-weight: bold;
    font-size: large;
    font-family: 楷体;
    color: #000000;
    letter-spacing: 3px;
  }
</style>
