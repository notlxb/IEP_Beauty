<template>
    <section>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/newContact', query:{currentPage:this.$route.query.currentPage} }">生态评量</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage },}">学生信息</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/devTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">家长自评</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/funcTarget', query:{isEdit:this.$route.query.isEdit,currentPage:this.$route.query.currentPage},}">专项评估</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/materprehis'}">母亲孕史</el-breadcrumb-item>
            <el-breadcrumb-item>兴趣爱好</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/healthstatus'}">健康状况</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/capacitystatus_1'}">能力现状-1</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/checkNEdit/capacitystatus_2'}">能力现状-2</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider content-position="center"></el-divider>
        <el-form :inline="true" align="left" ref="form" :model="getstu">
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="食物">
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="糖果"/></label>糖果<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="饼干"/></label>饼干<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="冰淇淋"/></label>冰淇淋<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="水果"/></label>水果<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="蛋糕"/></label>蛋糕<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="面包"/></label>面包<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="蜜饯"/></label>蜜饯<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="炸鸡"/></label>炸鸡<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="爱喝开水"/></label>爱喝开水<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="汉堡"/></label>汉堡<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="薯条"/></label>薯条<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="爱喝汤"/></label>爱喝汤<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="爱喝甜汤"/></label>爱喝甜汤<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="口香糖"/></label>口香糖<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteFood"  name="item1"  value="爱吃面类"/></label>爱吃面类<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.FoodOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="饮料">
                    <label><input type="checkbox" v-model="getstu.FavoriteDrink"  name="item2"  value="豆浆"/></label>豆浆<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteDrink"  name="item2"  value="米浆"/></label>米浆<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteDrink"  name="item2"  value="牛奶"/></label>牛奶<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteDrink"  name="item2"  value="可乐"/></label>可乐<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteDrink"  name="item2"  value="汽水"/></label>汽水<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteDrink"  name="item2"  value="果汁"/></label>果汁<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteDrink"  name="item2"  value="咖啡"/></label>咖啡<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteDrink"  name="item2"  value="茶"/></label>茶<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteDrink"  name="item2"  value="运动饮料"/></label>运动饮料<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.DrinkOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="物品">
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="玩具"/></label>玩具<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="贴纸"/></label>贴纸<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="卡片"/></label>卡片<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="洋娃娃"/></label>洋娃娃<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="文具用品"/></label>文具用品<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="漫画书"/></label>漫画书<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="明星相片"/></label>明星相片<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="金钱"/></label>金钱<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="发饰"/></label>发饰<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="皮包"/></label>皮包<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="拼图"/></label>拼图<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="书报杂志"/></label>书报杂志<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="CD"/></label>CD<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="手机"/></label>手机<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteThings"  name="item3"  value="电脑"/></label>电脑<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.ThingsOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="体能活动">
                    <label><input type="checkbox" v-model="getstu.FavoriteSports"  name="item4"  value="打篮球"/></label>打篮球<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteSports"  name="item4"  value="游泳"/></label>游泳<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteSports"  name="item4"  value="跳绳"/></label>跳绳<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteSports"  name="item4"  value="跳舞"/></label>跳舞<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteSports"  name="item4"  value="跑步"/></label>跑步<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteSports"  name="item4"  value="脚踏车(2轮/3轮)"/></label>脚踏车(2轮/3轮)<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.SportsOther"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="休闲活动">
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="唱歌"/></label>唱歌<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="逛街"/></label>逛街<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="看漫画"/></label>看漫画<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="画画"/></label>画画<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="听音乐"/></label>听音乐<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="收听广播"/></label>收听广播<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="跳舞"/></label>跳舞<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="打计算机"/></label>打计算机<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="收集活动"/></label>收集活动<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="民俗活动"/></label>民俗活动<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="手工艺"/></label>手工艺<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="阅读书报"/></label>阅读书报<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="下棋"/></label>下棋<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="玩纸牌"/></label>玩纸牌<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="看电视"/></label>看电视<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="郊游"/></label>郊游<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="打电动玩具"/></label>打电动玩具<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="散步"/></label>散步<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="玩游戏"/></label>玩游戏<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="拼图"/></label>拼图<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="看电影"/></label>看电影<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="逛街购物"/></label>逛街购物<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="和他人出去玩"/></label>和他人出去玩<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="爬山"/></label>爬山<br>
                     <label><input type="checkbox" v-model="getstu.FavoriteActivities"  name="item5"  value="唱卡拉OK"/></label>唱卡拉OK<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.ActivitiesOtherr"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="社会增加">
                    <label><input type="checkbox" v-model="getstu.FavoriteEnhance"  name="item6"  value="口头赞美"/></label>口头赞美<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteEnhance"  name="item6"  value="拥抱"/></label>拥抱<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteEnhance"  name="item6"  value="摸头"/></label>摸头<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteEnhance"  name="item6"  value="拍肩"/></label>拍肩<br>
                    <label><input type="checkbox" v-model="getstu.FavoriteEnhance"  name="item6"  value="表扬"/></label>表扬<br>
                    <el-form-item label="其他/补充说明">
                        <el-input v-model="getstu.EnhanceOther"></el-input>
                    </el-form-item><br>
                    <el-form-item label="其他高兴的原因">
                        <el-input v-model="getstu.OtherHappyReasons"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <el-form-item label="最喜欢的人，并标注其与学生的关系">
                <table class="gridtable" style="width: 1000px">
                    <thead >
                        <tr>
                            <th style="text-align: center">姓名</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><el-input v-model="getstu.FavoritePerson"></el-input></td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td><el-input v-model="getstu.FavoritePerson"></el-input></td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td><el-input v-model="getstu.FavoritePerson"></el-input></td>
                    </tr>
                    </tbody>
                </table>
            </el-form-item>
            <el-form-item label="不喜欢的人，并标注其与学生的关系">
                <table class="gridtable" style="width: 1000px">
                    <thead >
                    <tr>
                        <th style="text-align: center;font-size:medium">姓名</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><el-input v-model="getstu.AnnoyingPerson"></el-input></td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td><el-input v-model="getstu.AnnoyingPerson"></el-input></td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td><el-input v-model="getstu.AnnoyingPerson"></el-input></td>
                    </tr>
                    </tbody>
                </table>
            </el-form-item>
            <el-form-item label="不喜欢的事或物，并详细写出名称或情形">
                <table class="gridtable" style="width: 1000px">
                    <thead >
                    <tr>
                        <th style="text-align: center;font-size:medium">食物</th>
                        <th style="text-align: center;font-size:medium">活动</th>
                        <th style="text-align: center;font-size:medium">物品</th>
                        <th style="text-align: center;font-size:medium">其他生气原因</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><el-input v-model="getstu.AnnoyingFood"></el-input></td>
                        <td><el-input v-model="getstu.AnnoyingActivities"></el-input></td>
                        <td><el-input v-model="getstu.AnnoyingThings"></el-input></td>
                        <td><el-input v-model="getstu.OtherUnhappyReasons"></el-input></td>
                    </tr>
                    </tbody>
                </table>
            </el-form-item>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item label="特殊饮食习惯">
                    <lebel><input type="radio" v-model="getstu.SpecialEatingHabits"  name="item7"  value="无"/></lebel>无
                    <label><input type="radio" v-model="getstu.SpecialEatingHabits"  name="item7"  value="有"/></label>有
                    <el-form-item label="若有，请说明说明">
                        <el-input v-model="getstu.EatingHabitsExplanation"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
            <template style="width:200px; height:200px;float:left;">
                <el-form-item>
                    <el-form-item label="特殊喜欢或行为">
                        <el-input v-model="getstu.SpecialHobbiesOrBehaviors"></el-input>
                    </el-form-item>
                    <el-form-item label="其他建议或意见">
                        <el-input v-model="getstu.OtherAdvices"></el-input>
                    </el-form-item>
                </el-form-item>
            </template><br>
        </el-form>
    </section>
</template>

<script>
    export default {
        name: "StuInterest",
        data(){
            return{
                getstu:{
                    FavoriteFood:[],
                    FoodOther:'',
                    FavoriteDrink:[],
                    DrinkOther:'',
                    FavoriteThings:[],
                    ThingsOther:'',
                    FavoriteSports:[],
                    SportsOther:'',
                    FavoriteActivities:[],
                    ActivitiesOther:'',
                    FavoriteEnhance:[],
                    EnhanceOther:'',
                    OtherHappyReasons:'',
                    FavoritePerson:[],
                    AnnoyingPerson:[],
                    AnnoyingFood:'',
                    AnnoyingActivities:'',
                    AnnoyingThings:'',
                    OtherUnhappyReasons:'',
                    SpecialEatingHabits:'',
                    EatingHabitsExplanation:'',
                    SpecialHobbiesOrBehaviors:'',
                    OtherAdvices:''
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
