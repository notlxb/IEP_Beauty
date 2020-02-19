<template>
  <section id="t2">

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newContact' }">生态评量</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit', query:{isEdit:this.$route.query.isEdit},}">学生信息</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/growTarget', query:{isEdit:this.$route.query.isEdit},}">医学诊断</el-breadcrumb-item>
      <el-breadcrumb-item>家庭基础信息（家长自评）</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/checkNEdit/funcTarget', query:{isEdit:this.$route.query.isEdit},}">专项评估</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="center"></el-divider>
    <el-form :model="formData2" ref="formData2" label-width="200px" class="form-dynamic">
      <el-form-item v-for="(domain, index) in formData2.domains2"
                    :label="data23[index]"
                    :key="domain.key"
                    :prop="'domains2.' + index + '.value'">
        <el-input @focus="open2(domain.key)" @focusout.native="close2()" v-model="domain.value"></el-input>
        <a class="remove-item" v-show="formData2.domains2.length>1" @click.prevent="removeDomain2(domain)"></a>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button type="danger" @click="submitForm2()">提交</el-button>
      </el-form-item>
    </el-form>

  </section>
</template>

<script>
    export default {
        name: "develop_target",
        data() {
            return{
                ATI:{},
                HomeBasicInfo:{},
                data21:'',
                data22:'',
                data23:[],
                formData2: {
                    domains2: [],
                },

                relevanceID: {},
            };
        },

        mounted(){
            this.ATI = JSON.parse(this.$store.state.stuinfo[0].AllTargetInfo);
            this.HomeBasicInfo = JSON.parse(this.$store.state.stuinfo[0].HomeBasicInfo);
            this.addDomain21();
            console.log(this.formData2.domains2);
        },
        methods: {
            bianli2: function () {
                var i = parseInt(this.data21); //将string类型的data21转成int型，并赋值给i

                if (!this.$store.state.schooltables[i].target_show_type) //检查下标为i的schooltable[i]是否为空
                {
                    var s = this.$store.state.schooltables[i].target_children;  //将schooltables[i]的target_children字符串赋值给s
                    var shuzu = [];     //用来存放childrenID中的数
                    var str1 = s.substring(1, s.length - 1); //截取字符串s,例如s的内容为[1,2,3],截取s使得str1为1,2,3
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
                    for (var j = 0; j < shuzu.length; j++) {
                        var c = parseInt(shuzu[j]); //将字符串转为Int型
                        if (this.$store.state.schooltables[c].target_show_type == 'text') {
                            this.data23.push(this.$store.state.schooltables[c].target_description); //将target_description赋值给data23数组
                            this.formData2.domains2.push({
                                value: this.HomeBasicInfo[this.$store.state.schooltables[c].target_description].description,
                                key: this.$store.state.schooltables[c].target_description,
                                age: this.HomeBasicInfo[this.$store.state.schooltables[c].target_description].age
                            });
                            if (JSON.parse(this.$store.state.schooltables[c].target_relevance).length > 0) {
                                this.relevanceID[this.$store.state.schooltables[c].target_description] = this.$store.state.schooltables[c].target_relevance;
                            }
                        } else {
                            this.data21 = c;
                            this.bianli2();
                        }
                    }
                } else //如果下标为i的schooltable[i]不为空，则生成text文本框
                {
                    this.data23.push(this.$store.state.schooltables[i].target_description)//将target_description赋值给data23数组
                    this.formData2.domains2.push({
                        value: this.HomeBasicInfo[this.$store.state.schooltables[i].target_description].description,
                        key: this.$store.state.schooltables[i].target_description,
                        age: this.HomeBasicInfo[this.$store.state.schooltables[i].target_description].age
                    });
                    if (JSON.parse(this.$store.state.schooltables[i].target_relevance).length > 0) {
                        this.relevanceID[this.$store.state.schooltables[i].target_description] = this.$store.state.schooltables[i].target_relevance;
                    }
                }
            },
            /*增加表单项*/

            addDomain21() {
                for (var i = 0; i < this.$store.state.schooltables.length; i++) {
                    if (this.$store.state.schooltables[i].target_description == '家庭基础信息（家长自评）') //查找对应的Id
                    {
                        this.data21 = i;     //将查找到的下标i赋值给变量data21
                        this.bianli2();    //执行遍历函数
                    }
                }
            },


            /*提交表单*/
            submitForm2() {
                for (var i = 0; i < this.formData2.domains2.length; i++) {
                    this.HomeBasicInfo[this.formData2.domains2[i].key].description = this.formData2.domains2[i].value;
                    this.ATI[this.formData2.domains2[i].key].description = this.formData2.domains2[i].value;
                }
                this.$http.post('/api/stu/HBIini', {
                    HBI: this.HomeBasicInfo,
                    HBIID: this.$store.state.stuinfo[0].student_id
                }, {}).then((response) => {
                });
                this.$http.post('/api/stu/ATIini', {
                    ATI: this.ATI,
                    ATIID: this.$store.state.stuinfo[0].student_id
                }, {}).then((response) => {
                });
                console.log(this.HomeBasicInfo);

                this.$http.post('/api/stu/queryStuinfo', {
                    AStuID: this.$store.state.stuinfo[0].student_id
                }, {}).then((response) => {
                    this.$store.dispatch("setstuinfo", response.bodyText);
                    this.$router.replace({path: '/checkNEdit'})
                });
            },


            open2(key) {
                for (var i in this.relevanceID) {
                    if (key == i) {
                        var s = "";
                        for (var j = 0; j < JSON.parse(this.relevanceID[i]).length; j++) {
                            var target_description = this.$store.state.schooltables[JSON.parse(this.relevanceID[i])[j] - 1].target_description;
                            s += '<strong><i>' + target_description + ':' + '</i></strong>' + '<br/>';
                            s += JSON.parse(this.$store.state.stuinfo[0].AllTargetInfo)[target_description].description + '<br/>';
                        }
                        this.$notify({
                            title: '关联信息',
                            duration: 0,
                            showClose: false,
                            dangerouslyUseHTMLString: true,
                            message: s,
                        });
                    }
                }
            },
            close2() {
                this.$notify.closeAll();
            }
        }
    }
</script>

<style scoped>
  table.gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-width: 1px;
    border-collapse: collapse;
  }
  table.gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
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
</style>
