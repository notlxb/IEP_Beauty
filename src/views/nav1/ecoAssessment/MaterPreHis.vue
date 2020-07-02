<template>
    <section>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/newContact', query:{currentPage:this.$route.query.currentPage} }">生态评量</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage },}">学生信息</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/devTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">家长自评</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/funcTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">专项评估</el-breadcrumb-item>
            <el-breadcrumb-item>母亲孕史</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/stuInterest'}">兴趣爱好</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/healthstatus'}">健康状况</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/capacitystatus_1'}">能力现状-1</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/capacitystatus_2'}">能力现状-2</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider content-position="center"></el-divider>
        <el-form :inline="true" align="left" ref="form" :model="getstu">
            <el-form-item>
                <table class="gridtable" style="width: 1200px">
                    <thead >
                    <tr>
                        <th colspan="2" style="text-align: center;font-size:medium">母亲孕史</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style="text-align: center;font-size:medium">孕期是否有异常</td>
                        <td>
                            <el-form-item >
                                <label><input type="radio" v-model="getstu.PregnancyHistory1"  name="item1"  value="有异常"/></label>有异常
                                <label><input type="radio" v-model="getstu.PregnancyHistory1"  name="item1"  value="无异常"/></label>有异常
                            </el-form-item>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td style="text-align: center;font-size:medium">异常的话，具体有什么异常？</td>
                        <td>
                            <el-form-item>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory2"  name="item2"  value="先兆流产"/></label>先兆流产<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory2"  name="item2"  value="感冒"/></label>感冒<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory2"  name="item2"  value="贫血"/></label>贫血<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory2"  name="item2"  value="妊娠中毒症"/></label>妊娠中毒症<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory2"  name="item2"  value="糖尿病"/></label>糖尿病<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory2"  name="item2"  value="早期破水"/></label>早期破水<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory2"  name="item2"  value="早产(在37周之前)"/></label>早产(在37周之前)<br>
                                <el-form-item label="其他">
                                    <el-input v-model="getstu.PregnancyHistory2Other"></el-input>
                                </el-form-item>
                            </el-form-item>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td style="text-align: center;font-size:medium">有异常后是否在医院接受过治疗? </td>
                        <td>
                            <el-form-item>
                                <label><input type="radio" v-model="getstu.PregnancyHistory3"  name="item1"  value="有"/></label>有
                                <label><input type="radio" v-model="getstu.PregnancyHistory3"  name="item1"  value="没有"/></label>没有
                            </el-form-item>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td style="text-align: center;font-size:medium">接受了什么样的治疗？</td>
                        <td>
                           <el-input type="textarea" v-model="getstu.PregnancyHistory4"></el-input>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td style="text-align: center;font-size:medium">分娩时的状况是?</td>
                        <td>
                            <el-form-item>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory5"  name="item3"  value="正常分娩　（顺产）"/></label>正常分娩　（顺产）<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory5"  name="item3"  value="身体没有异常,自己主动要求破腹产"/></label>身体没有异常,自己主动要求破腹产<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory5"  name="item3"  value="身体有异常,医生要求破腹产"/></label>身体有异常,医生要求破腹产<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory5"  name="item3"  value="吸盘分娩"/></label>吸盘分娩<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory5"  name="item3"  value="脐带绕颈"/></label>脐带绕颈<br>
                                <label><input type="checkbox" v-model="getstu.PregnancyHistory5"  name="item3"  value="阵痛微弱"/></label>阵痛微弱<br>
                                <el-form-item label="其他">
                                    <el-input v-model="getstu.PregnancyHistory5Other"></el-input>
                                </el-form-item>
                            </el-form-item>
                        </td>
                    </tr>
                    </tbody>
                    <thead >
                    <tr>
                        <th colspan="2" style="text-align: center;font-size:medium">儿童生产发育史</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style="text-align: center;font-size:medium">孩子出生时状况：</td>
                        <td>
                            <el-form-item>
                                <label><input type="checkbox" v-model="getstu.ChildDevelopment1"  name="item4"  value="正常"/></label>1.正常<br>
                                <label><input type="checkbox" v-model="getstu.ChildDevelopment1"  name="item4"  value="窒息"/></label>2.窒息<br>
                                <label><input type="checkbox" v-model="getstu.ChildDevelopment1"  name="item4"  value="超重体重儿(在4000克以上)"/></label>3.超重体重儿(在4000克以上)<br>
                                <label><input type="checkbox" v-model="getstu.ChildDevelopment1"  name="item4"  value="低体重儿(低于2500克)"/></label>4.低体重儿(低于2500克)<br>
                                <label><input type="checkbox" v-model="getstu.ChildDevelopment1"  name="item4"  value="极低体重儿(低于1500克)"/></label>5.极低体重儿(低于1500克)<br>
                                <label><input type="checkbox" v-model="getstu.ChildDevelopment1"  name="item4"  value="重度新生儿黄疸"/></label>6.重度新生儿黄疸<br>
                                <el-form-item label="7.在暖箱中放的天数">
                                    <el-input v-model="getstu.ChildDevelopment2[0]"></el-input>
                                </el-form-item><br>
                                <el-form-item label="8.是否有发热型抽搐">
                                    <el-input v-model="getstu.ChildDevelopment2[1]"></el-input>
                                </el-form-item><br>
                                <el-form-item label="9.癫痫">
                                    <el-input v-model="getstu.ChildDevelopment2[2]"></el-input>
                                </el-form-item><br>
                                <el-form-item label="   放电">
                                    <el-input v-model="getstu.ChildDevelopment2[3]"></el-input>
                                </el-form-item><br>
                                <el-form-item label="10.其他">
                                    <el-input v-model="getstu.ChildDevelopment2[4]"></el-input>
                                </el-form-item>
                            </el-form-item>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td style="text-align: center;font-size:medium">孩子身体发育情况：</td>
                        <td>
                            <el-form :inline="true" align="left" ref="form":model="getstu">
                                <el-form-item label="1.脖子是">
                                    <el-input v-model="getstu.ChildDevelopment3[0]"></el-input>
                                </el-form-item>
                                <el-form-item label="个月时挺立起来了。(头颈硬了)"></el-form-item><br>
                                <el-form-item label="2.从">
                                    <el-input v-model="getstu.ChildDevelopment3[1]"></el-input>
                                </el-form-item>
                                <el-form-item label="个月开始会一个人坐起来的"></el-form-item><br>
                                <el-form-item label="3.从">
                                    <el-input v-model="getstu.ChildDevelopment3[2]"></el-input>
                                </el-form-item>
                                <el-form-item label="个月时开始一个人爬行"></el-form-item><br>
                                <el-form-item label="4.是从">
                                    <el-input v-model="getstu.ChildDevelopment3[3]"></el-input>
                                </el-form-item>
                                <el-form-item label="个月时开始独自开步的? （独立行走）"></el-form-item><br>
                                <el-form-item label="5.从">
                                    <el-input v-model="getstu.ChildDevelopment3[4]"></el-input>
                                </el-form-item>
                                <el-form-item label="岁"></el-form-item>
                                <el-form-item>
                                    <el-input v-model="getstu.ChildDevelopment3[5]"></el-input>
                                </el-form-item>
                                <el-form-item label="个月会发出“阿阿”或“呜呜”的声音吗?"></el-form-item><br>
                                <el-form-item label="6.从">
                                    <el-input v-model="getstu.ChildDevelopment3[6]"></el-input>
                                </el-form-item>
                                <el-form-item label="岁"></el-form-item>
                                <el-form-item>
                                    <el-input v-model="getstu.ChildDevelopment3[7]"></el-input>
                                </el-form-item>
                                <el-form-item label="个月开始能说一些“妈妈”“汪汪”“车车”等有简单含义的词吗？"></el-form-item><br>
                                <el-form-item label="7.孩子是从">
                                    <el-input v-model="getstu.ChildDevelopment3[6]"></el-input>
                                </el-form-item>
                                <el-form-item label="岁"></el-form-item>
                                <el-form-item>
                                    <el-input v-model="getstu.ChildDevelopment3[7]"></el-input>
                                </el-form-item>
                                <el-form-item label="个月时候开口说话的?，最初出现的语言（单词）是"></el-form-item>
                                <el-form-item>
                                    <el-input v-model="getstu.ChildDevelopment3[8]"></el-input>
                                </el-form-item>

                            </el-form>
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td style="text-align: center;font-size:medium">医疗记录</td>
                        <td>
                            <table class="gridtable" width="1000px">
                                <thead >
                                <tr>
                                    <th colspan="4" style="text-align: center;font-size:medium">医疗记录</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="text-align: center;font-size:medium">顺序</td>
                                        <td style="text-align: center;font-size:medium">期间</td>
                                        <td style="text-align: center;font-size:medium">治疗机构 治疗科</td>
                                        <td style="text-align: center;font-size:medium">入院理由</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                <tr>
                                    <td><el-input v-model="getstu.MedicalHistory1[0]"></el-input></td>
                                    <td><el-input v-model="getstu.MedicalHistory1[1]"></el-input></td>
                                    <td><el-input v-model="getstu.MedicalHistory1[2]"></el-input></td>
                                    <td><el-input v-model="getstu.MedicalHistory1[3]"></el-input></td>
                                </tr>
                                </tbody>
                                <tbody>
                                <tr>
                                    <td><el-input v-model="getstu.MedicalHistory2[0]"></el-input></td>
                                    <td><el-input v-model="getstu.MedicalHistory2[1]"></el-input></td>
                                    <td><el-input v-model="getstu.MedicalHistory2[2]"></el-input></td>
                                    <td><el-input v-model="getstu.MedicalHistory2[3]"></el-input></td>
                                </tr>
                                </tbody>
                                <tbody>
                                <tr>
                                    <td><el-input v-model="getstu.MedicalHistory3[0]"></el-input></td>
                                    <td><el-input v-model="getstu.MedicalHistory3[1]"></el-input></td>
                                    <td><el-input v-model="getstu.MedicalHistory3[2]"></el-input></td>
                                    <td><el-input v-model="getstu.MedicalHistory3[3]"></el-input></td>
                                </tr>
                                </tbody>

                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    export default {
        name: "MaterPreHis",
        data(){
            return{
                getstu:{
                    PregnancyHistory1:'',
                    PregnancyHistory2:[],
                    PregnancyHistory2Other:'',
                    PregnancyHistory3:'',
                    PregnancyHistory4:'',
                    PregnancyHistory5:[],
                    PregnancyHistory5Other:'',
                    ChildDevelopment1:[],
                    ChildDevelopment2:[],
                    ChildDevelopment3:[],
                    MedicalHistory1:[],
                    MedicalHistory2:[],
                    MedicalHistory3:[],

                }
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
</style>
