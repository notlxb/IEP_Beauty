<template>
  <section id="t3">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newContact', query:{currentPage:this.$route.query.currentPage} }">生态评量</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">学生信息</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/devTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">家长自评</el-breadcrumb-item>
      <el-breadcrumb-item>专项评估</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="center"></el-divider>
    <el-form :model="formData3" ref="formData3" label-width="200px" class="form-dynamic">
      <el-form-item v-for="(domain, index) in formData3.domains3"
                    :label="data33[index]"
                    :key="domain.key"
                    :prop="'domains3.' + index + '.value'">
        <!--        <el-input  @focus="open3(domain.key)" @focusout.native="close3()" v-model="domain.value"></el-input>-->
        <!--        <el-input placeholder="请输入内容" @focus="open3(domain.key)" @focusout.native="close3()" v-model="domain.value"></el-input>-->
        <vue-ckeditor :readonly="disabled" type="classic" @focus.native="open3(domain.key)" v-model="domain.value" :editors="editors1" :config='config'></vue-ckeditor>
        <el-input placeholder="请输对应年龄(0至18岁)" @focus="open3(domain.key)" v-model="domain.age">
          <template slot="prepend">对应年龄</template>
          <template slot="append">岁</template>
        </el-input>

        <!--        <a class="remove-item" v-show="formData3.domains3.length>1" @click.prevent="removeDomain3(domain)"><i class="el-icon-close"></i></a>-->
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button type="danger" :disabled="disabled" @click="submitForm3">提交</el-button>
        <el-button type="danger" @click.native="go_back()">返回</el-button>
        <el-button type="danger" @click="drawChart">雷达图</el-button>
        <!--        <el-button @click="addDomain31">新增一项</el-button>-->
      </el-form-item>
    </el-form>

    <el-dialog title="雷达图" :visible.sync="dialogVisible" center width="50%">
      <div style="margin-top: 56%">
        <radar-chart ref="items" class="radar"></radar-chart>
      </div>

    </el-dialog>


  </section>

</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'
    import RadarChart from '../../../components/tools/echarts/radar-chart'
    export default {
        components: {RadarChart,
            'vue-ckeditor': VueCkeditor.component},
        name: "function_target",
        data(){
            return{
              editPermission:localStorage.getItem('Permission')[10],

                Evaluation:{},
                ATI:{},

                data31:'',
                data32:'',
                data33:[],
                formData3: {
                    domains3: [],
                },

                relevanceID:{},

                chartItems:[],

                dialogVisible: false,



                editors1: {
                    classic: ClassicEditor,
                },
                config:{
                    language:'zh-cn',
                    placeholder:'点击此处编辑',
                    ckfinder: {
                        uploadUrl: '/api/stu/picture_ZhuanXiang'
                    },
                },

              disabled: false,
            };
        },
        mounted(){
            if (this.editPermission != 1 || this.$route.query.isEdit == 2)
              this.disabled = true;
            this.ATI = JSON.parse(this.$store.state.stuinfo[0].AllTargetInfo);
            this.Evaluation = JSON.parse(this.$store.state.stuinfo[0].Evaluation);
            this.addDomain31();
            console.log(this.formData3.domains3[1].value)
        },
        methods:{
            bianli3:function() {
                var i = parseInt(this.data31); //将string类型的data31转成int型，并赋值给i


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
                    console.log(shuzu);
                    for (var j = 0; j < shuzu.length ; j++)
                    {

                        var c = shuzu[j]; //将字符串转为Int型
                        if (this.$store.state.schooltables[c].target_show_type == 'text')
                        {
                            this.data33.push(this.$store.state.schooltables[c].target_description); //将describeDataForm赋值给data33数组
                            this.formData3.domains3.push({
                                // value:'',
                                value: this.Evaluation[this.$store.state.schooltables[c].target_description].description,
                                key:this.$store.state.schooltables[c].target_description,
                                age:this.Evaluation[this.$store.state.schooltables[c].target_description].age
                            });
                            this.chartItems.push({
                                name:this.$store.state.schooltables[c].target_description,
                                value:this.Evaluation[this.$store.state.schooltables[c].target_description].age,
                                max:'18'
                            });
                            if(JSON.parse(this.$store.state.schooltables[c].target_relevance).length > 0){
                                this.relevanceID[this.$store.state.schooltables[c].target_description] = this.$store.state.schooltables[c].target_relevance;
                            }
                        }
                        else
                        {
                            this.data31 = c;
                            this.bianli3();
                        }
                    }
                }
                else //如果下标为i的schooltable[i]不为空，则生成text文本框
                {
                    this.data33.push(this.$store.state.schooltables[i].target_description)//将describeDataForm赋值给data33数组
                    this.formData3.domains3.push({
                        // value:''
                        value: this.Evaluation[this.$store.state.schooltables[i].target_description].description,
                        key:this.$store.state.schooltables[i].target_description,
                        age:this.Evaluation[this.$store.state.schooltables[i].target_description].age
                    });
                    this.chartItems.push({
                        name: this.$store.state.schooltables[i].target_description,
                        value: this.Evaluation[this.$store.state.schooltables[i].target_description].age,
                        max:'18'
                    });
                    if(JSON.parse(this.$store.state.schooltables[i].target_relevance).length > 0){
                        this.relevanceID[this.$store.state.schooltables[i].target_description] = this.$store.state.schooltables[i].target_relevance;
                    }
                }
            },

            /*增加表单项*/
            addDomain31(){
                for(let i = 0;i < this.$store.state.schooltables.length; i++)
                {
                    if(this.$store.state.schooltables[i].target_description == '专项评估') //查找对应的Id
                    {
                        this.data31=i;     //将查找到的下标i赋值给变量data31
                        this.bianli3();    //执行遍历函数
                    }
                }
            },

          go_back(){
            this.$router.replace({path:'/checkNEdit', query:{currentPage: this.$route.query.currentPage}});
          },

            /*提交保存*/
            submitForm3() {
                for (var i = 0; i < this.formData3.domains3.length; i++){
                    this.Evaluation[this.formData3.domains3[i].key].description = this.formData3.domains3[i].value;
                    this.ATI[this.formData3.domains3[i].key].description = this.formData3.domains3[i].value;
                    this.Evaluation[this.formData3.domains3[i].key].age = this.formData3.domains3[i].age;
                    this.ATI[this.formData3.domains3[i].key].age = this.formData3.domains3[i].age;
                }
                this.$http.post('/api/stu/Eini',{
                    E:this.Evaluation,
                    EID:this.$store.state.stuinfo[0].student_id
                },{}).then((response) => {});
                this.$http.post('/api/stu/ATIini',{
                    ATI:this.ATI,
                    ATIID:this.$store.state.stuinfo[0].student_id
                },{}).then((response) => {});
                console.log(JSON.parse(this.$store.state.stuinfo[0].AllTargetInfo));


                this.$http.post('/api/stu/queryStuinfo',{
                    AStuID:this.$store.state.stuinfo[0].student_id
                },{}).then((response) => {
                    this.$store.dispatch("setstuinfo", response.bodyText);
                    this.$router.replace({path:'/checkNEdit', query:{currentPage: this.$route.query.currentPage}})
                });
            },

            //显示关联项信息
            open3:function(key) {
                this.$notify.closeAll();
                for (var i in this.relevanceID){
                    if (key == i){
                        var s = "";
                        for (var j = 0; j < JSON.parse(this.relevanceID[i]).length; j++){
                            var describeDataForm = this.$store.state.schooltables[JSON.parse(this.relevanceID[i])[j]-1].describeDataForm;
                            s += '<strong><i>'+describeDataForm +':'+'</i></strong>'+'<br/>';
                            s += JSON.parse(this.$store.state.stuinfo[0].AllTargetInfo)[describeDataForm].description+'<br/>'+'对应年龄:'+JSON.parse(this.$store.state.stuinfo[0].AllTargetInfo)[describeDataForm].age+'岁<br/>';
                        }
                        this.$notify({
                            title: '关联信息',
                            duration: 0,
                            showClose: true,
                            dangerouslyUseHTMLString: true,
                            message: s,
                        });
                    }
                }
            },
            close3(){
                this.$notify.closeAll();
            },


            drawChart(){
                this.dialogVisible = true;
                this.$nextTick(function () {
                    this.$refs.items.drawRadar(this.chartItems);
                });
            },
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
    margin: 0px;
  }
  .radar{
    margin-top: 6%;
    margin-left: 7%;
  }
</style>
