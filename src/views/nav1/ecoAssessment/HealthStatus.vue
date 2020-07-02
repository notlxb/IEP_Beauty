<template>
    <section>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/newContact', query:{currentPage:this.$route.query.currentPage} }">生态评量</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage },}">学生信息</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/devTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">家长自评</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/funcTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">专项评估</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[0] == 'true' " :to="{path:'/checkNEdit/materprehis'}">母亲孕史</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[1] == 'true' " :to="{path:'/checkNEdit/stuInterest'}">兴趣爱好</el-breadcrumb-item>
            <el-breadcrumb-item>健康状况</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[3] == 'true' " :to="{path:'/checkNEdit/capacitystatus_1'}">能力现状-1</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[4] == 'true' " :to="{path:'/checkNEdit/capacitystatus_2'}">能力现状-2</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider content-position="center"></el-divider>
        <el-form :inline="true" align="left" ref="form" :model="getstu">
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="身高(cm)">
                    <el-input v-model="getstu.Height"></el-input>
                </el-form-item>
                <el-form-item label="体重(kg)">
                    <el-input v-model="getstu.Weight"></el-input>
                </el-form-item>
            </template><br>
            <el-form-item label="视力">
                <table class="gridtable" style="width: 1000px">
                    <thead >
                    <tr>
                        <th style="text-align: center;font-size:medium">裸眼(左眼)</th>
                        <th style="text-align: center;font-size:medium">裸眼(右眼)</th>
                        <th style="text-align: center;font-size:medium">校正后(左眼)</th>
                        <th style="text-align: center;font-size:medium">校正后(右眼)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><el-input v-model="getstu.NakedSightL"></el-input></td>
                        <td><el-input v-model="getstu.NakedSightR"></el-input></td>
                        <td><el-input v-model="getstu.CorrectedSightL"></el-input></td>
                        <td><el-input v-model="getstu.CorrectedSightR"></el-input></td>
                    </tr>
                    </tbody>
                </table>
            </el-form-item><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="视觉">
                    <label><input type="radio" v-model="getstu.Vision"  name="item1"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.Vision"  name="item1"  value="近视"/></label>近视
                    <label><input type="radio" v-model="getstu.Vision"  name="item1"  value="远视"/></label>远视
                    <label><input type="radio" v-model="getstu.Vision"  name="item1"  value="斜视"/></label>斜视
                    <label><input type="radio" v-model="getstu.Vision"  name="item1"  value="盲眼"/></label>盲眼
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="视觉障碍程度(左眼)">
                    <label><input type="radio" v-model="getstu.VisualImpairmentL"  name="item2"  value="轻度(0.2-0.1或视野20以内)"/></label>轻度(0.2-0.1或视野20以内)
                    <label><input type="radio" v-model="getstu.VisualImpairmentL"  name="item2"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.VisualImpairmentL"  name="item2"  value="中度(0.1以下不含0.1)"/></label>中度(0.1以下不含0.1)
                    <label><input type="radio" v-model="getstu.VisualImpairmentL"  name="item2"  value="重度(0.01以下不含0.01)"/></label>重度(0.01以下不含0.01)
                    <label><input type="radio" v-model="getstu.VisualImpairmentL"  name="item2"  value="全盲"/></label>全盲
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="视觉障碍程度(右眼)">
                    <label><input type="radio" v-model="getstu.VisualImpairmentR"  name="item3"  value="轻度(0.2-0.1或视野20以内)"/></label>轻度(0.2-0.1或视野20以内)
                    <label><input type="radio" v-model="getstu.VisualImpairmentR"  name="item3"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.VisualImpairmentR"  name="item3"  value="中度(0.1以下不含0.1)"/></label>中度(0.1以下不含0.1)
                    <label><input type="radio" v-model="getstu.VisualImpairmentR"  name="item3"  value="重度(0.01以下不含0.01)"/></label>重度(0.01以下不含0.01)
                    <label><input type="radio" v-model="getstu.VisualImpairmentR"  name="item3"  value="全盲"/></label>全盲
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="视觉障碍原因">
                    <label><input type="checkbox" v-model="getstu.VisualImpairmentReason"  name="item4"  value="角膜疾病"/></label>角膜疾病<br>
                    <label><input type="checkbox" v-model="getstu.VisualImpairmentReason"  name="item4"  value="青光眼"/></label>青光眼<br>
                    <label><input type="checkbox" v-model="getstu.VisualImpairmentReason"  name="item4"  value="视神经疾患"/></label>视神经疾患<br>
                    <label><input type="checkbox" v-model="getstu.VisualImpairmentReason"  name="item4"  value="白内障"/></label>白内障<br>
                    <label><input type="checkbox" v-model="getstu.VisualImpairmentReason"  name="item4"  value="网膜疾患"/></label>网膜疾患<br>
                    <label><input type="checkbox" v-model="getstu.VisualImpairmentReason"  name="item4"  value="白化病"/></label>白化病<br>
                    <label><input type="checkbox" v-model="getstu.VisualImpairmentReason"  name="item4"  value="外伤性疾患"/></label>外伤性疾患<br>
                    <label><input type="checkbox" v-model="getstu.VisualImpairmentReason"  name="item4"  value="弱视"/></label>弱视<br>
                    <el-form-item label="其他">
                        <el-input v-model="getstu.VisualImpairmentReasonOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="听觉">
                    <label><input type="radio" v-model="getstu.Hearing"  name="item5"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.Hearing"  name="item5"  value="听觉障碍"/></label>听觉障碍
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="左耳障碍">
                    <label><input type="radio" v-model="getstu.HearingImpairmentL"  name="item6"  value="重度(90分贝或以上)"/></label>重度(90分贝或以上)
                    <label><input type="radio" v-model="getstu.HearingImpairmentL"  name="item6"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.HearingImpairmentL"  name="item6"  value="中度(70-89分贝)"/></label>中度(70-89分贝)
                    <label><input type="radio" v-model="getstu.HearingImpairmentL"  name="item6"  value="轻度(50-69分贝)"/></label>轻度(50-69分贝)
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="右耳障碍">
                    <label><input type="radio" v-model="getstu.HearingImpairmentR"  name="item7"  value="重度(90分贝或以上)"/></label>重度(90分贝或以上)
                    <label><input type="radio" v-model="getstu.HearingImpairmentR"  name="item7"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.HearingImpairmentR"  name="item7"  value="中度(70-89分贝)"/></label>中度(70-89分贝)
                    <label><input type="radio" v-model="getstu.HearingImpairmentR"  name="item7"  value="轻度(50-69分贝)"/></label>轻度(50-69分贝)
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="听觉障碍原因">
                    <label><input type="checkbox" v-model="getstu.HearingImpairmentReason"  name="item8"  value="外伤"/></label>外伤<br>
                    <label><input type="checkbox" v-model="getstu.HearingImpairmentReason"  name="item8"  value="发高烧"/></label>发高烧<br>
                    <label><input type="checkbox" v-model="getstu.HearingImpairmentReason"  name="item8"  value="中耳炎"/></label>中耳炎<br>
                    <label><input type="checkbox" v-model="getstu.HearingImpairmentReason"  name="item8"  value="遗传"/></label>遗传<br>
                    <label><input type="checkbox" v-model="getstu.HearingImpairmentReason"  name="item8"  value="脑膜炎"/></label>脑膜炎<br>
                    <label><input type="checkbox" v-model="getstu.HearingImpairmentReason"  name="item8"  value="腮腺炎"/></label>腮腺炎<br>
                    <el-form-item label="其他">
                        <el-input v-model="getstu.HearingImpairmentReasonOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="语言状况">
                    <label><input type="radio" v-model="getstu.Language"  name="item9"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.Language"  name="item9"  value="语言障碍"/></label>语言障碍
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="语言障碍程度">
                    <label><input type="radio" v-model="getstu.LanguageDisability"  name="item10"  value="轻度:明显妨碍交谈"/></label>轻度:明显妨碍交谈
                    <label><input type="radio" v-model="getstu.LanguageDisability"  name="item10"  value="中度:严重障碍，导致与人沟通有显著障碍"/></label>中度:严重障碍，导致与人沟通有显著障碍
                    <label><input type="radio" v-model="getstu.LanguageDisability"  name="item10"  value="重度:完全无法与人沟通"/></label>重度:完全无法与人沟通
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="语言障碍原因">
                    <label><input type="checkbox" v-model="getstu.LanguageDisabilityReason"  name="item11"  value="中枢神经病变"/></label>中枢神经病变<br>
                    <label><input type="checkbox" v-model="getstu.LanguageDisabilityReason"  name="item11"  value="兔唇"/></label>兔唇<br>
                    <label><input type="checkbox" v-model="getstu.LanguageDisabilityReason"  name="item11"  value="外伤"/></label>外伤<br>
                    <label><input type="checkbox" v-model="getstu.LanguageDisabilityReason"  name="item11"  value="上腭裂"/></label>上腭裂<br>
                    <label><input type="checkbox" v-model="getstu.LanguageDisabilityReason"  name="item11"  value="脑血管病变"/></label>脑血管病变<br>
                    <el-form-item label="其他">
                        <el-input v-model="getstu.LanguageDisabilityReasonOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="肢体状况">
                    <label><input type="radio" v-model="getstu.PhysicalStatus"  name="item12"  value="正常"/></label>正常
                    <label><input type="radio" v-model="getstu.PhysicalStatus"  name="item12"  value="肢体障碍"/></label>肢体障碍
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="肢体障碍程度">
                    <label><input type="radio" v-model="getstu.PhysicalDisability"  name="item13"  value="能自行行走"/></label>能自行行走
                    <label><input type="radio" v-model="getstu.PhysicalDisability"  name="item13"  value="靠辅助器具(如拐杖、助行器)"/></label>靠辅助器具(如拐杖、助行器)
                    <label><input type="radio" v-model="getstu.PhysicalDisability"  name="item13"  value="需坐轮椅"/></label>需坐轮椅
                    <label><input type="radio" v-model="getstu.PhysicalDisability"  name="item13"  value="能自行行走，但不稳定需人陪伴"/></label>能自行行走，但不稳定需人陪伴
                    <label><input type="radio" v-model="getstu.PhysicalDisability"  name="item13"  value="完全无法行动"/></label>完全无法行动
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="肢体障碍原因">
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityReason"  name="item14"  value="骨关节病变"/></label>骨关节病变<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityReason"  name="item14"  value="脊椎损伤"/></label>脊椎损伤<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityReason"  name="item14"  value="先天性畸形"/></label>先天性畸形<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityReason"  name="item14"  value="肌萎缩(无力)"/></label>肌萎缩(无力)<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityReason"  name="item14"  value="小儿麻痹"/></label>小儿麻痹<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityReason"  name="item14"  value="脑瘫"/></label>脑瘫<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityReason"  name="item14"  value="截肢"/></label>截肢<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityReason"  name="item14"  value="脑血管病变"/></label>脑血管病变<br>
                    <el-form-item label="其他">
                        <el-input v-model="getstu.PhysicalDisabilityReasonOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="肢体障碍类型">
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityType"  name="item15"  value="左上肢"/></label>左上肢<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityType"  name="item15"  value="左下肢"/></label>左下肢<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityType"  name="item15"  value="右上肢"/></label>右上肢<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityType"  name="item15"  value="右下肢"/></label>右下肢<br>
                    <label><input type="checkbox" v-model="getstu.PhysicalDisabilityType"  name="item15"  value="躯干(脊椎)"/></label>躯干(脊椎)<br>
                    <el-form-item label="其他">
                        <el-input v-model="getstu.PhysicalDisabilityTypeOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="特殊疾病">
                    <label><input type="radio" v-model="getstu.SpecialDisease"  name="item16"  value="无"/></label>无
                    <label><input type="radio" v-model="getstu.SpecialDisease"  name="item16"  value="有"/></label>有
                    <el-form-item label="如有，疾病名称为">
                        <el-input v-model="getstu.SpecialDiseaseName"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="服药状况">
                    <el-form-item label="目前服用何种药物">
                        <el-input v-model="getstu.MedicationStatus[0]"></el-input>
                    </el-form-item>
                    <el-form-item label="药物用法">
                        <el-input v-model="getstu.MedicationStatus[1]"></el-input>
                    </el-form-item>
                    <el-form-item label="对何种药物过敏">
                        <el-input v-model="getstu.MedicationStatus[2]"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="精神状况">
                    <label><input type="checkbox" v-model="getstu.MentalStatus"  name="item17"  value="无"/></label>无<br>
                    <label><input type="checkbox" v-model="getstu.MentalStatus"  name="item17"  value="注意力不足 多动症"/></label>注意力不足 多动症<br>
                    <label><input type="checkbox" v-model="getstu.MentalStatus"  name="item17"  value="脑伤"/></label>脑伤<br>
                    <label><input type="checkbox" v-model="getstu.MentalStatus"  name="item17"  value="癫痫"/></label>癫痫<br>
                    <label><input type="checkbox" v-model="getstu.MentalStatus"  name="item17"  value="抽搐症"/></label>抽搐症<br>
                    <el-form-item label="其他">
                        <el-input v-model="getstu.MentalStatusOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="其他特殊情况说明">
                    <el-form-item>
                        <el-input v-model="getstu.Other"></el-input>
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
        name: "HealthStatus",
        data(){
            return{
                getstu:{
                    Height:'',
                    Weight:'',
                    Vision:'',
                    NakedSightL:'',
                    NakedSightR:'',
                    CorrectedSightL:'',
                    CorrectedSightR:'',
                    VisualImpairmentL:'',
                    VisualImpairmentR:'',
                    VisualImpairmentReason:[],
                    VisualImpairmentReasonOther:'',
                    Hearing:'',
                    HearingImpairmentL:'',
                    HearingImpairmentR:'',
                    HearingImpairmentReason:[],
                    HearingImpairmentReasonOther:'',
                    Language:'',
                    LanguageDisability:'',
                    LanguageDisabilityReason:[],
                    LanguageDisabilityReasonOther:'',
                    PhysicalStatus:'',
                    PhysicalDisability:'',
                    PhysicalDisabilityReason:[],
                    PhysicalDisabilityReasonOther:'',
                    PhysicalDisabilityType:[],
                    PhysicalDisabilityTypeOther:'',
                    SpecialDisease:'',
                    SpecialDiseaseName:'',
                    MedicationStatus:[],
                    MentalStatus:[],
                    MentalStatusOther:'',
                    Other:'',
                },
            }
        },
        async mounted(){
            await this.getSOH();
        },
        methods: {
            async getSOH(){
                var SOH;
                await this.$http.post('/api/stu/queSOH', {
                    stuID:this.$store.state.stuinfo[0].student_id
                }).then((response) => {
                    SOH = response.body[0];
                });
                if(SOH.Height != null)
                    this.getstu.Height = SOH.Height;
                if(SOH.Weight != null)
                    this.getstu.Weight = SOH.Weight;
                if(SOH.Vision != null)
                    this.getstu.Vision = SOH.Vision;
                if(SOH.NakedSightL != null)
                    this.getstu.NakedSightL = SOH.NakedSightL;
                if(SOH.NakedSightR != null)
                    this.getstu.NakedSightR = SOH.NakedSightR;
                if(SOH.CorrectedSightL != null)
                    this.getstu.CorrectedSightL = SOH.CorrectedSightL;
                if(SOH.CorrectedSightR != null)
                    this.getstu.CorrectedSightR = SOH.CorrectedSightR;
                if(SOH.VisualImpairmentL != null)
                    this.getstu.VisualImpairmentL = SOH.VisualImpairmentL;
                if(SOH.VisualImpairmentR != null)
                    this.getstu.VisualImpairmentR = SOH.VisualImpairmentR;
                if(SOH.VisualImpairmentReason != null)
                    this.getstu.VisualImpairmentReason = SOH.VisualImpairmentReason.split('(^o~)');
                if(SOH.VisualImpairmentReasonOther != null)
                    this.getstu.VisualImpairmentReasonOther = SOH.VisualImpairmentReasonOther;
                if(SOH.Hearing != null)
                    this.getstu.Hearing = SOH.Hearing;
                if(SOH.HearingImpairmentL != null)
                    this.getstu.HearingImpairmentL = SOH.HearingImpairmentL;
                if(SOH.HearingImpairmentR != null)
                    this.getstu.HearingImpairmentR = SOH.HearingImpairmentR;
                if(SOH.HearingImpairmentReason != null)
                    this.getstu.HearingImpairmentReason = SOH.HearingImpairmentReason.split('(^o~)');
                if(SOH.HearingImpairmentReasonOther != null)
                    this.getstu.HearingImpairmentReasonOther = SOH.HearingImpairmentReasonOther;
                if(SOH.Language != null)
                    this.getstu.Language = SOH.Language;
                if(SOH.LanguageDisability != null)
                    this.getstu.LanguageDisability = SOH.LanguageDisability;
                if(SOH.LanguageDisabilityReason != null)
                    this.getstu.LanguageDisabilityReason = SOH.LanguageDisabilityReason.split('(^o~)');
                if(SOH.LanguageDisabilityReasonOther != null)
                    this.getstu.LanguageDisabilityReasonOther = SOH.LanguageDisabilityReasonOther;
                if(SOH.PhysicalStatus != null)
                    this.getstu.PhysicalStatus = SOH.PhysicalStatus;
                if(SOH.PhysicalDisability != null)
                    this.getstu.PhysicalDisability = SOH.PhysicalDisability;
                if(SOH.PhysicalDisabilityReason != null)
                    this.getstu.PhysicalDisabilityReason = SOH.PhysicalDisabilityReason.split('(^o~)');
                if(SOH.PhysicalDisabilityReasonOther != null)
                    this.getstu.PhysicalDisabilityReasonOther = SOH.PhysicalDisabilityReasonOther;
                if(SOH.PhysicalDisabilityType != null)
                    this.getstu.PhysicalDisabilityType = SOH.PhysicalDisabilityType.split('(^o~)');
                if(SOH.PhysicalDisabilityTypeOther != null)
                    this.getstu.PhysicalDisabilityTypeOther = SOH.PhysicalDisabilityTypeOther;
                if(SOH.SpecialDisease != null)
                    this.getstu.SpecialDisease = SOH.SpecialDisease;
                if(SOH.SpecialDiseaseName != null)
                    this.getstu.SpecialDiseaseName = SOH.SpecialDiseaseName;
                if(SOH.MedicationStatus != null)
                    this.getstu.MedicationStatus = SOH.MedicationStatus.split('(^o~)');
                if(SOH.MentalStatus != null)
                    this.getstu.MentalStatus = SOH.MentalStatus.split('(^o~)');
                if(SOH.MentalStatusOther != null)
                    this.getstu.MentalStatusOther = SOH.MentalStatusOther;
                if(SOH.Other != null)
                    this.getstu.Other = SOH.Other;
            },

            async submitForm(){
                await this.$http.post('/api/stu/upSOH', {
                    Height:this.getstu.Height,
                    Weight:this.getstu.Weight,
                    Vision:this.getstu.Vision,
                    NakedSightL:this.getstu.NakedSightL,
                    NakedSightR:this.getstu.NakedSightR,
                    CorrectedSightL:this.getstu.CorrectedSightL,
                    CorrectedSightR:this.getstu.CorrectedSightR,
                    VisualImpairmentL:this.getstu.VisualImpairmentL,
                    VisualImpairmentR:this.getstu.VisualImpairmentR,
                    VisualImpairmentReason:this.getstu.VisualImpairmentReason.join('(^o~)'),
                    VisualImpairmentReasonOther:this.getstu.VisualImpairmentReasonOther,
                    Hearing:this.getstu.Hearing,
                    HearingImpairmentL:this.getstu.HearingImpairmentL,
                    HearingImpairmentR:this.getstu.HearingImpairmentR,
                    HearingImpairmentReason:this.getstu.HearingImpairmentReason.join('(^o~)'),
                    HearingImpairmentReasonOther:this.getstu.HearingImpairmentReasonOther,
                    Language:this.getstu.Language,
                    LanguageDisability:this.getstu.LanguageDisability,
                    LanguageDisabilityReason:this.getstu.LanguageDisabilityReason.join('(^o~)'),
                    LanguageDisabilityReasonOther:this.getstu.LanguageDisabilityReasonOther,
                    PhysicalStatus:this.getstu.PhysicalStatus,
                    PhysicalDisability:this.getstu.PhysicalDisability,
                    PhysicalDisabilityReason:this.getstu.PhysicalDisabilityReason.join('(^o~)'),
                    PhysicalDisabilityReasonOther:this.getstu.PhysicalDisabilityReasonOther,
                    PhysicalDisabilityType:this.getstu.PhysicalDisabilityType.join('(^o~)'),
                    PhysicalDisabilityTypeOther:this.getstu.PhysicalDisabilityTypeOther,
                    SpecialDisease:this.getstu.SpecialDisease,
                    SpecialDiseaseName:this.getstu.SpecialDiseaseName,
                    MedicationStatus:this.getstu.MedicationStatus.join('(^o~)'),
                    MentalStatus:this.getstu.MentalStatus.join('(^o~)'),
                    MentalStatusOther:this.getstu.MentalStatusOther,
                    Other:this.getstu.Other,
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
