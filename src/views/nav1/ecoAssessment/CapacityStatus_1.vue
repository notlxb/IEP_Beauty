<template>
    <section>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/newContact', query:{currentPage:this.$route.query.currentPage} }">生态评量</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage },}">学生信息</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/devTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">家长自评</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/funcTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">专项评估</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[0] == 'true' " :to="{path:'/checkNEdit/materprehis'}">母亲孕史</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[1] == 'true' " :to="{path:'/checkNEdit/stuInterest'}">兴趣爱好</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[2] == 'true' " :to="{path:'/checkNEdit/healthstatus'}">健康状况</el-breadcrumb-item>
            <el-breadcrumb-item>能力现状-1</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[4] == 'true' " :to="{path:'/checkNEdit/capacitystatus_2'}">能力现状-2</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider content-position="center"></el-divider>
        <el-form :inline="true" align="left" ref="form" :model="getstu">
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="一、认知">
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="认识身体部位"/></label>认识身体部位<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="回认识家人"/></label>回认识家人<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="认识邻居"/></label>认识邻居<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="认识老师"/></label>认识老师<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="认识同学"/></label>认识同学<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="认识家中环境"/></label>认识家中环境<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="认识住家社区环境"/></label>认识住家社区环境<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="认识校内环境"/></label>认识校内环境<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="认识学校社区环境"/></label>认识学校社区环境<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="能指认常见物品"/></label>能指认常见物品<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="知道物品功能"/></label>知道物品功能<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="能依相同属性分类"/></label>能依相同属性分类<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="能区辨物品相异处"/></label>能区辨物品相异处<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="专注力够，不易分"/></label>专注力够，不易分心<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="注意力短暂"/></label>注意力短暂<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="注意力涣散"/></label>注意力涣散<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="注意力固着"/></label>注意力固着<br>
                    <label><input type="checkbox" v-model="getstu.Cognition"  name="item1"  value="注意力缺乏"/></label>注意力缺乏<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.CognitionOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="二、沟通">
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="口腔动作">
                    <label><input type="radio" v-model="getstu.OralCavity"  name="item2"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.OralCavity"  name="item2"  value="不灵活"/></label>不灵活
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="吞咽功能">
                    <label><input type="radio" v-model="getstu.SwallowFunction"  name="item3"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.SwallowFunction"  name="item3"  value="会呛食"/></label>会呛食
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.SwallowFunctionOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="语言理解">
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="对自己名字有反应"/></label>对自己名字有反应<br>
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="对熟悉的声音、音乐有反应"/></label>对熟悉的声音、音乐有反应<br>
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="理解手势动作"/></label>理解手势动作<br>
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="理解表情"/></label>理解表情<br>
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="理解单一指令"/></label>理解单一指令<br>
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="理解两步骤以上指令"/></label>理解两步骤以上指令<br>
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="理解形容词"/></label>理解形容词<br>
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="理解疑问句"/></label>理解疑问句<br>
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="理解否定句"/></label>理解否定句<br>
                    <label><input type="checkbox" v-model="getstu.LanguageComprehension"  name="item4"  value="理解复杂句"/></label>理解复杂句<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.LanguageComprehensionOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="语言表达 是否与同龄学生的发展相符">
                    <label><input type="radio" v-model="getstu.LanguageExpression"  name="item5"  value="是"/></label>是
                    <label><input type="radio" v-model="getstu.LanguageExpression"  name="item5"  value="否"/></label>否
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="惯用语言">
                    <label><input type="checkbox" v-model="getstu.LanguageExpression1"  name="item6"  value="普通话"/></label>普通话
                    <label><input type="checkbox" v-model="getstu.LanguageExpression1"  name="item6"  value="方言"/></label>方言
                    <label><input type="checkbox" v-model="getstu.LanguageExpression1"  name="item6"  value="英语"/></label>英语
                    <label><input type="checkbox" v-model="getstu.LanguageExpression1"  name="item6"  value="其他"/></label>其他
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="构音">
                    <label><input type="radio" v-model="getstu.LanguageExpression2"  name="item7"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.LanguageExpression2"  name="item7"  value="异常"/></label>异常
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="语畅">
                    <label><input type="radio" v-model="getstu.LanguageExpression3"  name="item8"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.LanguageExpression3"  name="item8"  value="异常"/></label>异常
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="沟通方式">
                    <label><input type="checkbox" v-model="getstu.LanguageExpression4"  name="item9"  value="使用手势、动作、手语"/></label>使用手势、动作、手语<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression4"  name="item9"  value="沟通辅具.沟通板、图片等"/></label>沟通辅具.沟通板、图片等<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression4"  name="item9"  value="笔谈"/></label>笔谈<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression4"  name="item9"  value="发出声音"/></label>发出声音<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression4"  name="item9"  value="使用口语"/></label>使用口语<br>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="能模仿">
                    <label><input type="checkbox" v-model="getstu.LanguageExpression5"  name="item10"  value="发音"/></label>发音<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression5"  name="item10"  value="说单字语词"/></label>说单字语词<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression5"  name="item10"  value="说简单句"/></label>说简单句<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression5"  name="item10"  value="说完整句"/></label>说完整句<br>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="能自己">
                    <label><input type="checkbox" v-model="getstu.LanguageExpression6"  name="item11"  value="发音"/></label>发音<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression6"  name="item11"  value="说单字语词"/></label>说单字语词<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression6"  name="item11"  value="说简单句"/></label>说简单句<br>
                    <label><input type="checkbox" v-model="getstu.LanguageExpression6"  name="item11"  value="说完整句"/></label>说完整句<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.LanguageExpressionOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="三、学业">
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="语文">
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="语文能力与同龄学生相符"/></label>语文能力与同龄学生相符<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="认识注音符号"/></label>认识注音符号<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="认识标点符号"/></label>认识标点符号<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="能拼读注音符号"/></label>能拼读注音符号<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="能读字"/></label>能读字<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="能读语词"/></label>能读语词<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="能读短句"/></label>能读短句<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="能读短文"/></label>能读短文<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="能写字"/></label>能写字<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="能写语词"/></label>能写语词<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="能写短句"/></label>能写短句<br>
                    <label><input type="checkbox" v-model="getstu.Chinese"  name="item12"  value="能写短文"/></label>能写短文<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.ChineseOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="数学">
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="数学能力与同龄学生相符"/></label>数学能力与同龄学生相符<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="形状"/></label>形状<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="颜色"/></label>颜色<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="大小"/></label>大小<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="方向"/></label>方向<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="长度"/></label>长度<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="重量"/></label>重量<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="容量"/></label>容量<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="面积"/></label>面积<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="体积"/></label>体积<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="角度"/></label>角度<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="速度"/></label>速度<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="钱币"/></label>钱币<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="时间"/></label>时间<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="会唱数"/></label>会唱数<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="会数数"/></label>会数数<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="认识数字"/></label>认识数字<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="会加法"/></label>会加法<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="会减法"/></label>会减法<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="会乘法"/></label>会乘法<br>
                    <label><input type="checkbox" v-model="getstu.Math"  name="item13"  value="会除法"/></label>会除法<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.MathOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
        </el-form>

        <el-form align="center">
            <el-button type="danger" :disabled="false" @click="submitForm()">保存</el-button>
        </el-form>
    </section>
</template>

<script>
    export default {
        name: "CapacityStatus_1",
        data(){
            return {
               getstu:{
                   Cognition:[],
                   CognitionOther:'',
                   OralCavity:'',
                   SwallowFunction:'',
                   SwallowFunctionOther:'',
                   LanguageComprehension:[],
                   LanguageComprehensionOther:'',
                   LanguageExpression:'',
                   LanguageExpression1:[],
                   LanguageExpression2:'',
                   LanguageExpression3:'',
                   LanguageExpression4:[],
                   LanguageExpression5:[],
                   LanguageExpression6:[],
                   LanguageExpressionOther:'',
                   Chinese:[],
                   ChineseOther:'',
                   Math:[],
                   MathOther:'',
               }
            }
        },
        async mounted(){
            await this.getAS1();
        },
        methods: {
            async getAS1(){
                var AS1;
                await this.$http.post('/api/stu/queAS1', {
                    stuID:this.$store.state.stuinfo[0].student_id
                }).then((response) => {
                    AS1 = response.body[0];
                });
                
                if(AS1.Cognition != null)
                    this.getstu.Cognition = AS1.Cognition.split('(^o~)');
                if(AS1.CognitionOther != null)
                    this.getstu.CognitionOther = AS1.CognitionOther;
                if(AS1.OralCavity != null)
                    this.getstu.OralCavity = AS1.OralCavity;
                if(AS1.SwallowFunction != null)
                    this.getstu.SwallowFunction = AS1.SwallowFunction;
                if(AS1.SwallowFunctionOther != null)
                    this.getstu.SwallowFunctionOther = AS1.SwallowFunctionOther;
                if(AS1.LanguageComprehension != null)
                    this.getstu.LanguageComprehension = AS1.LanguageComprehension.split('(^o~)');
                if(AS1.LanguageComprehensionOther != null)
                    this.getstu.LanguageComprehensionOther = AS1.LanguageComprehensionOther;
                if(AS1.LanguageExpression != null)
                    this.getstu.LanguageExpression = AS1.LanguageExpression;
                if(AS1.LanguageExpression1 != null)
                    this.getstu.LanguageExpression1 = AS1.LanguageExpression1.split('(^o~)');
                if(AS1.LanguageExpression2 != null)
                    this.getstu.LanguageExpression2 = AS1.LanguageExpression2;
                if(AS1.LanguageExpression3 != null)
                    this.getstu.LanguageExpression3 = AS1.LanguageExpression3;
                if(AS1.LanguageExpression4 != null)
                    this.getstu.LanguageExpression4 = AS1.LanguageExpression4.split('(^o~)');
                if(AS1.LanguageExpression5 != null)
                    this.getstu.LanguageExpression5 = AS1.LanguageExpression5.split('(^o~)');
                if(AS1.LanguageExpression6 != null)
                    this.getstu.LanguageExpression6 = AS1.LanguageExpression6.split('(^o~)');
                if(AS1.LanguageExpressionOther != null)
                    this.getstu.LanguageExpressionOther = AS1.LanguageExpressionOther;
                if(AS1.Chinese != null)
                    this.getstu.Chinese = AS1.Chinese.split('(^o~)');
                if(AS1.ChineseOther != null)
                    this.getstu.ChineseOther = AS1.ChineseOther;
                if(AS1.Math != null)
                    this.getstu.Math = AS1.Math.split('(^o~)');
                if(AS1.MathOther != null)
                    this.getstu.MathOther = AS1.MathOther;
            },

            async submitForm(){
                await this.$http.post('/api/stu/upAS1', {
                    Cognition:this.getstu.Cognition.join('(^o~)'),
                    CognitionOther:this.getstu.CognitionOther,
                    OralCavity:this.getstu.OralCavity,
                    SwallowFunction:this.getstu.SwallowFunction,
                    SwallowFunctionOther:this.getstu.SwallowFunctionOther,
                    LanguageComprehension:this.getstu.LanguageComprehension.join('(^o~)'),
                    LanguageComprehensionOther:this.getstu.LanguageComprehensionOther,
                    LanguageExpression:this.getstu.LanguageExpression,
                    LanguageExpression1:this.getstu.LanguageExpression1.join('(^o~)'),
                    LanguageExpression2:this.getstu.LanguageExpression2,
                    LanguageExpression3:this.getstu.LanguageExpression3,
                    LanguageExpression4:this.getstu.LanguageExpression4.join('(^o~)'),
                    LanguageExpression5:this.getstu.LanguageExpression5.join('(^o~)'),
                    LanguageExpression6:this.getstu.LanguageExpression6.join('(^o~)'),
                    LanguageExpressionOther:this.getstu.LanguageExpressionOther,
                    Chinese:this.getstu.Chinese.join('(^o~)'),
                    ChineseOther:this.getstu.ChineseOther,
                    Math:this.getstu.Math.join('(^o~)'),
                    MathOther:this.getstu.MathOther,
                    stuID:this.$store.state.stuinfo[0].student_id
                }).then((response) => {
                    if(response.status == 200)
                        this.$message.success("保存成功！");
                    else
                        this.$message.warning("保存失败...");
                });
            },
        }
    }
</script>

<style scoped>

</style>
