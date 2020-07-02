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
            <el-breadcrumb-item v-if="this.$store.state.stuinfo[0].FuBiao.split('(^o~)')[3] == 'true' " :to="{path:'/checkNEdit/capacitystatus_1'}">能力现状-1</el-breadcrumb-item>
            <el-breadcrumb-item>能力现状-2</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider content-position="center"></el-divider>
        <el-form :inline="true" align="left" ref="form" :model="getstu">
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="一、生活自理能力">
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="饮食">
                    <label><input type="checkbox" v-model="getstu.Eating"  name="item1"  value="完全可以自己进食"/></label>完全可以自己进食<br>
                    <label><input type="checkbox" v-model="getstu.Eating"  name="item1"  value="会用筷子"/></label>会用筷子<br>
                    <label><input type="checkbox" v-model="getstu.Eating"  name="item1"  value="会用汤匙进食"/></label>会用汤匙进食<br>
                    <label><input type="checkbox" v-model="getstu.Eating"  name="item1"  value="进食需协助"/></label>进食需协助<br>
                    <label><input type="checkbox" v-model="getstu.Eating"  name="item1"  value="进食部分依赖"/></label>进食部分依赖<br>
                    <label><input type="checkbox" v-model="getstu.Eating"  name="item1"  value="进食完全依赖"/></label>进食完全依赖<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.EatingOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="穿脱衣服">
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="完全不需协助"/></label>完全不需协助<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="自己会脱衣服"/></label>自己会脱衣服<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="自己会穿衣服"/></label>自己会穿衣服<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="会使用拉链"/></label>会使用拉链<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="会扣扣子"/></label>会扣扣子<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="会解扣子"/></label>会解扣子<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="自己会穿鞋子"/></label>自己会穿鞋子<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="自己会脱鞋子"/></label>自己会脱鞋子<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="会系鞋带"/></label>会系鞋带<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="自己会穿袜子"/></label>自己会穿袜子<br>
                    <label><input type="checkbox" v-model="getstu.DressAndUndress"  name="item2"  value="自己会脱袜子"/></label>自己会脱袜子<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.DressAndUndressOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="如厕">
                    <label><input type="checkbox" v-model="getstu.PoopAndPee"  name="item3"  value="自己会处理大便"/></label>自己会处理大便<br>
                    <label><input type="checkbox" v-model="getstu.PoopAndPee"  name="item3"  value="自己会处理小便"/></label>自己会处理小便<br>
                    <label><input type="checkbox" v-model="getstu.PoopAndPee"  name="item3"  value="需协助处理大便"/></label>需协助处理大便<br>
                    <label><input type="checkbox" v-model="getstu.PoopAndPee"  name="item3"  value="需协助处理小便"/></label>需协助处理小便<br>
                    <label><input type="checkbox" v-model="getstu.PoopAndPee"  name="item3"  value="需包尿布"/></label>需包尿布<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.PoopAndPeeOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="清洁卫生">
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="完全不需协助"/></label>完全不需协助<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="自己会刷牙"/></label>自己会刷牙<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="口会洗脸"/></label>口会洗脸<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会洗头"/></label>会洗头<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会洗澡"/></label>会洗澡<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会拧毛巾"/></label>会拧毛巾<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会擦手"/></label>会擦手<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会擤鼻涕"/></label>会擤鼻涕<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会梳头发"/></label>会梳头发<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会剪指甲"/></label>会剪指甲<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会洗餐具"/></label>会洗餐具<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会扫地"/></label>会扫地<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会拖地"/></label>会拖地<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会擦桌子"/></label>会擦桌子<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="会褶衣物棉被"/></label>会褶衣物棉被<br>
                    <label><input type="checkbox" v-model="getstu.Cleanliness"  name="item4"  value="男生自己会刮胡子"/></label>男生自己会刮胡子<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.CleanlinessOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="女生月经">
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="无月经">
                    <label><input type="radio" v-model="getstu.HaveMenstruation"  name="item5"  value="尚未发生"/></label>尚未发生
                    <label><input type="radio" v-model="getstu.HaveMenstruation"  name="item5"  value="已手术摘除子宫"/></label>已手术摘除子宫
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="有月经">
                    <label><input type="radio" v-model="getstu.CleanlinessFemale"  name="item6"  value="自己会处理"/></label>自己会处理<br>
                    <label><input type="radio" v-model="getstu.CleanlinessFemale"  name="item6"  value="需人协助"/></label>需人协助<br>
                    <label><input type="radio" v-model="getstu.CleanlinessFemale"  name="item6"  value="不会处理，完全需要协助"/></label>不会处理，完全需要协助<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.CleanlinessFemaleOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="其他">
                    <label><input type="checkbox" v-model="getstu.CleanOther"  name="item7"  value="打电话"/></label>打电话<br>
                    <label><input type="checkbox" v-model="getstu.CleanOther"  name="item7"  value="搭电梯"/></label>搭电梯<br>
                    <label><input type="checkbox" v-model="getstu.CleanOther"  name="item7"  value="购物"/></label>购物<br>
                    <label><input type="checkbox" v-model="getstu.CleanOther"  name="item7"  value="点菜"/></label>点菜<br>
                    <label><input type="checkbox" v-model="getstu.CleanOther"  name="item7"  value="走路上下学"/></label>走路上下学<br>
                    <label><input type="checkbox" v-model="getstu.CleanOther"  name="item7"  value="搭公交车"/></label>搭公交车<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.CleanOtherOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="二、社会化及情绪行为能力">
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="正常"/></label>正常<br>
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="容易适应新环境"/></label>容易适应新环境<br>
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="不容易适应新环境"/></label>不容易适应新环境<br>
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="情绪大致稳定"/></label>情绪大致稳定<br>
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="情绪常常不稳"/></label>情绪常常不稳<br>
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="有攻击行为"/></label>有攻击行为<br>
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="有自伤行为"/></label>有自伤行为<br>
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="会破坏物品"/></label>会破坏物品<br>
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="时常一人独处"/></label>时常一人独处<br>
                    <label><input type="checkbox" v-model="getstu.SocializationAndBehavior"  name="item8"  value="能与他人互动"/></label>能与他人互动<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.SocializationAndBehaviorOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="三、动作发展">
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="粗大动作">
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="正常"/></label>正常<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="自己会翻身"/></label>自己会翻身<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="自己会坐在地上"/></label>自己会坐在地上<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="会爬行"/></label>会爬行<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="会站立"/></label>会站立<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="会走路"/></label>会走路<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="会坐在椅子上"/></label>会坐在椅子上<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="会跪蹲"/></label>会跪蹲<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="会并脚跳"/></label>会并脚跳<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentBig"  name="item9"  value="会上下楼梯"/></label>会上下楼梯<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.ActionDevelopmentBigOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="精细动作">
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="正常"/></label>正常<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value=""/></label>能抓握物品<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="能握笔涂鸦"/></label>能握笔涂鸦<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="能叠高积木"/></label>能叠高积木<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="能搓黏土"/></label>能搓黏土<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="能扭盖笔盖"/></label>能扭盖笔盖<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="能串珠"/></label>能串珠<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="能剪直线"/></label>能剪直线<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="能摺纸"/></label>能摺纸<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="能剪曲线"/></label>能剪曲线<br>
                    <label><input type="checkbox" v-model="getstu.ActionDevelopmentSmall"  name="item10"  value="能握笔写字"/></label>能握笔写字<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.ActionDevelopmentSmallOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="四、其他能力">
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="会简单烹煮"/></label>会简单烹煮<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="会烧开水"/></label>会烧开水<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="会手洗衣物"/></label>会手洗衣物<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="会使用洗衣机"/></label>会使用洗衣机<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="整理餐桌"/></label>整理餐桌<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="清洗碗盘"/></label>清洗碗盘<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="处理垃圾"/></label>处理垃圾<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="扫地"/></label>扫地<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="拖地"/></label>拖地<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="摺叠衣物"/></label>摺叠衣物<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="擦拭窗户"/></label>擦拭窗户<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="收衣服"/></label>收衣服<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="晾衣服"/></label>晾衣服<br>
                    <label><input type="checkbox" v-model="getstu.OtherAbilities"  name="item11"  value="口清洗蔬果"/></label>口清洗蔬果<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.OtherAbilitiesOther"></el-input>
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
        name: "CapacityStatus_2",
        data(){
            return {
                getstu:{
                    Eating:[],
                    EatingOther:'',
                    DressAndUndress:[],
                    DressAndUndressOther:'',
                    PoopAndPee:[],
                    PoopAndPeeOther:'',
                    Cleanliness:[],
                    CleanlinessOther:'',
                    HaveMenstruation:'',
                    CleanlinessFemale:'',
                    CleanlinessFemaleOther:'',
                    CleanOther:[],
                    CleanOtherOther:'',
                    SocializationAndBehavior:[],
                    SocializationAndBehaviorOther:'',
                    ActionDevelopmentBig:[],
                    ActionDevelopmentBigOther:'',
                    ActionDevelopmentSmall:[],
                    ActionDevelopmentSmallOther:'',
                    OtherAbilities:[],
                    OtherAbilitiesOther:'',
                }
            }
        },
        async mounted(){
            await this.getAS2();
        },
        methods: {
            async getAS2(){
                var AS2;
                await this.$http.post('/api/stu/queAS2', {
                    stuID:this.$store.state.stuinfo[0].student_id
                }).then((response) => {
                    AS2 = response.body[0];
                });
                if(AS2.Eating != null)
                    this.getstu.Eating = AS2.Eating.split('(^o~)');
                if(AS2.EatingOther != null)
                    this.getstu.EatingOther = AS2.EatingOther;
                if(AS2.DressAndUndress != null)
                    this.getstu.DressAndUndress = AS2.DressAndUndress.split('(^o~)');
                if(AS2.DressAndUndressOther != null)
                    this.getstu.DressAndUndressOther = AS2.DressAndUndressOther;
                if(AS2.PoopAndPee != null)
                    this.getstu.PoopAndPee = AS2.PoopAndPee.split('(^o~)');
                if(AS2.PoopAndPeeOther != null)
                    this.getstu.PoopAndPeeOther = AS2.PoopAndPeeOther;
                if(AS2.Cleanliness != null)
                    this.getstu.Cleanliness = AS2.Cleanliness.split('(^o~)');
                if(AS2.CleanlinessOther != null)
                    this.getstu.CleanlinessOther = AS2.CleanlinessOther;
                if(AS2.HaveMenstruation != null)
                    this.getstu.HaveMenstruation = AS2.HaveMenstruation;
                if(AS2.CleanlinessFemale != null)
                    this.getstu.CleanlinessFemale = AS2.CleanlinessFemale;
                if(AS2.CleanlinessFemaleOther != null)
                    this.getstu.CleanlinessFemaleOther = AS2.CleanlinessFemaleOther;
                if(AS2.CleanOther != null)
                    this.getstu.CleanOther = AS2.CleanOther.split('(^o~)');
                if(AS2.CleanOtherOther != null)
                    this.getstu.CleanOtherOther = AS2.CleanOtherOther;
                if(AS2.SocializationAndBehavior != null)
                    this.getstu.SocializationAndBehavior = AS2.SocializationAndBehavior.split('(^o~)');
                if(AS2.SocializationAndBehaviorOther != null)
                    this.getstu.SocializationAndBehaviorOther = AS2.SocializationAndBehaviorOther;
                if(AS2.ActionDevelopmentBig != null)
                    this.getstu.ActionDevelopmentBig = AS2.ActionDevelopmentBig.split('(^o~)');
                if(AS2.ActionDevelopmentBigOther != null)
                    this.getstu.ActionDevelopmentBigOther = AS2.ActionDevelopmentBigOther;
                if(AS2.ActionDevelopmentSmall != null)
                    this.getstu.ActionDevelopmentSmall = AS2.ActionDevelopmentSmall.split('(^o~)');
                if(AS2.ActionDevelopmentSmallOther != null)
                    this.getstu.ActionDevelopmentSmallOther = AS2.ActionDevelopmentSmallOther;
                if(AS2.OtherAbilities != null)
                    this.getstu.OtherAbilities = AS2.OtherAbilities.split('(^o~)');
                if(AS2.OtherAbilitiesOther != null)
                    this.getstu.OtherAbilitiesOther = AS2.OtherAbilitiesOther;
            },

            async submitForm(){
                await this.$http.post('/api/stu/upAS2', {
                    Eating:this.getstu.Eating.join('(^o~)'),
                    EatingOther:this.getstu.EatingOther,
                    DressAndUndress:this.getstu.DressAndUndress.join('(^o~)'),
                    DressAndUndressOther:this.getstu.DressAndUndressOther,
                    PoopAndPee:this.getstu.PoopAndPee.join('(^o~)'),
                    PoopAndPeeOther:this.getstu.PoopAndPeeOther,
                    Cleanliness:this.getstu.Cleanliness.join('(^o~)'),
                    CleanlinessFemale:this.getstu.CleanlinessFemale,
                    CleanlinessFemaleOther:this.getstu.CleanlinessFemaleOther,
                    HaveMenstruation:this.getstu.HaveMenstruation,
                    CleanlinessOther:this.getstu.CleanlinessOther,
                    CleanOther:this.getstu.CleanOther.join('(^o~)'),
                    CleanOtherOther:this.getstu.CleanOtherOther,
                    SocializationAndBehavior:this.getstu.SocializationAndBehavior.join('(^o~)'),
                    SocializationAndBehaviorOther:this.getstu.SocializationAndBehaviorOther,
                    ActionDevelopmentBig:this.getstu.ActionDevelopmentBig.join('(^o~)'),
                    ActionDevelopmentBigOther:this.getstu.ActionDevelopmentBigOther,
                    ActionDevelopmentSmall:this.getstu.ActionDevelopmentSmall.join('(^o~)'),
                    ActionDevelopmentSmallOther:this.getstu.ActionDevelopmentSmallOther,
                    OtherAbilities:this.getstu.OtherAbilities.join('(^o~)'),
                    OtherAbilitiesOther:this.getstu.OtherAbilitiesOther,
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
